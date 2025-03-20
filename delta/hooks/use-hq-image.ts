"use client"

import { useState, useCallback } from "react"

export type HqImage = {
  url: string
}

/**
 * A hook that returns a random high-quality image from a curated collection
 * @param initialIndex Optional specific index to use instead of random selection
 * @returns An object containing the selected image and a function to refresh it
 */
export function useHqImage(initialIndex?: number) {
  // Get a random image from the collection
  const getRandomImage = useCallback((): HqImage => {
    const randomIndex = Math.floor(Math.random() * exampleImages.length)
    return exampleImages[randomIndex]
  }, [])

  // Initialize state with either the specified image or a random one
  const [image, setImage] = useState<HqImage>(() => {
    if (initialIndex !== undefined && initialIndex >= 0 && initialIndex < exampleImages.length) {
      return exampleImages[initialIndex]
    }
    return getRandomImage()
  })

  // Function to refresh the image with a new random one
  const refreshImage = useCallback(() => {
    setImage(getRandomImage())
  }, [getRandomImage])

  return {
    image,
    refreshImage,
    allImages: exampleImages,
  }
}

// Hardcoded image collection
export const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.aiscribbles.com/34fe5695dbc942628e3cad9744e8ae13.png?v=60d084",
  },
  {
    url: "https://images.unsplash.com/photo-1734189743286-a39af55f48c3",
  },
  {
    url: "https://images.unsplash.com/photo-1733309544294-700e617cba60"
  },
  {
    url: "https://images.unsplash.com/photo-1738916218012-4e580beae18e"
  },
  {
    url: "https://images.unsplash.com/photo-1735905131227-88f4942d1d38"
  },
  {
    url: "https://images.unsplash.com/photo-1734760418281-62c3f2279296",
  },
  {
    url: "https://images.unsplash.com/photo-1741017162002-fac8e37509f9",
  },
  {
    url: "https://images.unsplash.com/photo-1732905176274-ffdcffbeab41",
  },
]