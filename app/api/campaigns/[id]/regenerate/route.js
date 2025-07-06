import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { generateCampaignContent } from "@/app/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { platforms } = await request.json();
    const { id } = await params;

    // Verify campaign exists and belongs to user
    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
        status: "DRAFT",
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found or not editable" },
        { status: 404 }
      );
    }

    // Delete existing content for selected platforms
    await prisma.campaignContent.deleteMany({
      where: {
        campaignId: id,
        platform: {
          in: platforms.map((p) => p.toUpperCase()),
        },
      },
    });

    // Generate new content for each platform
    const newContent = [];
    for (const platform of platforms) {
      try {
        const content = await generateCampaignContent({
          product: campaign.product,
          audience: campaign.audience,
          tone: campaign.tone,
          goals: campaign.goals,
          platform,
        });

        const savedContent = await prisma.campaignContent.create({
          data: {
            campaignId: id,
            platform: platform.toUpperCase(),
            type: "POST",
            title: content.title,
            content: content.content,
            hashtags: content.hashtags,
            callToAction: content.callToAction,
          },
        });

        newContent.push(savedContent);
      } catch (error) {
        console.error(`Failed to generate content for ${platform}:`, error);
      }
    }

    return NextResponse.json({
      message: "Content regenerated successfully",
      generatedContent: newContent,
    });
  } catch (error) {
    console.error("Regenerate content error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate content" },
      { status: 500 }
    );
  }
}
