import Image from "next/image";

const PLATFORM_CONFIGS = {
  TIKTOK: {
    name: "TikTok",
    logo: "/logos/tiktok.svg",
    fallback: "🎵",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  INSTAGRAM: {
    name: "Instagram",
    logo: "/logos/instagram.svg",
    fallback: "📸",
    bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    textColor: "text-white",
  },
  FACEBOOK: {
    name: "Facebook",
    logo: "/logos/facebook.svg",
    fallback: "📘",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  YOUTUBE: {
    name: "YouTube",
    logo: "/logos/youtube.svg",
    fallback: "📺",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
};

export default function SocialIcon({
  platform,
  size = "w-6 h-6",
  showName = true,
  className = "",
}) {
  const config = PLATFORM_CONFIGS[platform.toUpperCase()];

  if (!config) {
    return <span className={className}>❓</span>;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div
        className={`${size} relative flex items-center justify-center rounded ${config.bgColor} p-1`}
      >
        <Image
          src={config.logo}
          alt={`${config.name} logo`}
          width={24}
          height={24}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <span
          className={`${config.textColor} text-sm font-bold hidden`}
          style={{ display: "none" }}
        >
          {config.fallback}
        </span>
      </div>
      {showName && (
        <span className="text-sm font-medium text-gray-700">{config.name}</span>
      )}
    </div>
  );
}

// Alternative simpler version for just the icon
export function SocialIconOnly({ platform, size = "w-6 h-6", className = "" }) {
  const config = PLATFORM_CONFIGS[platform.toUpperCase()];

  if (!config) {
    return <span className={className}>❓</span>;
  }

  return (
    <div
      className={`${size} relative flex items-center justify-center ${className}`}
    >
      <Image
        src={config.logo}
        alt={`${config.name} logo`}
        width={24}
        height={24}
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback to emoji if image fails to load
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "inline";
        }}
      />
      <span className="text-lg hidden" style={{ display: "none" }}>
        {config.fallback}
      </span>
    </div>
  );
}
