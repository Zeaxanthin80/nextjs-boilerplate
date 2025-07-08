/**
 * Utility functions for formatting and displaying content
 */

/**
 * Format hashtags with non-breaking spaces
 * @param {string[]} hashtags - Array of hashtags
 * @returns {string} - Hashtags joined with non-breaking spaces
 */
export function formatHashtags(hashtags) {
  return hashtags.join("\u00A0"); // \u00A0 is the Unicode for non-breaking space
}

/**
 * Format hashtags with double non-breaking spaces for more spacing
 * @param {string[]} hashtags - Array of hashtags
 * @returns {string} - Hashtags joined with double non-breaking spaces
 */
export function formatHashtagsWithSpacing(hashtags) {
  return hashtags.join("\u00A0\u00A0"); // Double non-breaking space
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
      .join("\u00A0");
  } else if (Array.isArray(hashtags)) {
    return formatHashtags(hashtags.map(ensureHashtagPrefix));
  }
  return hashtags;
}
