"use client"

import { useState, useEffect } from "react"
import { ChatCircle, ArrowUp, Question } from "@phosphor-icons/react"
import { FloatingButton } from "./floating-button"

export default function FloatingButtonDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <BottomLeftButtonsDemo />
      <ScrollToTopDemo />
      <DemoContent />
    </div>
  )
}

export function BottomLeftButtonsDemo() {
  return (
    <>
      <FloatingButton
        icon={Question}
        variant={"outline"}
        placement="bottom-left"
        offset={{ x: 16, y: 16 }}
        tooltip="Need help?"
        aria-label="Help"
      />

      <FloatingButton
        icon={ChatCircle}
        text="Chat with us"
        placement="bottom-left"
        offset={{ x: 80, y: 16 }}
        aria-label="Chat with us"
      />
    </>
  )
}

export function ScrollToTopDemo() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!showScrollButton) return null

  return (
  <FloatingButton
    icon={ArrowUp}
    variant="outline"
    shape="circle"
    placement="bottom-right"
    tooltip="Scroll to top"
    onClick={scrollToTop}
    aria-label="Scroll to top"
    desktopOffset={{ x: 60, y: 16 }}
    mobileOffset={{ x: 16, y: 16 }}
  />
  )
}

// Adding some content to enable scrolling for demo purposes
function DemoContent() {
  return (
    <div className="space-y-8">
      <div className="p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-bold mb-4">Floating Button Demo</h2>
        <p>Scroll down to see the scroll-to-top button appear in the bottom right.</p>
        <p className="mt-2">Notice the help button and chat button in the bottom left.</p>
        <p className="mt-2">The desktopOffset and mobileOffset props can be used to offset the floating button for bottom bars
        on mobile, or sidebars on desktop</p>
      </div>

      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-3">Section {i + 1}</h3>
          <p className="text-muted-foreground">
            This is a placeholder section to create scrollable content. As you scroll down, the floating "Scroll to top"
            button will appear in the bottom right corner.
          </p>
        </div>
      ))}
    </div>
  )
}

