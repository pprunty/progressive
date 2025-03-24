"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import type { z } from "zod"

// CustomSwitch component moved into this file
interface CustomSwitchProps extends Omit<HTMLMotionProps<"button">, "checked" | "defaultChecked" | "onChange"> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: "default" | "large"
  /** Custom color for the active/checked state (CSS color or Tailwind class) */
  activeColor?: string
  /** Switch shape variant */
  variant?: "pill" | "rectangular"
  /** Extends the clickable area beyond the visible component */
  extendedClickArea?: boolean
}

const CustomSwitch = React.forwardRef<HTMLButtonElement, CustomSwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      size = "default",
      activeColor,
      variant = "rectangular",
      extendedClickArea = false,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(checked !== undefined ? checked : defaultChecked || false)

    // Update checked state when controlled prop changes
    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleClick = () => {
      if (disabled) return

      const newChecked = !isChecked
      setIsChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    // Custom active color style if provided
    const activeColorStyle = activeColor && isChecked ? { backgroundColor: activeColor } : {}

    // Calculate toggle position based on size and variant
    const toggleXPosition = () => {
      if (size === "large") {
        return isChecked ? 24 : 2
      }
      return isChecked ? 20 : 2
    }

    return (
      <motion.button
        type="button"
        role="switch"
        aria-checked={isChecked}
        data-state={isChecked ? "checked" : "unchecked"}
        disabled={disabled}
        ref={ref}
        onClick={handleClick}
        style={activeColorStyle}
        className={cn(
          "relative flex shrink-0 cursor-pointer border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          variant === "pill" ? "rounded-full" : "rounded-md",
          isChecked ? (activeColor ? "" : "bg-primary") : "bg-muted",
          size === "large" ? "h-[30px] w-[53px]" : "h-[24px] w-[44px]",
          extendedClickArea && "before:absolute before:-inset-10 before:block before:content-['']",
          className,
        )}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <motion.div
          initial={false}
          animate={{
            x: toggleXPosition(),
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            "absolute top-0 bottom-0 left-0 m-auto shadow-md",
            activeColor ? "bg-white" : `dark:bg-black bg-background`,
            variant === "pill" ? "rounded-full" : "rounded-md",
            size === "large" ? "h-6 w-6" : "h-5 w-5",
          )}
        />
      </motion.button>
    )
  },
)

CustomSwitch.displayName = "CustomSwitch"

export interface SwitchInputProps {
  /** The label for the switch */
  label: string
  /** The name of the switch field (used for form submission) */
  name: string
  /** Optional description text to display below the switch */
  description?: string
  /** Optional hint text to display below the switch */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default checked state */
  defaultChecked?: boolean
  /** Controlled checked state */
  checked?: boolean
  /** Container className for the entire component */
  containerClassName?: string
  /** Switch className */
  switchClassName?: string
  /** Label className */
  labelClassName?: string
  /** Label variant - 'default' or 'muted' */
  labelVariant?: "default" | "muted"
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<boolean>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: boolean, error?: string) => void
  /** Callback when switch state changes */
  onCheckedChange?: (checked: boolean) => void
  /** ID for the switch */
  id?: string
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Size of the switch - 'default' or 'large' (1.2x default size) */
  size?: "default" | "large"
  /** Custom color for the active/checked state (CSS color or Tailwind class) */
  activeColor?: string
  /** Switch shape variant - 'pill' or 'rectangular' */
  variant?: "pill" | "rectangular"
  /** Extends the clickable area beyond the visible component */
  extendedClickArea?: boolean
}

/**
 * SwitchInput component that integrates with Zod validation
 */
export function SwitchInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultChecked = false,
  checked,
  containerClassName,
  switchClassName,
  labelClassName,
  labelVariant = "default",
  schema,
  onValidate,
  onCheckedChange,
  id = name,
  disabled = false,
  size = "default",
  activeColor,
  variant = "rectangular",
  extendedClickArea = false, // Default to true for better mobile usability
}: SwitchInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const [isChecked, setIsChecked] = React.useState<boolean>(checked !== undefined ? checked : defaultChecked)
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Update checked state when controlled prop changes
  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked)
    }
  }, [checked])

  // Handle validation with the provided schema
  const validateSwitch = React.useCallback(
    (value: boolean) => {
      if (!schema) return

      const result = schema.safeParse(value)
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || "Invalid selection"
        setLocalError(errorMessage)
        onValidate?.(false, value, errorMessage)
      } else {
        setLocalError(undefined)
        onValidate?.(true, value)
      }
    },
    [schema, onValidate],
  )

  // Handle switch change
  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked)

    // If we have a schema, validate on change
    if (schema) {
      validateSwitch(checked)
    }

    // Call the original onCheckedChange if provided
    onCheckedChange?.(checked)
  }

  return (
    <div className={cn("group/field space-y-2", containerClassName)} data-invalid={hasError}>
      <div className="flex items-center justify-between space-x-2">
        <div className="space-y-1">
          <label
            htmlFor={id}
            className={cn(
              "text-md font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive",
              labelVariant === "muted" && "text-muted-foreground",
              labelClassName,
            )}
          >
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </label>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        <CustomSwitch
          id={id}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          checked={checked !== undefined ? checked : undefined}
          disabled={pending || disabled}
          onCheckedChange={handleCheckedChange}
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
          aria-describedby={hint ? hintId : undefined}
          aria-required={required}
          size={size}
          activeColor={activeColor}
          variant={variant}
          extendedClickArea={extendedClickArea}
          className={cn(
            "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",
            switchClassName,
          )}
        />
      </div>

      {hint && !hasError && (
        <p id={hintId} className="text-xs text-muted-foreground mt-1">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="text-destructive text-xs">
          {localError || error}
        </p>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={isChecked ? "true" : "false"} />
    </div>
  )
}

