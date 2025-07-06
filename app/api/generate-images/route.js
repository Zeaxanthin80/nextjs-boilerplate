import { NextResponse } from "next/server";
import { generateChannelImages } from "../../lib/openai-images";
import { auth } from "../../lib/auth";

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt, channels = ["social", "email", "web"], campaignId } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    console.log(`Generating images for channels: ${channels.join(', ')}`);
    
    // Generate images for specified channels
    const results = await generateChannelImages({
      basePrompt: prompt,
      channels: Array.isArray(channels) ? channels : ["social", "email", "web"],
    });

    // Check if any images were generated successfully
    const hasSuccessfulImages = Object.values(results).some(
      (result) => result?.success && result.imageUrl
    );

    if (!hasSuccessfulImages) {
      console.error("No images were generated successfully", { results });
      return NextResponse.json(
        { 
          error: "Failed to generate images. Please try again with a different prompt.",
          details: results 
        },
        { status: 500 }
      );
    }

    // TODO: Save generated images to your database
    // if (campaignId) {
    //   await saveCampaignImages(campaignId, results);
    // }

    return NextResponse.json({
      success: true,
      images: results,
    });
  } catch (error) {
    console.error("Image generation API error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Failed to generate images",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
