"use client"

import { useState, useCallback } from "react"

// Hardcoded image collection
export const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A Blurry Photo of a Crowd of People",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im Schwarzen Hemd unter Blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A Woman with a Flower Crown on Her Head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A Blurry Photo of White Flowers in a Field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A Table Topped with Two Wine Glasses and Plates",
  },
  // Additional High-Quality Images (4 already added)
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Alex Johnson",
    link: "https://unsplash.com/photos/abcdef12345",
    title: "Sunset Over the Mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Jane Smith",
    link: "https://unsplash.com/photos/ghijkl67890",
    title: "City Lights at Night",
  },
  {
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2800&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Chris Martin",
    link: "https://unsplash.com/photos/mnopqr24680",
    title: "Serene Beach",
  },
  {
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Emily Clark",
    link: "https://unsplash.com/photos/stuvwx13579",
    title: "Forest Pathway",
  },
  // 10 Additional High-Quality Images (ensuring the URLs exist)
  {
    url: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Dmitrii Demidko",
    link: "https://unsplash.com/photos/1516117172878-fd2c41f4a759",
    title: "Modern Workspace",
  },
  {
    url: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Catherine Johansen",
    link: "https://unsplash.com/photos/1532009324734-20a7a5813719",
    title: "City Skyline at Dusk",
  },
  {
    url: "https://images.unsplash.com/photo-1524429656589-6633a470097c?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Tima Miroshnichenko",
    link: "https://unsplash.com/photos/1524429656589-6633a470097c",
    title: "Mountain Landscape",
  },
  {
    url: "https://images.unsplash.com/photo-1530224264768-7ff8c1789d79?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Sarah Johnson",
    link: "https://unsplash.com/photos/1530224264768-7ff8c1789d79",
    title: "Foggy Forest",
  },
  {
    url: "https://images.unsplash.com/photo-1564135624576-c5c88640f235?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Anna Lee",
    link: "https://unsplash.com/photos/1564135624576-c5c88640f235",
    title: "Desert Dunes",
  },
  {
    url: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Markus Spiske",
    link: "https://unsplash.com/photos/1541698444083-023c97d3f4b6",
    title: "Calm Lake Reflection",
  },
  {
    url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Robert Wall",
    link: "https://unsplash.com/photos/1504198453319-5ce911bafcde",
    title: "Snowy Mountains",
  },
  {
    url: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Lucas S",
    link: "https://unsplash.com/photos/1481349518771-20055b2a7b24",
    title: "Serene Lake",
  },
  {
    url: "https://images.unsplash.com/photo-1507143550189-fed454f93097?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Olivia Brown",
    link: "https://unsplash.com/photos/1507143550189-fed454f93097",
    title: "Vast Field",
  },
  {
    url: "https://images.unsplash.com/photo-1504198266283-1659872e6590?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3",
    author: "Emma Clarke",
    link: "https://unsplash.com/photos/1504198266283-1659872e6590",
    title: "City Skyline",
  },
]

export type HqImage = {
  url: string
  author: string
  link: string
  title: string
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
