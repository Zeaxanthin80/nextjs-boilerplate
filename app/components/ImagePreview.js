"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImagePreview({
  imageUrl,
  alt,
  platform,
  campaignName,
  className = "",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if DALL-E URL might be expired based on timestamp
  const isImageLikelyExpired = () => {
    // If it's a local permanent image, it's not expired
    if (imageUrl?.startsWith("/uploads/")) return false;

    if (!imageUrl?.includes("oaidalleapiprodscus.blob.core.windows.net"))
      return false;

    try {
      const url = new URL(imageUrl);
      const stParam = url.searchParams.get("st"); // Start time
      if (!stParam) return false;

      const startTime = new Date(stParam);
      const now = new Date();
      const hoursElapsed = (now - startTime) / (1000 * 60 * 60);

      return hoursElapsed > 2; // DALL-E images typically expire after 1-2 hours
    } catch (error) {
      console.error("Error parsing image URL timestamp:", error);
      return false;
    }
  };

  // Check if image is permanently stored
  const isPermanentImage = () => {
    return imageUrl?.startsWith("/uploads/");
  };

  const getImageDimensions = (platform) => {
    const dimensions = {
      TIKTOK: {
        width: "1024",
        height: "1792",
        aspect: "9/16",
        display: "1024×1792",
      },
      INSTAGRAM: {
        width: "1024",
        height: "1024",
        aspect: "1/1",
        display: "1024×1024",
      },
      FACEBOOK: {
        width: "1792",
        height: "1024",
        aspect: "16/9",
        display: "1792×1024",
      },
      YOUTUBE: {
        width: "1792",
        height: "1024",
        aspect: "16/9",
        display: "1792×1024",
      },
      LINKEDIN: {
        width: "1792",
        height: "1024",
        aspect: "16/9",
        display: "1792×1024",
      },
    };
    return (
      dimensions[platform?.toUpperCase()] || {
        width: "1024",
        height: "1024",
        aspect: "1/1",
        display: "1024×1024",
      }
    );
  };

  const downloadImage = async () => {
    // Check if image is likely expired before attempting download
    if (isImageLikelyExpired()) {
      alert(
        "This image has likely expired. DALL-E images are only valid for 1-2 hours. Please regenerate the campaign to get fresh images."
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${campaignName}-${platform}-image.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      if (
        error.message.includes("403") ||
        error.message.includes("status: 403")
      ) {
        alert(
          "Image has expired. Please regenerate the campaign to get fresh images."
        );
      } else {
        // Fallback: try to open in new tab
        window.open(imageUrl, "_blank");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyImageUrl = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      {/* Expiration Warning */}
      {!isPermanentImage() && isImageLikelyExpired() && (
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Image May Have Expired
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                DALL-E images expire after 1-2 hours. If you're seeing loading
                issues, please regenerate the campaign for fresh images.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start space-x-4">
        {/* Image Preview */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <div
              className="relative rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-gray-100"
              style={{
                width: "240px",
                aspectRatio: getImageDimensions(platform).aspect,
              }}
            >
              {!imageError ? (
                <Image
                  src={imageUrl}
                  alt={alt}
                  fill
                  sizes="240px"
                  className="object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 border-2 border-dashed border-gray-300">
                  <div className="text-center p-4">
                    <div className="text-3xl mb-2">⚠️</div>
                    <div className="text-xs text-gray-500 mb-1">
                      Image Expired
                    </div>
                    <div className="text-xs text-gray-400">
                      DALL-E images expire after 1-2 hours
                    </div>
                    <div className="text-xs text-blue-500 mt-1">
                      Please regenerate campaign
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
              <button
                onClick={() => window.open(imageUrl, "_blank")}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 px-3 py-1 rounded-md text-sm font-medium shadow-lg hover:bg-gray-50"
              >
                View Full Size
              </button>
            </div>
          </div>
        </div>

        {/* Image Info and Actions */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              Generated Image
            </h4>
            <div className="flex items-center space-x-2">
              {isPermanentImage() && (
                <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Saved
                </span>
              )}
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {getImageDimensions(platform).display}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            AI-generated image optimized for {platform?.toLowerCase()}
            {isPermanentImage()
              ? " (Permanently stored)"
              : " (Temporary DALL-E URL)"}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={downloadImage}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 mr-1 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
              {isLoading ? "Downloading..." : "Download Original"}
            </button>

            <button
              onClick={copyImageUrl}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copySuccess ? "Copied!" : "Copy URL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
