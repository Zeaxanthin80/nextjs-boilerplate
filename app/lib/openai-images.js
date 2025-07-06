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
      model: "dall-e-3", // or "dall-e-2" for faster/cheaper generation
      prompt: prompt,
      n: 1,
      size: size, // "1024x1024", "1024x1792", "1792x1024"
      quality: quality, // "standard" or "hd"
      style: style, // "natural" or "vivid"
    });

    return {
      success: true,
      imageUrl: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt,
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
    social: `${basePrompt}, optimized for social media, square format, eye-catching`,
    email: `${basePrompt}, professional email header style, clean and modern`,
    web: `${basePrompt}, website banner style, wide format, professional`,
    instagram: `${basePrompt}, Instagram post style, vibrant colors, engaging`,
    facebook: `${basePrompt}, Facebook cover photo style, wide banner format`,
    linkedin: `${basePrompt}, LinkedIn professional style, business-focused`,
    tiktok: `${basePrompt}, TikTok style, vertical format, trendy and dynamic`,
    youtube: `${basePrompt}, YouTube thumbnail style, vibrant and clickable`,
  };

  const results = {};

  for (const channel of channels) {
    const prompt = channelPrompts[channel] || basePrompt;
    const result = await generateCampaignImage({
      prompt,
      size: getOptimalSize(channel),
    });
    results[channel] = result;
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
