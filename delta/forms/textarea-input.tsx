'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { z } from 'zod';

export interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The label for the textarea field */
  label: string;
  /** The name of the textarea field (used for form submission) */
  name: string;
  /** Optional description text to display below the label */
  description?: string;
  /** Optional hint text to display below the textarea */
  hint?: string;
  /** Error message to display (typically from Zod validation) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is in a loading/pending state */
  pending?: boolean;
  /** Default value for the textarea */
  defaultValue?: string;
  /** Container className for the entire component */
  containerClassName?: string;
  /** Label className for customizing the label */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Textarea variant - 'default' or 'pill' */
  variant?: 'default' | 'pill';
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean;
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void;
}

/**
 * TextareaInput component that integrates with Zod validation
 */
export function TextareaInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue,
  containerClassName,
  labelClassName,
  labelVariant = 'default',
  variant = 'default',
  coloredBorder = false,
  schema,
  onValidate,
  className,
  id = name,
  value,
  ...props
}: TextareaInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const hasError = !!localError || !!error;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Handle validation with the provided schema
  const validateTextarea = React.useCallback(
    (value: string) => {
      if (!schema) return;

      const result = schema.safeParse(value);
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || 'Invalid input';
        setLocalError(errorMessage);
        onValidate?.(false, value, errorMessage);
      } else {
        setLocalError(undefined);
        onValidate?.(true, value);
      }
    },
    [schema, onValidate],
  );

  // Handle textarea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // If we have a schema, validate on change
    if (schema) {
      validateTextarea(newValue);
    }

    // Call the original onChange if provided
    props.onChange?.(e);
  };

  // Handle blur event for validation
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (schema) {
      validateTextarea(e.target.value);
    }

    // Call the original onBlur if provided
    props.onBlur?.(e);
  };

  return (
    <div
      className={cn('group/field grid gap-2', containerClassName)}
      data-invalid={hasError}
    >
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive',
          labelVariant === 'muted' && 'text-muted-foreground',
          labelClassName,
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <Textarea
        id={id}
        name={name}
        disabled={pending || props.disabled}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-describedby={hint ? hintId : undefined}
        aria-required={required}
        className={cn(
          'h-[46px] md:text-md text-md',
          // Default variant styling
          variant === 'default' &&
            'shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]',

          // Pill variant styling - less rounded
          variant === 'pill' && 'bg-muted border-0 rounded-lg px-4 py-3',
          variant === 'pill' && coloredBorder && 'border-2 border-primary',
          variant === 'pill' && 'placeholder:text-muted-foreground',

          // Error styling for both variants
          'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
          className,
        )}
        onChange={handleChange}
        onBlur={handleBlur}
        // Only pass one of value or defaultValue, not both
        {...(isControlled ? { value } : { defaultValue })}
        {...props}
      />

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
    </div>
  );
}
