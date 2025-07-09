import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCampaignImage({
  prompt,
  style = "natural",
  size = "1024x1024",
  quality = "hd",
}) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size, // "1024x1024", "1024x1792", "1792x1024"
      quality: quality,
      style: style,
    });

    // DALL-E 3 returns an array of data objects
    const imageData = response.data[0];
    
    return {
      success: true,
      imageUrl: imageData.url || imageData.b64_json,
      revisedPrompt: imageData.revised_prompt || prompt, // Fallback to original prompt if revised_prompt not available
    };
  } catch (error) {
    console.error("Image generation error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Generate multiple variations for different channels
export async function generateChannelImages({
  basePrompt,
  channels = ["social", "email", "web"],
}) {
  const channelPrompts = {
    social: `${basePrompt}, optimized for social media, perfect square format (1:1 aspect ratio), eye-catching, detailed, professional quality`,
    email: `${basePrompt}, professional email header style, clean and modern, business appropriate, landscape format (16:9 aspect ratio)`,
    web: `${basePrompt}, website banner style, landscape format (16:9 aspect ratio), professional, high resolution`,
    instagram: `${basePrompt}, Instagram post style, vibrant colors, engaging, social media optimized, perfect square format (1:1 aspect ratio)`,
    facebook: `${basePrompt}, Facebook post style, landscape format (16:9 aspect ratio), attention-grabbing, optimized for Facebook feed`,
    linkedin: `${basePrompt}, LinkedIn professional style, business-focused, corporate aesthetic, landscape format (16:9 aspect ratio)`,
    tiktok: `${basePrompt}, TikTok style, portrait format (9:16 aspect ratio), trendy and dynamic, youth-oriented, full-screen mobile optimized`,
    youtube: `${basePrompt}, YouTube thumbnail style, landscape format (16:9 aspect ratio), vibrant and clickable, includes visual hook`,
  };

  const results = {};
  
  // Generate images for each selected channel
  for (const channel of channels) {
    const prompt = channelPrompts[channel] || basePrompt;
    const size = getOptimalSize(channel);
    
    try {
      const result = await generateCampaignImage({
        prompt,
        size: size,
        style: "vivid",
        quality: "hd"
      });
      
      results[channel] = result;
    } catch (error) {
      console.error(`Error generating image for ${channel}:`, error);
      results[channel] = {
        success: false,
        error: `Failed to generate ${channel} image`
      };
    }
  }
  
  return results;
}

function getOptimalSize(channel) {
  // DALL-E 3 only supports these three specific sizes:
  // - 1024x1024 (square, 1:1 ratio)
  // - 1024x1792 (portrait, 9:16 ratio)
  // - 1792x1024 (landscape, 16:9 ratio)
  const sizes = {
    social: "1024x1024",     // Square format
    instagram: "1024x1024",  // Square format
    facebook: "1792x1024",   // Landscape format (16:9 ratio)
    linkedin: "1792x1024",   // Landscape format (16:9 ratio)
    email: "1792x1024",      // Landscape format (16:9 ratio)
    web: "1792x1024",        // Landscape format (16:9 ratio)
    tiktok: "1024x1792",     // Portrait format (9:16 ratio)
    youtube: "1792x1024",    // Landscape format (16:9 ratio)
    default: "1024x1024",
  };

  return sizes[channel] || sizes.default;
}
