import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCampaignContent({
  product,
  audience,
  tone,
  goals,
  platform,
}) {
  try {
    // Check if we have a valid OpenAI API key
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your_openai_api_key_here"
    ) {
      console.log("Using mock data - no valid OpenAI API key found");
      return generateMockContent(product, audience, tone, goals, platform);
    }

    const prompt = createPrompt(product, audience, tone, goals, platform);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert social media marketing strategist who creates engaging, platform-specific content that drives results.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;
    return parsePlatformContent(response, platform);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    // Return a fallback content structure
    return generateMockContent(product, audience, tone, goals, platform);
  }
}

function generateMockContent(product, audience, tone, goals, platform) {
  const platformEmojis = {
    TIKTOK: "🎵",
    INSTAGRAM: "📸",
    FACEBOOK: "👥",
    YOUTUBE: "📹",
  };

  const toneAdjectives = {
    PROFESSIONAL: "professional",
    CASUAL: "friendly",
    HUMOROUS: "fun",
    INSPIRATIONAL: "motivating",
    EDUCATIONAL: "informative",
    URGENT: "time-sensitive",
  };

  const platformContent = {
    INSTAGRAM: {
      title: `${platformEmojis[platform]} Introducing ${product}`,
      content: `Looking for the perfect solution? ${product} is here! 💫\n\nDesigned specifically for ${audience}, this ${
        toneAdjectives[tone]
      } approach helps you achieve: ${goals.join(
        ", "
      )}.\n\nSwipe to learn more! ➡️`,
      hashtags: [
        "#instagram",
        "#lifestyle",
        "#discover",
        `#${product.replace(/\s+/g, "").toLowerCase()}`,
      ],
      callToAction: "Double tap if you love this! 💖",
    },
    TIKTOK: {
      title: `${platformEmojis[platform]} ${product} - Perfect for ${audience}!`,
      content: `🎯 Discover ${product}! \n\nThis ${
        toneAdjectives[tone]
      } solution is exactly what ${audience} needs. \n\n✨ Goals: ${goals.join(
        ", "
      )}\n\n#trending #viral #foryou`,
      hashtags: [
        "#trending",
        "#viral",
        "#foryou",
        `#${product.replace(/\s+/g, "").toLowerCase()}`,
      ],
      callToAction: "Follow for more amazing content!",
    },
    FACEBOOK: {
      title: `${platformEmojis[platform]} ${product} - Now Available!`,
      content: `We're excited to share ${product} with our community! 🎉\n\nPerfect for ${audience}, this ${
        toneAdjectives[tone]
      } solution addresses your key goals: ${goals.join(
        ", "
      )}.\n\nJoin thousands of satisfied customers who have already made the switch!`,
      hashtags: [
        "#community",
        "#family",
        "#share",
        `#${product.replace(/\s+/g, "").toLowerCase()}`,
      ],
      callToAction: "Share with friends who need this!",
    },
    YOUTUBE: {
      title: `${platformEmojis[platform]} ${product}: Complete Guide for ${audience}`,
      content: `Welcome back to our channel! Today we're diving deep into ${product} - the ${
        toneAdjectives[tone]
      } solution that ${audience} have been waiting for.\n\nIn this video, we'll cover:\n• How it works\n• Why it's perfect for your goals: ${goals.join(
        ", "
      )}\n• Real user testimonials\n\nDon't forget to like and subscribe!`,
      hashtags: [
        "#youtube",
        "#tutorial",
        "#guide",
        `#${product.replace(/\s+/g, "").toLowerCase()}`,
      ],
      callToAction: "Subscribe and hit the bell for notifications! 🔔",
    },
  };

  return platformContent[platform] || platformContent.INSTAGRAM;
}

function createPrompt(product, audience, tone, goals, platform) {
  const platformSpecs = {
    TIKTOK: {
      contentType: "Short-form video script",
      maxLength: "60 seconds",
      features: "trending hashtags, hooks, viral elements",
      style: "casual, entertaining, trend-focused",
    },
    INSTAGRAM: {
      contentType: "Post caption and story ideas",
      maxLength: "2200 characters",
      features: "hashtags, story stickers, carousel ideas",
      style: "visual-first, aesthetic, engaging",
    },
    FACEBOOK: {
      contentType: "Post content and ad copy",
      maxLength: "500 words",
      features: "engagement questions, community building",
      style: "conversational, community-focused",
    },
    YOUTUBE: {
      contentType: "Video title, description, and outline",
      maxLength: "10-15 minute video",
      features: "SEO keywords, timestamps, CTAs",
      style: "educational, entertaining, searchable",
    },
  };

  const spec = platformSpecs[platform];

  return `
Create ${spec.contentType} for ${platform} with the following requirements:

PRODUCT/SERVICE: ${product}
TARGET AUDIENCE: ${audience}
TONE: ${tone}
GOALS: ${goals.join(", ")}

PLATFORM SPECIFICATIONS:
- Content Type: ${spec.contentType}
- Max Length: ${spec.maxLength}
- Key Features: ${spec.features}
- Style: ${spec.style}

Please provide:
1. Main content/script
2. Relevant hashtags (5-10)
3. Call-to-action
4. Platform-specific tips

Format your response as JSON with the following structure:
{
  "title": "Engaging title/hook",
  "content": "Main content/script",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "callToAction": "Clear CTA",
  "tips": "Platform-specific optimization tips"
}
`;
}

function parsePlatformContent(response, platform) {
  try {
    // Try to parse JSON response
    const parsed = JSON.parse(response);
    return {
      platform,
      contentType: getContentTypeForPlatform(platform),
      title: parsed.title || "",
      content: parsed.content || response,
      hashtags: parsed.hashtags || [],
      callToAction: parsed.callToAction || "",
      tips: parsed.tips || "",
    };
  } catch (error) {
    // Fallback to plain text parsing
    return {
      platform,
      contentType: getContentTypeForPlatform(platform),
      title: "",
      content: response,
      hashtags: extractHashtags(response),
      callToAction: "",
      tips: "",
    };
  }
}

function getContentTypeForPlatform(platform) {
  const contentTypes = {
    TIKTOK: "VIDEO",
    INSTAGRAM: "POST",
    FACEBOOK: "POST",
    YOUTUBE: "VIDEO",
  };
  return contentTypes[platform] || "POST";
}

function extractHashtags(text) {
  const hashtagRegex = /#[\w]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.slice(0, 10) : [];
}

export async function generateCampaignName(product, goals) {
  try {
    // Check if we have a valid OpenAI API key
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your_openai_api_key_here"
    ) {
      console.log("Using mock campaign name - no valid OpenAI API key found");
      return generateMockCampaignName(product, goals);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate creative, memorable campaign names for marketing campaigns.",
        },
        {
          role: "user",
          content: `Create 3 creative campaign names for: Product: ${product}, Goals: ${goals.join(
            ", "
          )}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    const response = completion.choices[0].message.content;
    const names = response
      .split("\n")
      .filter((name) => name.trim())
      .map((name) =>
        name
          .replace(/^\d+\.\s*/, "")
          .replace(/^-\s*/, "")
          .trim()
      );

    return names[0] || `${product} Campaign`;
  } catch (error) {
    console.error("Campaign name generation error:", error);
    return generateMockCampaignName(product, goals);
  }
}

function generateMockCampaignName(product, goals) {
  const templates = [
    `${product} Revolution`,
    `Discover ${product}`,
    `${product} Experience`,
    `The ${product} Story`,
    `${product} Unleashed`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}
