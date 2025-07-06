import fs from "fs";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

/**
 * Downloads an image from a URL and saves it permanently to local storage
 * @param {string} imageUrl - The temporary DALL-E image URL
 * @param {string} campaignId - The campaign ID for organizing files
 * @param {string} platform - The platform (instagram, tiktok, etc.)
 * @returns {Promise<string>} - The permanent local image path
 */
export async function downloadAndSaveImage(imageUrl, campaignId, platform) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "campaigns",
      campaignId
    );
    await mkdir(uploadsDir, { recursive: true });

    // Generate filename
    const timestamp = Date.now();
    const filename = `${platform}-${timestamp}.png`;
    const filePath = path.join(uploadsDir, filename);

    // Download the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to download image: ${response.status} ${response.statusText}`
      );
    }

    // Get the image buffer
    const imageBuffer = await response.arrayBuffer();

    // Save to local file system
    await writeFile(filePath, Buffer.from(imageBuffer));

    // Return the public URL path
    const publicPath = `/uploads/campaigns/${campaignId}/${filename}`;

    console.log(`Image saved successfully: ${publicPath}`);
    return publicPath;
  } catch (error) {
    console.error("Error downloading and saving image:", error);
    throw error;
  }
}

/**
 * Downloads multiple images concurrently
 * @param {Object} generatedImages - Object with platform keys and image data
 * @param {string} campaignId - The campaign ID
 * @returns {Promise<Object>} - Object with platform keys and permanent URLs
 */
export async function downloadAndSaveImages(generatedImages, campaignId) {
  const downloadPromises = Object.entries(generatedImages).map(
    async ([platform, imageData]) => {
      if (imageData.success && imageData.imageUrl) {
        try {
          const permanentUrl = await downloadAndSaveImage(
            imageData.imageUrl,
            campaignId,
            platform
          );
          return [
            platform,
            { ...imageData, permanentUrl, originalUrl: imageData.imageUrl },
          ];
        } catch (error) {
          console.error(`Failed to save image for ${platform}:`, error);
          return [
            platform,
            { ...imageData, permanentUrl: null, error: error.message },
          ];
        }
      }
      return [platform, imageData];
    }
  );

  const results = await Promise.all(downloadPromises);
  return Object.fromEntries(results);
}

/**
 * Cleans up old campaign images (optional utility for maintenance)
 * @param {number} daysOld - Delete images older than this many days
 */
export async function cleanupOldImages(daysOld = 30) {
  try {
    const campaignsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "campaigns"
    );

    if (!fs.existsSync(campaignsDir)) {
      return;
    }

    const cutoffDate = Date.now() - daysOld * 24 * 60 * 60 * 1000;

    // This is a basic implementation - you might want to enhance this
    // based on your specific cleanup needs
    console.log(`Cleanup would delete images older than ${daysOld} days`);
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
