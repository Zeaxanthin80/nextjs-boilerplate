import { prisma } from "./prisma";
import { downloadAndSaveImage } from "./image-storage";

/**
 * Checks for and fixes expired images in a campaign
 * @param {string} campaignId - The ID of the campaign to check
 * @returns {Promise<Object>} - Results of the check and fix operation
 */
export async function checkAndFixExpiredImages(campaignId) {
  try {
    if (!campaignId) {
      throw new Error("Campaign ID is required");
    }

    // Get all content items for the campaign
    const contentItems = await prisma.campaignContent.findMany({
      where: {
        campaignId,
      },
    });

    if (!contentItems || contentItems.length === 0) {
      return {
        success: true,
        message: "No content items found for this campaign",
        fixed: 0,
        total: 0,
      };
    }

    // Track results
    const results = {
      fixed: 0,
      skipped: 0,
      failed: 0,
      total: contentItems.length,
    };

    // Process each content item
    for (const content of contentItems) {
      // Skip if no image URL
      if (!content.imageUrl) {
        results.skipped++;
        continue;
      }

      // Skip if already a permanent URL
      if (content.imageUrl.startsWith("/uploads/")) {
        results.skipped++;
        continue;
      }

      try {
        // Try to download and save the image permanently
        console.log(`Fixing expired image for content ID ${content.id}, platform ${content.platform}`);
        const permanentUrl = await downloadAndSaveImage(
          content.imageUrl,
          campaignId,
          content.platform.toLowerCase()
        );

        // Update the content record with the permanent URL
        await prisma.campaignContent.update({
          where: {
            id: content.id,
          },
          data: {
            imageUrl: permanentUrl,
          },
        });

        results.fixed++;
      } catch (error) {
        console.error(`Error fixing image for content ${content.id}:`, error);
        results.failed++;
      }
    }

    return {
      success: true,
      message: `Fixed ${results.fixed} of ${results.total} images. Skipped ${results.skipped} (already permanent). Failed: ${results.failed}.`,
      ...results,
    };
  } catch (error) {
    console.error("Error checking and fixing expired images:", error);
    return {
      success: false,
      message: error.message || "An error occurred while fixing expired images",
      error: error.toString(),
    };
  }
}

/**
 * Determines if an image URL is likely to be expired
 * @param {string} imageUrl - The URL to check
 * @returns {boolean} - True if the URL is likely expired
 */
export function isImageLikelyExpired(imageUrl) {
  if (!imageUrl || imageUrl.startsWith("/uploads/")) {
    return false;
  }
  
  try {
    const url = new URL(imageUrl);
    
    // Check for DALL-E URL patterns
    const isDalleUrl = url.hostname.includes('oaidalleapiprodscus.blob.core.windows.net');
    if (!isDalleUrl) return false;
    
    // Check for URL expiration parameters
    const stParam = url.searchParams.get("st");
    const seParam = url.searchParams.get("se");
    
    if (!stParam && !seParam) return true;
    
    if (seParam) {
      // Check expiration time
      const expirationTime = new Date(seParam);
      const now = new Date();
      return now > expirationTime;
    }
    
    if (stParam) {
      // Check start time (DALL-E URLs typically expire after 1-2 hours)
      const startTime = new Date(stParam);
      const now = new Date();
      const hoursElapsed = (now - startTime) / (1000 * 60 * 60);
      return hoursElapsed > 1.5;
    }
    
    return true;
  } catch (error) {
    console.error("Error parsing image URL:", error);
    return true; // Assume expired if we can't parse it
  }
}
