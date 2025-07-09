import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// GET handler to fetch a single campaign
export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "You must be logged in to view this campaign" },
        { status: 401 }
      );
    }

    // Await params before accessing properties
    const paramValues = await params;
    const id = paramValues.id;
    if (!id) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
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

// PATCH handler to update a campaign's status, name, or description
export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params before accessing properties
    const paramValues = await params;
    const id = paramValues.id;
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

// PUT handler to update the core details of a DRAFT campaign
export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params before accessing properties
    const paramValues = await params;
    const id = paramValues.id;
    const { name, product, audience, tone, goals } = await request.json();

    const existingCampaign = await prisma.campaign.findFirst({
      where: {
        id,
        userId: session.user.id,
        status: "DRAFT",
      },
    });

    if (!existingCampaign) {
      return NextResponse.json(
        { error: "Campaign not found or not editable" },
        { status: 404 }
      );
    }

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

// DELETE handler to remove a campaign
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params before accessing properties
    const paramValues = await params;
    const id = paramValues.id;

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