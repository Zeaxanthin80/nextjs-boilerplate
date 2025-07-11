import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import {
  generateCampaignName,
  generateCampaignContent,
} from "../../../lib/openai";
import { generateChannelImages } from "../../../lib/openai-images";
import { downloadAndSaveImages } from "../../../lib/image-storage";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, product, audience, tone, goals, platforms } =
      await request.json();

    // Validate required fields
    if (
      !name ||
      !product ||
      !audience ||
      !tone ||
      !goals ||
      !platforms?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate campaign name if not provided or enhance it
    const enhancedName =
      name.trim() || (await generateCampaignName(product, tone));

    // Create the campaign in the database
    const campaign = await prisma.campaign.create({
      data: {
        name: enhancedName,
        description: `AI-generated campaign for ${product}`,
        product,
        audience,
        tone,
        goals,
        userId: session.user.id,
        status: "DRAFT",
      },
    });

    // Generate images for the campaign
    console.log("Generating images for campaign...");
    const imagePrompt = `Professional marketing image for ${product}, targeting ${audience}, ${tone.toLowerCase()} style`;
    const generatedImages = await generateChannelImages({
      basePrompt: imagePrompt,
      channels: platforms.map((p) => p.toLowerCase()),
    });

    // Download and save images permanently
    console.log("Downloading and saving images permanently...");
    let savedImages = {};
    
    try {
      savedImages = await downloadAndSaveImages(
        generatedImages,
        campaign.id
      );
      console.log("Images saved successfully:", Object.keys(savedImages));
    } catch (error) {
      console.error("Error saving images permanently:", error);
      // Continue with campaign creation even if image saving fails
      // We'll handle this later by auto-saving images when viewing the campaign
    }

    // Generate content for each selected platform
    const contentPromises = platforms.map(async (platform) => {
      try {
        const content = await generateCampaignContent({
          product,
          audience,
          tone,
          goals,
          platform,
        });

        // Get the saved image for this platform
        const platformImage = savedImages[platform.toLowerCase()];
        
        // Prioritize permanent URLs, but fall back to temporary ones if needed
        // The system will try to save these permanently when the campaign is viewed
        let imageUrl = null;
        if (platformImage) {
          if (platformImage.permanentUrl) {
            // Use the permanent URL if available
            imageUrl = platformImage.permanentUrl;
            console.log(`Using permanent URL for ${platform}: ${imageUrl}`);
          } else if (platformImage.imageUrl) {
            // Fall back to the temporary URL
            imageUrl = platformImage.imageUrl;
            console.log(`Using temporary URL for ${platform}: ${imageUrl}`);
          }
        }

        // Create content entry in database
        return prisma.campaignContent.create({
          data: {
            campaignId: campaign.id,
            platform,
            contentType: "POST", // Default to POST, can be enhanced later
            title: content.title,
            content: content.content,
            hashtags: content.hashtags || [],
            callToAction: content.callToAction,
            imageUrl: imageUrl, // Add the generated image URL
          },
        });
      } catch (error) {
        console.error(`Error generating content for ${platform}:`, error);
        // Return a fallback content if AI generation fails
        return prisma.campaignContent.create({
          data: {
            campaignId: campaign.id,
            platform,
            contentType: "POST",
            title: `${product} Campaign`,
            content: `Check out our amazing ${product}! Perfect for ${audience}.`,
            hashtags: ["#marketing", "#campaign"],
            callToAction: "Learn more!",
            imageUrl: null, // No image for fallback
          },
        });
      }
    });

    // Wait for all content to be generated
    await Promise.all(contentPromises);

    return NextResponse.json({
      success: true,
      campaignId: campaign.id,
      message: "Campaign generated successfully",
    });
  } catch (error) {
    console.error("Error generating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
