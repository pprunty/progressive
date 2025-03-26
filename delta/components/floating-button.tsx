"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const floatingButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 transition-all duration-200 rounded-full shadow-sm hover:shadow-md active:opacity-90 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      shape: {
        default: "",
        circle: "aspect-square",
      },
    },
    compoundVariants: [
      {
        shape: "default",
        size: "sm",
        class: "h-10 px-3 py-1.5",
      },
      {
        shape: "default",
        size: "default",
        class: "h-14 px-4 py-3",
      },
      {
        shape: "default",
        size: "lg",
        class: "h-16 px-5 py-2.5",
      },
      {
        shape: "circle",
        size: "sm",
        class: "h-8 w-8 p-0",
      },
      {
        shape: "circle",
        size: "default",
        class: "h-10 w-10 p-0",
      },
      {
        shape: "circle",
        size: "lg",
        class: "h-12 w-12 p-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
)

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center"

// Define the offset type for reuse
export type OffsetValue = number | { x?: number; y?: number }

export interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingButtonVariants> {
  icon: React.ElementType
  text?: string
  iconProps?: React.ComponentPropsWithoutRef<"svg">
  tooltip?: string
  tooltipSide?: "top" | "right" | "bottom" | "left"
  tooltipAlign?: "start" | "center" | "end"
  hideOnMobile?: boolean
  position?: "fixed" | "absolute" | "static"
  placement?: Position
  mobilePosition?: Position
  desktopPosition?: Position
  offset?: OffsetValue
  mobileOffset?: OffsetValue
  desktopOffset?: OffsetValue
  zIndex?: number
}

const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  (
    {
      className,
      icon: Icon,
      text,
      variant = "default",
      size = "default",
      shape = "default",
      iconProps,
      tooltip,
      tooltipSide = "top",
      tooltipAlign = "center",
      hideOnMobile = false,
      position = "fixed",
      placement = "bottom-right",
      offset = 16,
      mobileOffset,
      desktopOffset,
      zIndex = 100,
      mobilePosition,
      desktopPosition,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkMobile()
      window.addEventListener("resize", checkMobile)

      return () => {
        window.removeEventListener("resize", checkMobile)
      }
    }, [])

    // Determine effective offset based on screen size
    const effectiveOffset = React.useMemo(() => {
      if (isMobile && mobileOffset !== undefined) {
        return mobileOffset
      }
      if (!isMobile && desktopOffset !== undefined) {
        return desktopOffset
      }
      return offset
    }, [isMobile, mobileOffset, desktopOffset, offset])

    // Calculate offset values
    const offsetX = typeof effectiveOffset === "object" ? (effectiveOffset.x ?? 16) : effectiveOffset
    const offsetY = typeof effectiveOffset === "object" ? (effectiveOffset.y ?? 16) : effectiveOffset

    // Determine effective placement based on screen size
    const effectivePlacement = React.useMemo(() => {
      if (isMobile && mobilePosition) {
        return mobilePosition
      }
      if (!isMobile && desktopPosition) {
        return desktopPosition
      }
      return placement
    }, [isMobile, mobilePosition, desktopPosition, placement])

    // Generate position styles based on props
    const positionStyles = React.useMemo(() => {
      if (position === "static") return {}

      const styles: React.CSSProperties = {
        position,
        zIndex,
      }

      switch (effectivePlacement) {
        case "top-left":
          styles.top = offsetY
          styles.left = offsetX
          break
        case "top-right":
          styles.top = offsetY
          styles.right = offsetX
          break
        case "bottom-left":
          styles.bottom = offsetY
          styles.left = offsetX
          break
        case "bottom-right":
          styles.bottom = offsetY
          styles.right = offsetX
          break
        case "bottom-center":
          styles.bottom = offsetY
          styles.left = "50%"
          styles.transform = "translateX(-50%)"
          break
        default:
          styles.bottom = offsetY
          styles.right = offsetX
      }

      return styles
    }, [position, effectivePlacement, offsetX, offsetY, zIndex])

    // If hideOnMobile is true and we're on mobile, don't render the button
    if (hideOnMobile && isMobile) {
      return null
    }

    // Default icon size based on button size
    const iconSize = size === "sm" ? 16 : size === "default" ? 20 : 24

    // Default icon props
    const defaultIconProps = {
      size: iconSize,
      "aria-hidden": true,
      ...iconProps,
    }

    const button = (
      <button
        ref={ref}
        className={cn(floatingButtonVariants({ variant, size, shape, className }))}
        style={positionStyles}
        {...props}
      >
        <Icon {...defaultIconProps} />
        {text && shape !== "circle" && <span className="font-medium">{text}</span>}
      </button>
    )

    // Apply tooltip if needed
    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side={tooltipSide} align={tooltipAlign}>
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  },
)

FloatingButton.displayName = "FloatingButton"

export { FloatingButton, floatingButtonVariants }