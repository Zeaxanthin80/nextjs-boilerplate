import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view this campaign" }, 
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id, // Ensure user can only access their own campaigns
      },
      include: {
        content: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { 
          error: "Campaign not found or you don't have permission to view it",
          code: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    // Return the campaign regardless of its status
    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { 
        error: "An error occurred while fetching the campaign",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status, name, description } = await request.json();

    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(name && { name }),
        ...(description && { description }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error("Error updating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, product, audience, tone, goals, platforms } =
      await request.json();

    const { id } = await params;

    // Verify campaign exists and belongs to user
    const existingCampaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
        status: "DRAFT", // Only allow editing of draft campaigns
      },
    });

    if (!existingCampaign) {
      return NextResponse.json(
        { error: "Campaign not found or not editable" },
        { status: 404 }
      );
    }

    // Update campaign
    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: {
        name,
        product,
        audience,
        tone,
        goals,
        updatedAt: new Date(),
      },
      include: {
        content: true,
      },
    });

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error("Campaign update error:", error);
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Verify campaign exists and belongs to user
    const existingCampaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingCampaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Delete campaign and related content (cascade delete)
    await prisma.campaign.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Campaign delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    );
  }
}
