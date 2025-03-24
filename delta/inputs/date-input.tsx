'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { z } from 'zod';

export interface DateInputProps {
  /** The label for the date field */
  label: string;
  /** The name of the date field (used for form submission) */
  name: string;
  /** Optional description text to display below the label */
  description?: string;
  /** Optional hint text to display below the date picker */
  hint?: string;
  /** Error message to display (typically from Zod validation) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is in a loading/pending state */
  pending?: boolean;
  /** Default selected date */
  defaultValue?: Date;
  /** Controlled selected date */
  value?: Date;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Format to display the selected date (default: PP) */
  dateFormat?: string;
  /** Container className for the entire component */
  containerClassName?: string;
  /** Trigger button className */
  triggerClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Date picker variant - 'default' or 'pill' */
  variant?: 'default' | 'pill';
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean;
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<Date>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, value: Date, error?: string) => void;
  /** Callback when date changes */
  onValueChange?: (value: Date | undefined) => void;
  /** ID for the date picker */
  id?: string;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Min date that can be selected */
  minDate?: Date;
  /** Max date that can be selected */
  maxDate?: Date;
}

/**
 * DateInput component that integrates with Zod validation
 */
export function DateInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  defaultValue,
  value,
  placeholder = 'Select a date',
  dateFormat = 'PPP',
  containerClassName,
  triggerClassName,
  labelClassName,
  labelVariant = 'default',
  variant = 'default',
  coloredBorder = false,
  schema,
  onValidate,
  onValueChange,
  id = name,
  disabled = false,
  minDate,
  maxDate,
}: DateInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const hasError = !!localError || !!error;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  // Determine if component is controlled or uncontrolled
  const isControlled = value !== undefined;
  const [date, setDate] = React.useState<Date | undefined>(
    isControlled ? value : defaultValue,
  );

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Update date when controlled value changes
  React.useEffect(() => {
    if (isControlled) {
      setDate(value);
    }
  }, [isControlled, value]);

  // Handle validation with the provided schema
  const validateDate = React.useCallback(
    (value: Date | undefined) => {
      if (!schema || !value) return;

      const result = schema.safeParse(value);
      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message || 'Invalid date';
        setLocalError(errorMessage);
        onValidate?.(false, value, errorMessage);
      } else {
        setLocalError(undefined);
        onValidate?.(true, value);
      }
    },
    [schema, onValidate],
  );

  // Handle date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    // If we have a schema and a date, validate on change
    if (schema && newDate) {
      validateDate(newDate);
    }

    // Call the original onValueChange if provided
    onValueChange?.(newDate);
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            disabled={pending || disabled}
            className={cn(
              'h-[46px] md:text-md text-md',
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              // Default variant styling
              variant === 'default' &&
                'shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]',

              // Pill variant styling - less rounded
              variant === 'pill' && 'bg-muted border-0 rounded-lg h-12 px-4',
              variant === 'pill' && coloredBorder && 'border-2 border-primary',

              // Error styling for both variants
              'group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive',
              triggerClassName,
            )}
            aria-invalid={hasError}
            aria-errormessage={hasError ? errorId : undefined}
            aria-describedby={hint ? hintId : undefined}
            aria-required={required}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            disabled={
              disabled ||
              pending ||
              (minDate && maxDate
                ? (date) => date < minDate || date > maxDate
                : undefined)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={date ? date.toISOString() : ''} />

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
