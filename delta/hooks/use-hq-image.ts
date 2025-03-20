'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export type HqImage = { url: string };

// Create a global cache that persists between hook instances
// This will store loaded images across component instances
const imageCache = new Map<string, HTMLImageElement>();

/**
 * A hook that returns high-quality images from a curated collection
 * with silent retry functionality and image caching
 * @param initialIndex Optional specific index to use instead of random selection
 * @param maxRetries Maximum number of retries for failed images (default: 5)
 * @returns An object containing the selected image, functions to refresh it, and a method to get multiple random images
 */
export function useHqImage(initialIndex?: number, maxRetries: number = 5) {
  // Track failed image URLs to avoid reusing them
  const failedUrls = useRef<Set<string>>(new Set());

  // Track retry attempts for current image
  const retryCount = useRef<number>(0);

  // Track retry attempts for grid images
  const gridRetryCount = useRef<Map<string, number>>(new Map());

  // Track loaded status for images
  const loadedImages = useRef<Set<string>>(new Set());

  // Function to preload an image and add it to the cache
  const preloadImage = useCallback((url: string): Promise<HTMLImageElement> => {
    // If image is already in cache, return it
    if (imageCache.has(url)) {
      return Promise.resolve(imageCache.get(url)!);
    }

    // Create a new promise to load the image
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        // Add to cache on successful load
        imageCache.set(url, img);
        loadedImages.current.add(url);
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };

      img.src = url;
    });
  }, []);

  // Get a random image from the collection, avoiding failed URLs
  const getRandomImage = useCallback((): HqImage => {
    // Filter out failed URLs if we have any
    const availableImages =
      failedUrls.current.size > 0
        ? exampleImages.filter((img) => !failedUrls.current.has(img.url))
        : exampleImages;

    // If we've exhausted all images, reset failed URLs and try again
    if (availableImages.length === 0) {
      console.warn(
        'All images have failed to load. Resetting failed URLs list.',
      );
      failedUrls.current.clear();
      return exampleImages[Math.floor(Math.random() * exampleImages.length)];
    }

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    // Try to preload the image (don't await, let it load in background)
    preloadImage(selectedImage.url).catch(() => {
      // If preloading fails, it will be handled by the error handlers
    });

    return selectedImage;
  }, [preloadImage]);

  // Initialize state with either the specified image or a random one
  const [image, setImage] = useState<HqImage>(() => {
    if (
      initialIndex !== undefined &&
      initialIndex >= 0 &&
      initialIndex < exampleImages.length
    ) {
      const selectedImage = exampleImages[initialIndex];
      // Try to preload the image (don't await, let it load in background)
      preloadImage(selectedImage.url).catch(() => {
        // If preloading fails, it will be handled by the error handlers
      });
      return selectedImage;
    }
    return getRandomImage();
  });

  // Function to refresh the image with a new random one
  const refreshImage = useCallback(() => {
    // Reset retry count when manually refreshing
    retryCount.current = 0;
    setImage(getRandomImage());
  }, [getRandomImage]);

  // Function to handle image load errors and retry
  const handleImageError = useCallback(
    (imageUrl: string): HqImage => {
      // Add to failed URLs set
      failedUrls.current.add(imageUrl);

      // Log warning
      console.warn(`Image failed to load: ${imageUrl}. Trying another image.`);

      // Get a new image
      return getRandomImage();
    },
    [getRandomImage],
  );

  // New function to get multiple unique random images
  const getRandomImages = useCallback(
    (count: number): HqImage[] => {
      // Reset grid retry tracking when getting new batch
      gridRetryCount.current.clear();

      // Ensure we don't request more images than available
      const requestCount = Math.min(count, exampleImages.length);

      // Create a copy of the images array to shuffle, filtering out known failed URLs
      const availableImages =
        failedUrls.current.size > 0
          ? exampleImages.filter((img) => !failedUrls.current.has(img.url))
          : exampleImages;

      const shuffled = [...availableImages];

      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Get the selected images
      const selectedImages = shuffled.slice(0, requestCount);

      // Preload all selected images in the background
      selectedImages.forEach((img) => {
        preloadImage(img.url).catch(() => {
          // If preloading fails, it will be handled by the error handlers
        });
      });

      // Return the selected images
      return selectedImages;
    },
    [preloadImage],
  );

  // Function to retry a specific grid image
  const retryGridImage = useCallback(
    (imageUrl: string): HqImage => {
      // Track retry count for this specific URL
      const currentRetries = gridRetryCount.current.get(imageUrl) || 0;

      if (currentRetries < maxRetries) {
        // Increment retry count
        gridRetryCount.current.set(imageUrl, currentRetries + 1);
        console.warn(
          `Grid image failed to load: ${imageUrl}. Retry ${currentRetries + 1}/${maxRetries}`,
        );

        // Get a new image
        return getRandomImage();
      } else {
        // Max retries reached, mark as failed
        failedUrls.current.add(imageUrl);
        console.warn(
          `Grid image failed after ${maxRetries} retries: ${imageUrl}`,
        );

        // Get a new image
        return getRandomImage();
      }
    },
    [getRandomImage, maxRetries],
  );

  // Function to check if an image is cached
  const isImageCached = useCallback((url: string): boolean => {
    return imageCache.has(url);
  }, []);

  // Function to get an image from cache
  const getImageFromCache = useCallback(
    (url: string): HTMLImageElement | null => {
      return imageCache.get(url) || null;
    },
    [],
  );

  // Create a wrapped version of the hook's return value with retry and caching functionality
  const hookWithRetry = {
    // Original image with retry functionality
    image,

    // Original refresh function
    refreshImage,

    // Original get random images function
    getRandomImages,

    // All images
    allImages: exampleImages,

    // New functions for retry handling
    handleImageError,
    retryGridImage,

    // Function to check if an image URL has failed
    hasImageFailed: (url: string) => failedUrls.current.has(url),

    // Function to reset all failed URLs
    resetFailedImages: () => {
      failedUrls.current.clear();
      retryCount.current = 0;
      gridRetryCount.current.clear();
      console.log('Reset all failed image tracking');
    },

    // Cache-related functions
    preloadImage,
    isImageCached,
    getImageFromCache,

    // Function to clear the image cache
    clearImageCache: () => {
      imageCache.clear();
      loadedImages.current.clear();
      console.log('Image cache cleared');
    },

    // Get cache stats
    getCacheStats: () => ({
      cacheSize: imageCache.size,
      cachedUrls: Array.from(imageCache.keys()),
    }),
  };

  return hookWithRetry;
}

// Hardcoded image collection
export const exampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    url: 'https://images.aiscribbles.com/34fe5695dbc942628e3cad9744e8ae13.png?v=60d084',
  },
  {
    url: 'https://images.unsplash.com/photo-1734189743286-a39af55f48c3',
  },
  {
    url: 'https://images.unsplash.com/photo-1733309544294-700e617cba60',
  },
  {
    url: 'https://images.unsplash.com/photo-1738916218012-4e580beae18e',
  },
  {
    url: 'https://images.unsplash.com/photo-1735905131227-88f4942d1d38',
  },
  {
    url: 'https://images.unsplash.com/photo-1734760418281-62c3f2279296',
  },
  {
    url: 'https://images.unsplash.com/photo-1741017162002-fac8e37509f9',
  },
  {
    url: 'https://images.unsplash.com/photo-1732905176274-ffdcffbeab41',
  },
];
