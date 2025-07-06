import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCampaignImage({
  prompt,
  style = "natural",
  size = "1024x1024",
  quality = "standard",
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
    social: `${basePrompt}, optimized for social media, square format, eye-catching, detailed, professional quality`,
    email: `${basePrompt}, professional email header style, clean and modern, business appropriate`,
    web: `${basePrompt}, website banner style, wide format, professional, high resolution`,
    instagram: `${basePrompt}, Instagram post style, vibrant colors, engaging, social media optimized`,
    facebook: `${basePrompt}, Facebook cover photo style, wide banner format, attention-grabbing`,
    linkedin: `${basePrompt}, LinkedIn professional style, business-focused, corporate aesthetic`,
    tiktok: `${basePrompt}, TikTok style, vertical format, trendy and dynamic, youth-oriented`,
    youtube: `${basePrompt}, YouTube thumbnail style, vibrant and clickable, includes visual hook`,
  };

  const results = {};
  
  // Generate images for each selected channel
  for (const channel of channels) {
    const prompt = channelPrompts[channel] || basePrompt;
    const size = getOptimalSize(channel);
    
    try {
      const result = await generateCampaignImage({
        prompt,
        size: size.size,
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
  const sizes = {
    social: "1024x1024",
    instagram: "1024x1024",
    facebook: "1792x1024",
    linkedin: "1792x1024",
    email: "1792x1024",
    web: "1792x1024",
    tiktok: "1024x1792", // Vertical format for TikTok
    youtube: "1792x1024", // Wide format for YouTube thumbnails
    default: "1024x1024",
  };

  return sizes[channel] || sizes.default;
}
