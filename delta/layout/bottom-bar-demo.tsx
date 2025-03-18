"use client"

import { useState } from "react"
import BottomBar, { type RouteItem } from "./bottom-bar"
import { House, Plus, BookOpen } from "@phosphor-icons/react"

export default function BottomBarDemo() {
  const [showLabels, setShowLabels] = useState(true)
  const [showCenterButton, setShowCenterButton] = useState(true)

  // Example routes for the demo
  const demoRoutes: RouteItem[] = [
    {
      href: "/",
      label: "Home",
      icon: House,
    },
    {
      href: "/docs/bottom-bar",
      label: "Docs",
      icon: BookOpen,
    },
  ]

  // Example center button configuration
  const centerButton = {
    onClick: () => alert("Center button clicked!"),
    label: "Add",
    icon: Plus,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo controls */}
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl text-primary font-bold mb-4">Bottom Bar Demo</h1>

        <div className="space-y-4 mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showLabels"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="showLabels">Show Labels</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showCenterButton"
                checked={showCenterButton}
                onChange={(e) => setShowCenterButton(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="showCenterButton">Show Center Button</label>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg space-y-3 text-foreground">
            <h3 className="font-medium">Component Features:</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Mobile-only:</strong> The bottom bar is only visible on small screens/mobile devices (hidden on
                md breakpoint and above).
              </li>
              <li>
                <strong>Animation:</strong> Icons have a pulse animation effect when clicked.
              </li>
              <li>
                <strong>Scroll to top:</strong> When clicking an already active navigation item, the page will scroll
                smoothly to the top.
              </li>
              <li>
                <strong>Adaptive layout:</strong> With center button enabled, navigation items are split into two
                groups. Without it, items spread evenly.
              </li>
            </ul>
          </div>
        </div>

        {/* Current page simulation */}
        <div className="border border-border rounded-lg p-6 mb-20">
          <h2 className="text-xl font-semibold mb-2">Current Page Content</h2>
          <p>This is where your page content would appear.</p>
          <p className="mt-4 text-muted-foreground">
            The bottom navigation bar will appear at the bottom of the viewport on mobile devices.
          </p>
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Resize your browser to a mobile width (less than 768px) to see the bottom bar. On
              larger screens, it's hidden by design.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar
        routes={demoRoutes}
        showLabels={showLabels}
        centerButton={showCenterButton ? centerButton : undefined}
      />
    </div>
  )
}

