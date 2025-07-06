"use client";

const SOCIAL_PLATFORMS = {
  TIKTOK: {
    name: "TikTok",
    emoji: "🎵",
    color: "bg-black text-white",
  },
  INSTAGRAM: {
    name: "Instagram",
    emoji: "📸",
    color: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
  },
  FACEBOOK: {
    name: "Facebook",
    emoji: "📘",
    color: "bg-blue-600 text-white",
  },
  YOUTUBE: {
    name: "YouTube",
    emoji: "📺",
    color: "bg-red-600 text-white",
  },
};

export default function SimpleSocialIcon({ platform, size = "w-8 h-8" }) {
  const config = SOCIAL_PLATFORMS[platform?.toUpperCase()];

  if (!config) {
    return (
      <div
        className={`${size} flex items-center justify-center bg-gray-300 rounded-lg`}
      >
        <span>?</span>
      </div>
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center rounded-lg ${config.color}`}
    >
      <span className="text-lg">{config.emoji}</span>
    </div>
  );
}
