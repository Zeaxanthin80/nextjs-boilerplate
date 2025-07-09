"use client";

import Image from "next/image";

const SOCIAL_PLATFORMS = {
  TIKTOK: {
    name: "TikTok",
    logo: "/logos/tiktok.png",
    emoji: "🎵",
    // color: "bg-black text-white",
    width: 32,
    height: 32,
  },
  INSTAGRAM: {
    name: "Instagram",
    logo: "/logos/instagram.png",
    emoji: "📸",
    // color: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    width: 32,
    height: 32,
  },
  FACEBOOK: {
    name: "Facebook",
    logo: "/logos/facebook.png",
    emoji: "📘",
    // color: "bg-blue-600 text-white",
    width: 32,
    height: 32,
  },
  YOUTUBE: {
    name: "YouTube",
    logo: "/logos/youtube.png",
    emoji: "📺",
    // color: "bg-red-600 text-white",
    width: 32,
    height: 32,
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
      className={`${size} relative flex items-center justify-center rounded-lg ${config.color}`}
    >
      <Image
        src={config.logo}
        alt={`${config.name} logo`}
        width={config.width || 32}
        height={config.height || 32}
        className="w-full h-full object-contain p-1"
        onError={(e) => {
          // Fallback to emoji if image fails to load
          e.target.style.display = "none";
          const fallbackElement =
            e.target.parentNode.querySelector(".fallback-emoji");
          if (fallbackElement) {
            fallbackElement.style.display = "flex";
          }
        }}
      />
      <span
        className="fallback-emoji text-white text-lg font-bold hidden items-center justify-center w-full h-full"
        style={{ display: "none" }}
      >
        {config.emoji}
      </span>
    </div>
  );
}
