"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { z } from "zod"

export interface OTPInputProps {
  /** The label for the OTP input field */
  label: string
  /** The name of the OTP input field (used for form submission) */
  name: string
  /** Optional description text to display below the label */
  description?: string
  /** Optional hint text to display below the OTP input */
  hint?: string
  /** Error message to display (typically from Zod validation) */
  error?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether the field is in a loading/pending state */
  pending?: boolean
  /** Default value for the OTP input */
  defaultValue?: string
  /** Controlled value */
  value?: string
  /** Container className for the entire component */
  containerClassName?: string
  /** Label className for customizing the label */
  labelClassName?: string
  /** Label variant - 'default' or 'muted' */
  labelVariant?: "default" | "muted"
  /** Input variant - 'default' or 'pill' */
  variant?: "default" | "pill"
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void
  /** Callback when OTP value changes */
  onChange?: (value: string) => void
  /** Callback when OTP is completed */
  onComplete?: (value: string) => void
  /** ID for the OTP input */
  id?: string
  /** Whether the OTP input is disabled */
  disabled?: boolean
  /** Length of the OTP code */
  length?: number
  /** Character to display when input is masked */
  maskChar?: string
  /** Whether to mask the input (like a password) */
  mask?: boolean
  /** Whether to auto-focus the first input on mount */
  autoFocus?: boolean
  /** Whether to render with a separator between groups */
  separator?: boolean
  /** Size of each group of digits */
  groupSize?: number
  /** Whether to automatically submit the form when OTP is completed */
  autoSubmit?: boolean
}

/**
 * OTPInput component that integrates with Zod validation
 */
export function OTPInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue = "",
  value,
  containerClassName,
  labelClassName,
  labelVariant = "default",
  variant = "default",
  coloredBorder = false,
  schema,
  onValidate,
  onChange,
  onComplete,
  id = name,
  disabled = false,
  length = 6,
  maskChar = "•",
  mask = false,
  autoFocus = false,
  separator = false,
  groupSize = 3,
  autoSubmit = false,
}: OTPInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error)
  const [otpValue, setOtpValue] = React.useState<string[]>(
    (value || defaultValue || "").split("").slice(0, length).concat(Array(length).fill("")).slice(0, length),
  )
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const hasError = !!localError || !!error
  const errorId = `error-${id}`
  const hintId = `hint-${id}`
  const formRef = React.useRef<HTMLFormElement | null>(null)

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error)
  }, [error])

  // Update OTP value when controlled value changes
  React.useEffect(() => {
    if (isControlled && value !== undefined) {
      setOtpValue(value.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length))
    }
  }, [isControlled, value, length])

  // Find the closest form element
  React.useEffect(() => {
    if (autoSubmit) {
      const input = inputRefs.current[0]
      if (input) {
        let element: HTMLElement | null = input
        while (element && element.tagName !== "FORM") {
          element = element.parentElement
        }
        formRef.current = element as HTMLFormElement
      }
    }
  }, [autoSubmit])

  // Handle validation with the provided schema
  const validateOTP = React.useCallback(
    (value: string) => {
      if (!schema) return

      // Only validate if all digits are entered or if the form has been submitted
      if (value.length === length) {
        const result = schema.safeParse(value)
        if (!result.success) {
          const errorMessage = result.error.errors[0]?.message || "Invalid code"
          setLocalError(errorMessage)
          onValidate?.(false, value, errorMessage)
        } else {
          setLocalError(undefined)
          onValidate?.(true, value)
        }
      } else {
        // Clear error while user is still typing
        setLocalError(undefined)
      }
    },
    [schema, onValidate, length],
  )

  // Handle input change
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Handle paste event (detected by multiple characters)
    if (value.length > 1) {
      handlePaste(index, value)
      return
    }

    // Update the OTP value
    const newOtpValue = [...otpValue]
    newOtpValue[index] = value
    setOtpValue(newOtpValue)

    // Move focus to the next input if a value was entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Call onChange with the new value - ensure it's a clean string
    const newValue = newOtpValue.join("")
    onChange?.(newValue)

    // Check if OTP is complete
    if (newOtpValue.filter(Boolean).length === length) {
      onComplete?.(newValue)

      // Auto-submit the form if enabled
      if (autoSubmit && formRef.current) {
        setTimeout(() => {
          formRef.current?.requestSubmit()
        }, 100)
      }
    }
  }

  // Handle paste event
  const handlePaste = (startIndex: number, pastedValue: string) => {
    // Clean the pasted value to only include digits and letters
    const cleanedValue = pastedValue.replace(/\s/g, "")

    // Create a new OTP value array
    const newOtpValue = [...otpValue]

    // Fill in the OTP value with the pasted characters
    for (let i = 0; i < Math.min(cleanedValue.length, length - startIndex); i++) {
      newOtpValue[startIndex + i] = cleanedValue[i]
    }

    setOtpValue(newOtpValue)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtpValue.findIndex((v, i) => i >= startIndex && !v)
    if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
    }

    // Call onChange with the new value
    const newValue = newOtpValue.join("")
    onChange?.(newValue)

    // Validate if we have a schema
    if (schema) {
      validateOTP(newValue)
    }

    // Check if OTP is complete and trigger onComplete only once
    if (newOtpValue.every((v) => v) && newOtpValue.length === length) {
      onComplete?.(newValue)
    }
  }

  // Handle key down event
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to the previous input on backspace if the current input is empty
    if (e.key === "Backspace") {
      if (!otpValue[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()

        // Clear the previous input
        const newOtpValue = [...otpValue]
        newOtpValue[index - 1] = ""
        setOtpValue(newOtpValue)

        // Call onChange with the new value
        onChange?.(newOtpValue.join(""))
      }

      // Don't prevent default for backspace when there's content to delete
      if (!otpValue[index]) {
        e.preventDefault()
      }
    }

    // Prevent arrow key navigation
    else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
    }
  }

  // Handle focus event
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select the input content on focus
    e.target.select()
  }

  // Create input groups based on groupSize
  const inputGroups = []
  for (let i = 0; i < length; i += groupSize) {
    const group = []
    for (let j = 0; j < groupSize && i + j < length; j++) {
      group.push(i + j)
    }
    inputGroups.push(group)
  }

  return (
    <div className={cn("group/field grid gap-2", containerClassName)} data-invalid={hasError}>
      <label
        htmlFor={`${id}-0`}
        className={cn(
          "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive",
          labelVariant === "muted" && "text-muted-foreground",
          labelClassName,
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {description && <p className="text-sm text-muted-foreground">{description}</p>}

      <div className="flex items-center justify-center space-x-2">
        {inputGroups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            <div className="flex items-center space-x-2">
              {group.map((index) => (
                <div key={`input-${index}`} className="relative">
                  <input
                    ref={(el: HTMLInputElement | null) => {
                      if (inputRefs.current) {
                        inputRefs.current[index] = el
                      }
                    }}
                    id={index === 0 ? `${id}-0` : `${id}-${index}`}
                    name={index === 0 ? name : `${name}-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={mask && otpValue[index] ? maskChar : otpValue[index]}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={handleFocus}
                    disabled={pending || disabled}
                    aria-invalid={hasError}
                    aria-errormessage={hasError ? errorId : undefined}
                    aria-describedby={hint ? hintId : undefined}
                    aria-required={required}
                    autoFocus={autoFocus && index === 0}
                    className={cn(
                      "w-10 h-12 text-center text-lg font-medium",
                      "focus:outline-none focus:ring-2 focus:ring-[#4E90F9] dark:ring-offset-black ring-offset-white",
                      // Default variant styling
                      variant === "default" &&
                        "border border-input rounded-md shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]",
                      // Pill variant styling
                      variant === "pill" && "bg-muted border-0 rounded-lg focus:ring-offset-2",
                      variant === "pill" && coloredBorder && "border-2 border-primary",
                      // Error styling for both variants
                      "group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive",
                    )}
                  />
                  {/* Animated caret for empty inputs */}
                </div>
              ))}
            </div>
            {separator && groupIndex < inputGroups.length - 1 && (
              <div className="text-muted-foreground text-lg font-medium">-</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hidden input for form submission with the complete value */}
      <input type="hidden" name={name} value={otpValue.join("")} data-testid={`${id}-hidden`} />

      {hint && !hasError && (
        <p id={hintId} className="text-xs text-muted-foreground mt-1">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="text-destructive text-sm">
          {localError || error}
        </p>
      )}
    </div>
  )
}

