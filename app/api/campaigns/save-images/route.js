import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { downloadAndSaveImage } from "../../../lib/image-storage";

/**
 * API endpoint to download and save images for existing campaigns
 * This helps fix campaigns where the DALL-E URLs have expired
 */
export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    // Verify the campaign belongs to the user
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
        userId: session.user.id,
      },
      include: {
        content: true,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found or access denied" },
        { status: 404 }
      );
    }

    // Process each content item with an image URL
    const results = [];
    for (const content of campaign.content) {
      if (!content.imageUrl) {
        results.push({
          contentId: content.id,
          platform: content.platform,
          status: "skipped",
          message: "No image URL found",
        });
        continue;
      }

      // Skip if the image is already a permanent URL
      if (content.imageUrl.startsWith("/uploads/")) {
        results.push({
          contentId: content.id,
          platform: content.platform,
          status: "skipped",
          message: "Image is already permanent",
        });
        continue;
      }

      try {
        // Download and save the image
        const permanentUrl = await downloadAndSaveImage(
          content.imageUrl,
          campaignId,
          content.platform.toLowerCase()
        );

        // Update the content record with the permanent URL
        await prisma.campaignContent.update({
          where: {
            id: content.id,
          },
          data: {
            imageUrl: permanentUrl,
          },
        });

        results.push({
          contentId: content.id,
          platform: content.platform,
          status: "success",
          permanentUrl,
        });
      } catch (error) {
        console.error(`Error saving image for content ${content.id}:`, error);
        results.push({
          contentId: content.id,
          platform: content.platform,
          status: "error",
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      campaignId,
      results,
      success: results.some((r) => r.status === "success"),
    });
  } catch (error) {
    console.error("Error saving campaign images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
