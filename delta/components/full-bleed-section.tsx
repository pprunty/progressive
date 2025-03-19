"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface FullBleedSectionProps {
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  padding?: string
  style?: React.CSSProperties
}

export default function FullBleedSection({
  children,
  className,
  backgroundColor = "bg-muted",
  padding = "",
  style = {},
}: FullBleedSectionProps) {
  return (
    <div className="relative w-full my-8">
      <div
        className={cn("relative", backgroundColor, className)}
        style={{
          width: "100vw",
          left: "50%",
          transform: "translateX(-50%)",
          position: "relative",
          ...style,
        }}
      >
        <div className={cn("", padding)}>{children}</div>
      </div>
    </div>
  )
}
