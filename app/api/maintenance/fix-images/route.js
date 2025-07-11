import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { checkAndFixExpiredImages } from "../../../lib/image-utils";

/**
 * API endpoint to check and fix expired images across campaigns
 * Can be used for maintenance or scheduled tasks
 */
export async function POST(request) {
  try {
    const session = await auth();

    // Only allow admins or authenticated users with specific permissions
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { campaignId, fixAll = false } = await request.json();

    // If a specific campaign ID is provided, only fix that one
    if (campaignId) {
      // Verify the campaign belongs to the user
      const campaign = await prisma.campaign.findFirst({
        where: {
          id: campaignId,
          userId: session.user.id,
        },
      });

      if (!campaign) {
        return NextResponse.json(
          { error: "Campaign not found or access denied" },
          { status: 404 }
        );
      }

      const result = await checkAndFixExpiredImages(campaignId);
      return NextResponse.json(result);
    }

    // If fixAll is true, fix all campaigns for the user
    if (fixAll) {
      const campaigns = await prisma.campaign.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!campaigns || campaigns.length === 0) {
        return NextResponse.json({
          success: true,
          message: "No campaigns found for this user",
          results: [],
        });
      }

      const results = [];
      for (const campaign of campaigns) {
        const result = await checkAndFixExpiredImages(campaign.id);
        results.push({
          campaignId: campaign.id,
          campaignName: campaign.name,
          ...result,
        });
      }

      return NextResponse.json({
        success: true,
        message: `Processed ${results.length} campaigns`,
        results,
      });
    }

    return NextResponse.json(
      { error: "Either campaignId or fixAll parameter is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fixing images:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
