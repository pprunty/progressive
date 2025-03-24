'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { z } from 'zod';

export interface CheckboxInputProps {
  /** The label for the checkbox */
  label: string;
  /** The name of the checkbox field (used for form submission) */
  name: string;
  /** Optional description text to display below the checkbox */
  description?: string;
  /** Optional hint text to display below the checkbox */
  hint?: string;
  /** Error message to display (typically from Zod validation) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is in a loading/pending state */
  pending?: boolean;
  /** Default checked state */
  defaultChecked?: boolean;
  /** Controlled checked state */
  checked?: boolean;
  /** Container className for the entire component */
  containerClassName?: string;
  /** Checkbox className */
  checkboxClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<boolean>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: boolean, error?: string) => void;
  /** Callback when checkbox state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** ID for the checkbox */
  id?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
}

/**
 * CheckboxInput component that integrates with Zod validation
 */
export function CheckboxInput({
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
  checkboxClassName,
  labelClassName,
  labelVariant = 'default',
  schema,
  onValidate,
  onCheckedChange,
  id = name,
  disabled = false,
}: CheckboxInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const [isChecked, setIsChecked] = React.useState<boolean>(
    checked !== undefined ? checked : defaultChecked,
  );
  const hasError = !!localError || !!error;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Update checked state when controlled prop changes
  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // Handle validation with the provided schema
  const validateCheckbox = React.useCallback(
    (value: boolean) => {
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

  // Handle checkbox change
  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);

    // If we have a schema, validate on change
    if (schema) {
      validateCheckbox(checked);
    }

    // Call the original onCheckedChange if provided
    onCheckedChange?.(checked);
  };

  return (
    <div
      className={cn('group/field space-y-2', containerClassName)}
      data-invalid={hasError}
    >
      <div className="flex items-start space-x-2">
        <Checkbox
          id={id}
          name={name}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          checked={checked !== undefined ? checked : undefined}
          disabled={pending || disabled}
          onCheckedChange={handleCheckedChange}
          aria-invalid={hasError}
          aria-errormessage={hasError ? errorId : undefined}
          aria-describedby={hint ? hintId : undefined}
          aria-required={required}
          className={cn(
            'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
            checkboxClassName,
          )}
          required={required}
        />
        <div className="grid gap-1.5 leading-none">
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
        </div>
      </div>

      {hint && !hasError && (
        <p id={hintId} className="text-xs text-muted-foreground pl-6 mt-1">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="text-destructive text-xs pl-6">
          {localError || error}
        </p>
      )}
    </div>
  );
}
