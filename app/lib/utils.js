/**
 * Utility functions for formatting and displaying content
 */

/**
 * Format hashtags with regular spaces
 * @param {string[]} hashtags - Array of hashtags
 * @returns {string} - Hashtags joined with regular spaces
 */
export function formatHashtags(hashtags) {
  return hashtags.join(" "); // Regular space for proper wrapping
}

/**
 * Format hashtags with double spaces for more spacing
 * @param {string[]} hashtags - Array of hashtags
 * @returns {string} - Hashtags joined with double spaces
 */
export function formatHashtagsWithSpacing(hashtags) {
  return hashtags.join("  "); // Double regular space
}

/**
 * Ensure hashtag has # prefix
 * @param {string} tag - Hashtag with or without #
 * @returns {string} - Hashtag with # prefix
 */
export function ensureHashtagPrefix(tag) {
  return tag.startsWith("#") ? tag : `#${tag}`;
}

/**
 * Process hashtags for display - ensures # prefix and formats with spacing
 * @param {string|string[]} hashtags - Hashtags as string or array
 * @returns {string} - Formatted hashtags string
 */
export function processHashtagsForDisplay(hashtags) {
  if (typeof hashtags === "string") {
    return hashtags
      .split(/\s+/)
      .filter((tag) => tag)
      .map(ensureHashtagPrefix)
      .join(" ");
  } else if (Array.isArray(hashtags)) {
    return formatHashtags(hashtags.map(ensureHashtagPrefix));
  }
  return hashtags;
}
