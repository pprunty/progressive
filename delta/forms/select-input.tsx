'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectInputProps {
  /** The label for the select field */
  label: string;
  /** The name of the select field (used for form submission) */
  name: string;
  /** Options for the select dropdown */
  options: SelectOption[];
  /** Optional description text to display below the label */
  description?: string;
  /** Optional hint text to display below the select */
  hint?: string;
  /** Error message to display (typically from Zod validation) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is in a loading/pending state */
  pending?: boolean;
  /** Default selected value */
  defaultValue?: string;
  /** Controlled selected value */
  value?: string;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Container className for the entire component */
  containerClassName?: string;
  /** Select trigger className */
  selectClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Select variant - 'default' or 'pill' */
  variant?: 'default' | 'pill';
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean;
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** ID for the select */
  id?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
}

/**
 * SelectInput component that integrates with Zod validation
 */
export function SelectInput({
  label,
  name,
  options,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue,
  value,
  placeholder = 'Select an option',
  containerClassName,
  selectClassName,
  labelClassName,
  labelVariant = 'default',
  variant = 'default',
  coloredBorder = false,
  schema,
  onValidate,
  onValueChange,
  id = name,
  disabled = false,
}: SelectInputProps) {
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
  const validateSelect = React.useCallback(
    (value: string) => {
      if (!schema) return;

      const result = schema.safeParse(value);
      if (!result.success) {
        const errorMessage =
          result.error.errors[0]?.message || 'Invalid selection';
        setLocalError(errorMessage);
        onValidate?.(false, value, errorMessage);
      } else {
        setLocalError(undefined);
        onValidate?.(true, value);
      }
    },
    [schema, onValidate],
  );

  // Handle selection change for shadcn Select
  const handleValueChange = (newValue: string) => {
    // If we have a schema, validate on change
    if (schema) {
      validateSelect(newValue);
    }

    // Call the original onValueChange if provided
    onValueChange?.(newValue);
  };

  // Handle selection change for native select
  const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    // If we have a schema, validate on change
    if (schema) {
      validateSelect(newValue);
    }

    // Call the original onValueChange if provided
    onValueChange?.(newValue);
  };

  // Render native select for pill variant
  if (variant === 'pill') {
    return (
      <div
        className={cn('group/field grid gap-2', containerClassName)}
        data-invalid={hasError}
      >
        <label
          htmlFor={id}
          className={cn(
            'text-md font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive',
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

        <div className="relative">
          <select
            id={id}
            name={name}
            onChange={handleNativeChange}
            disabled={pending || disabled}
            aria-invalid={hasError}
            aria-errormessage={hasError ? errorId : undefined}
            aria-describedby={hint ? hintId : undefined}
            aria-required={required}
            className={cn(
              'bg-muted border-0 rounded-lg h-12 px-4 w-full pr-10',
              coloredBorder && 'border-2 border-primary',
              'text-foreground',
              'appearance-none',
              'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
              selectClassName,
            )}
            // Only pass one of value or defaultValue, not both
            {...(isControlled ? { value } : { defaultValue })}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
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
      </div>
    );
  }

  // Render shadcn Select for default variant
  return (
    <div
      className={cn('group/field grid gap-2', containerClassName)}
      data-invalid={hasError}
    >
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive',
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

      <Select
        onValueChange={handleValueChange}
        disabled={pending || disabled}
        // Only pass one of value or defaultValue, not both
        {...(isControlled ? { value } : { defaultValue })}
      >
        <SelectTrigger
          id={id}
          className={cn(
            'shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]',
            'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
            selectClassName,
          )}
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
          aria-describedby={hint ? hintId : undefined}
          aria-required={required}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
