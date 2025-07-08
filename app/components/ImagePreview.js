"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function getProxiedImageUrl(url) {
  if (!url) return null;
  
  // If it's a local URL or data URL, use it directly
  if (url.startsWith('/') || 
      url.startsWith('http://localhost') || 
      url.startsWith('http://127.0.0.1') ||
      url.startsWith('data:image')) {
    return url;
  }
  
  // For external URLs, use our proxy
  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

export default function ImagePreview({
  imageUrl,
  alt,
  platform,
  campaignName,
  className = "",
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const [proxiedImageUrl, setProxiedImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!imageUrl) {
      setImageError(true);
      setIsLoading(false);
      return;
    }

    const proxiedUrl = getProxiedImageUrl(imageUrl);
    setProxiedImageUrl(proxiedUrl);
    
    // Get the platform dimensions
    const platformDims = getImageDimensions(platform);
    setDimensions({
      width: platformDims.previewWidth || 400,
      height: platformDims.previewHeight || 400,
    });
  }, [imageUrl, platform]);

  // Check if image URL might be expired
  const isImageLikelyExpired = () => {
    if (!imageUrl || imageUrl.startsWith("/uploads/") || imageUrl.startsWith("data:image")) {
      return false;
    }
    try {
      const url = new URL(imageUrl);
      const isDalleUrl = url.hostname.includes('oaidalleapiprodscus.blob.core.windows.net');
      if (!isDalleUrl) return false;
      
      // Check for DALL-E URL expiration
      const stParam = url.searchParams.get("st");
      if (!stParam) return true;
      
      const startTime = new Date(stParam);
      const now = new Date();
      const hoursElapsed = (now - startTime) / (1000 * 60 * 60);
      return hoursElapsed > 1.5; // DALL-E URLs typically expire after 1-2 hours
    } catch (error) {
      console.error("Error parsing image URL:", error);
      return true;
    }
  };

  // Check if image is permanently stored
  const isPermanentImage = () => {
    if (!imageUrl) return false;
    return imageUrl.startsWith("/uploads/") || 
           imageUrl.startsWith("http://localhost") ||
           imageUrl.startsWith(process.env.NEXT_PUBLIC_APP_URL || "") ||
           imageUrl.startsWith("data:image");
  };

  // Get image dimensions based on platform
  const getImageDimensions = (platform) => {
    const dimensions = {
      TIKTOK: { 
        width: "1024", 
        height: "1792", 
        aspect: "9/16", 
        display: "1024×1792",
        previewWidth: 300,
        previewHeight: 534
      },
      INSTAGRAM: { 
        width: "1024", 
        height: "1024", 
        aspect: "1/1", 
        display: "1024×1024",
        previewWidth: 400,
        previewHeight: 400
      },
      FACEBOOK: { 
        width: "1792", 
        height: "1024", 
        aspect: "16/9", 
        display: "1792×1024",
        previewWidth: 400,
        previewHeight: 225
      },
      YOUTUBE: { 
        width: "1792", 
        height: "1024", 
        aspect: "16/9", 
        display: "1792×1024",
        previewWidth: 400,
        previewHeight: 225
      },
      LINKEDIN: { 
        width: "1792", 
        height: "1024", 
        aspect: "16/9", 
        display: "1792×1024",
        previewWidth: 400,
        previewHeight: 225
      },
    };

    return dimensions[platform?.toUpperCase()] || { 
      width: "1024", 
      height: "1024", 
      aspect: "1/1", 
      display: "1024×1024",
      previewWidth: 400,
      previewHeight: 400
    };
  };

  // Download image handler
  const downloadImage = async () => {
    if (!imageUrl) return;

    setIsLoading(true);
    setImageError(false);

    try {
      // Use the proxy for external URLs
      const downloadUrl = imageUrl.startsWith('http') && !imageUrl.includes('localhost') && !imageUrl.includes(process.env.NEXT_PUBLIC_APP_URL || '')
        ? `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
        : imageUrl;

      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${campaignName || 'image'}-${platform || 'download'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      if (error.message.includes("403") || error.message.includes("status: 403") || isImageLikelyExpired()) {
        alert("This image has expired. Please regenerate the campaign to get fresh images.");
      } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        alert("Failed to download the image. Please check your internet connection and try again.");
      } else {
        // Fallback: try to open in new tab
        window.open(imageUrl, "_blank");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image load error
  const handleImageError = (e) => {
    console.error("Image failed to load:", imageUrl);
    setImageError(true);
    setIsLoading(false);
    
    // If it's a DALL-E URL and likely expired, show a more specific error
    if (isImageLikelyExpired()) {
      console.warn("Image URL has likely expired");
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
                If you're seeing loading issues, please regenerate the campaign for fresh images.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0">
        {/* Image Preview */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="relative w-full" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div
                className="relative bg-gray-50 rounded-lg overflow-hidden"
                style={{
                  aspectRatio: getImageDimensions(platform).aspect,
                  minHeight: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e7eb',
                }}
              >
                {proxiedImageUrl && !imageError ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={proxiedImageUrl}
                      alt={alt || `Generated ${platform} image`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain p-2"
                      onLoad={() => setIsLoading(false)}
                      onError={handleImageError}
                      unoptimized={!isPermanentImage()}
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {isLoading ? (
                      <div className="space-y-2">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm text-gray-500">Loading preview...</p>
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-500">
                          {imageError || !imageUrl
                            ? "No preview available"
                            : "Unable to load preview"}
                        </span>
                        {imageError && (
                          <button
                            onClick={() => {
                              setImageError(false);
                              setProxiedImageUrl(getProxiedImageUrl(imageUrl));
                            }}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Retry
                          </button>
                        )}
                        {!isPermanentImage() && (
                          <div className="mt-2 text-xs text-gray-500">
                            {isImageLikelyExpired() 
                              ? "This image may have expired. Please regenerate the campaign."
                              : ""}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Overlay - Only show on hover */}
              {proxiedImageUrl && !imageError && !isLoading && (
                <div className="absolute inset-0 group-hover:bg-black group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(proxiedImageUrl, "_blank");
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-gray-900 px-3 py-1 rounded-md text-sm font-medium shadow-lg hover:bg-gray-50 flex items-center pointer-events-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Full Size
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Info and Actions */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
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
          <div className="space-y-1 mb-3">
            <p className="text-sm text-gray-600">
              AI-generated image optimized for {platform?.toLowerCase()}
                {isPermanentImage()
                  ? " (Permanently stored)"
                  : ""}
            </p>
            {!isPermanentImage() && isImageLikelyExpired() && (
              <p className="text-xs text-amber-600">
                ⚠️ This image may have expired. Regenerate the campaign if needed.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
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
