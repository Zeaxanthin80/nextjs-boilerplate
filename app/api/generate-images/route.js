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

    const { prompt, channels, campaignId } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Generate images for specified channels
    const results = await generateChannelImages({
      basePrompt: prompt,
      channels: channels || ["social", "email", "web"],
    });

    // TODO: Save generated images to your database
    // await saveCampaignImages(campaignId, results);

    return NextResponse.json({
      success: true,
      images: results,
    });
  } catch (error) {
    console.error("Image generation API error:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}
