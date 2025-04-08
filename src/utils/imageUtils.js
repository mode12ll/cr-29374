/**
 * Utility functions for handling images
 */

/**
 * Checks if an image URL is valid
 * @param {string} url - The image URL to check
 * @returns {Promise<boolean>} - Promise resolving to true if image loads successfully
 */
export const isImageValid = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Gets a proper image URL, prepending the base path if needed
 * @param {string} imagePath - The image path
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/car-placeholder.jpg';
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, make sure it starts with a slash
  if (!imagePath.startsWith('/')) {
    imagePath = `/${imagePath}`;
  }
  
  return imagePath;
};

/**
 * Preloads an array of images
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {Promise<string[]>} - Promise resolving to array of valid image URLs
 */
export const preloadImages = async (imageUrls) => {
  if (!imageUrls || !imageUrls.length) return [];
  
  const validImages = await Promise.all(
    imageUrls.map(async (url) => {
      const formattedUrl = getImageUrl(url);
      const isValid = await isImageValid(formattedUrl);
      return isValid ? formattedUrl : null;
    })
  );
  
  return validImages.filter(url => url !== null);
};

/**
 * Gets image dimensions
 * @param {string} url - Image URL
 * @returns {Promise<{width: number, height: number}>} - Image dimensions
 */
export const getImageDimensions = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = url;
  });
};
