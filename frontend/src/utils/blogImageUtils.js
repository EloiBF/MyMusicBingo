/**
 * Blog Image Utilities
 * Provides smart fallback handling for blog images
 */

// Fallback images based on category
const FALLBACK_IMAGES = {
    music: '/assets/images/blog/default-music.png',
    event: '/assets/images/blog/default-event.png',
    party: '/assets/images/blog/default-event.png',
    celebration: '/assets/images/blog/default-event.png',
    tutorial: '/assets/images/blog/default-music.png',
    playlists: '/assets/images/blog/default-music.png',
    advanced: '/assets/images/blog/default-music.png',
    themes: '/assets/images/blog/default-event.png',
    business: '/assets/images/blog/default-event.png',
    default: '/assets/images/blog/default.png'
};

/**
 * Get appropriate fallback image based on article category or tags
 * @param {string} category - Article category
 * @param {Array<string>} tags - Article tags
 * @returns {string} - Path to fallback image
 */
export const getFallbackImage = (category = '', tags = []) => {
    // Try category first
    const categoryKey = category.toLowerCase();
    if (FALLBACK_IMAGES[categoryKey]) {
        return FALLBACK_IMAGES[categoryKey];
    }

    // Try tags
    for (const tag of tags) {
        const tagKey = tag.toLowerCase();
        if (FALLBACK_IMAGES[tagKey]) {
            return FALLBACK_IMAGES[tagKey];
        }
    }

    // Default fallback
    return FALLBACK_IMAGES.default;
};

/**
 * Handle image error with smart fallback
 * @param {Event} e - Error event
 * @param {string} category - Article category
 * @param {Array<string>} tags - Article tags
 */
export const handleImageError = (e, category = '', tags = []) => {
    const img = e.target;

    // Prevent infinite loop if fallback also fails
    if (img.dataset.fallbackAttempted === 'true') {
        img.src = FALLBACK_IMAGES.default;
        return;
    }

    img.dataset.fallbackAttempted = 'true';
    img.src = getFallbackImage(category, tags);
};

/**
 * Preload fallback images to ensure they're cached
 */
export const preloadFallbackImages = () => {
    const images = Object.values(FALLBACK_IMAGES);
    const uniqueImages = [...new Set(images)];

    uniqueImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Preload images when module is imported
if (typeof window !== 'undefined') {
    preloadFallbackImages();
}
