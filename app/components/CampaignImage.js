"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * A component that handles campaign images with fallback support
 * This component will automatically detect expired images and display a fallback
 */
export default function CampaignImage({
  src,
  alt,
  campaignId,
  platform,
  width = 400,
  height = 400,
  className = "",
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback image paths based on platform
  const getFallbackImage = (platform) => {
    const platformKey = platform?.toLowerCase() || "default";
    return `/uploads/fallback-${platformKey}.png`;
  };

  // Check if the image is a temporary URL that might expire
  const isTemporaryUrl = (url) => {
    return url && typeof url === "string" && !url.startsWith("/uploads/");
  };

  // Handle image load error
  const handleError = () => {
    console.log(`Image failed to load: ${imageSrc}`);
    setError(true);
    
    // If the image is already a fallback, don't try to load another fallback
    if (imageSrc && imageSrc.includes("fallback-")) {
      return;
    }
    
    // Use platform-specific fallback
    const fallbackSrc = getFallbackImage(platform);
    console.log(`Using fallback image: ${fallbackSrc}`);
    setImageSrc(fallbackSrc);
  };

  // If the image is a temporary URL, try to save it permanently
  useEffect(() => {
    if (isTemporaryUrl(src) && campaignId) {
      console.log(`Detected temporary URL: ${src}`);
      
      // Attempt to save the image permanently via API
      const saveImage = async () => {
        try {
          const response = await fetch("/api/campaigns/save-images", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ campaignId }),
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log("Image save response:", data);
            
            // If successful, refresh the page to show the updated images
            if (data.success) {
              window.location.reload();
            }
          }
        } catch (error) {
          console.error("Error saving image:", error);
        }
      };
      
      saveImage();
    }
  }, [src, campaignId]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <Image
        src={imageSrc || getFallbackImage(platform)}
        alt={alt || `${platform} campaign image`}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
      />
      
      {error && !imageSrc.includes("fallback-") && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 text-center">
          Original image expired - using fallback
        </div>
      )}
    </div>
  );
}
