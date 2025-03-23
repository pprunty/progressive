'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioInputProps {
  /** The label for the radio group */
  label: string;
  /** The name of the radio group (used for form submission) */
  name: string;
  /** Options for the radio group */
  options: RadioOption[];
  /** Optional description text to display below the label */
  description?: string;
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
  /** Container className for the entire component */
  containerClassName?: string;
  /** Radio group className */
  radioGroupClassName?: string;
  /** Radio item className */
  radioItemClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Layout orientation - 'vertical' or 'horizontal' */
  orientation?: 'vertical' | 'horizontal';
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<string>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: string, error?: string) => void;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** ID for the radio group */
  id?: string;
  /** Whether the radio group is disabled */
  disabled?: boolean;
}

/**
 * RadioInput component that integrates with Zod validation
 */
export function RadioInput({
  label,
  name,
  options,
  description,
  error,
  required = false,
  pending = false,
  defaultValue,
  value,
  containerClassName,
  radioGroupClassName,
  radioItemClassName,
  labelClassName,
  labelVariant = 'default',
  orientation = 'vertical',
  schema,
  onValidate,
  onValueChange,
  id = name,
  disabled = false,
}: RadioInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const hasError = !!localError || !!error;
  const errorId = `error-${id}`;

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Handle validation with the provided schema
  const validateRadio = React.useCallback(
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

  // Handle selection change
  const handleValueChange = (newValue: string) => {
    // If we have a schema, validate on change
    if (schema) {
      validateRadio(newValue);
    }

    // Call the original onValueChange if provided
    onValueChange?.(newValue);
  };

  return (
    <div
      className={cn('group/field grid gap-2', containerClassName)}
      data-invalid={hasError}
    >
      <label
        id={`${id}-label`}
        className={cn(
          'text-sm mb-2 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive',
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

      <RadioGroup
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
        disabled={pending || disabled}
        className={cn(
          orientation === 'horizontal'
            ? 'flex items-center space-x-4'
            : 'space-y-3',
          radioGroupClassName,
        )}
        aria-labelledby={`${id}-label`}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-required={required}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              disabled={option.disabled || pending || disabled}
              className={cn(
                'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
                radioItemClassName,
              )}
            />
            <div className="grid gap-1 leading-none">
              <label
                htmlFor={`${id}-${option.value}`}
                className="text-xs font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>

      {hasError && (
        <p id={errorId} className="text-destructive text-xs">
          {localError || error}
        </p>
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value || defaultValue || ''} />
    </div>
  );
}
