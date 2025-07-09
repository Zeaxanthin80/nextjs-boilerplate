import Image from "next/image";

const PLATFORM_CONFIGS = {
  TIKTOK: {
    name: "TikTok",
    logo: "/logos/tiktok.png",
    fallback: "🎵",
    bgColor: "bg-white",
    textColor: "text-black",
    width: 24,
    height: 24,
  },
  INSTAGRAM: {
    name: "Instagram",
    logo: "/logos/instagram.png",
    fallback: "📸",
    bgColor: "bg-white",
    textColor: "text-black",
    width: 24,
    height: 24,
  },
  FACEBOOK: {
    name: "Facebook",
    logo: "/logos/facebook.png",
    fallback: "📘",
    bgColor: "bg-white",
    textColor: "text-black",
    width: 24,
    height: 24,
  },
  YOUTUBE: {
    name: "YouTube",
    logo: "/logos/youtube.png",
    fallback: "📺",
    bgColor: "bg-white",
    textColor: "text-black",
    width: 24,
    height: 24, 
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
          width={config.width || 24}
          height={config.height || 24}
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
  const config = PLATFORM_CONFIGS[platform?.toUpperCase()];

  if (!config) {
    return <span className={`${className} text-2xl`}>❓</span>;
  }

  return (
    <div
      className={`${size} relative flex items-center justify-center rounded-lg ${config.bgColor} ${className}`}
    >
      <Image
        src={config.logo}
        alt={`${config.name} logo`}
        width={config.width ? config.width * 1.33 : 32}
        height={config.height ? config.height * 1.33 : 32}
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
        className="fallback-emoji text-white text-xl font-bold hidden items-center justify-center w-full h-full"
        style={{ display: "none" }}
      >
        {config.fallback}
      </span>
    </div>
  );
}
