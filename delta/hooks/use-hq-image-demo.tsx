"use client"

import { useHqImage } from "@/delta/hooks/use-hq-image"
import { useState } from "react"

export default function UseHQImageDemo() {
  const { image, refreshImage } = useHqImage()
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Random High-Quality Image</h2>

      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border">
        {loading && <div className="absolute inset-0 animate-pulse bg-muted/80"></div>}
        <img
          src={image.url || "/placeholder.svg"}
          alt={image.title}
          className={`w-full h-full object-cover ${loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}`}
          onLoad={() => setLoading(false)}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">Click the refresh button to get a new image.</p>
    </div>
    </div>
  )
}

