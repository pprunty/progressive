'use client';

import * as React from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/delta/forms/text-input';
import { CheckboxInput } from '@/delta/forms/checkbox-input';
import { SelectInput } from '@/delta/forms/select-input';
import { RadioInput } from '@/delta/forms/radio-input';
import { SwitchInput } from '@/delta/forms/switch-input';
import { TextareaInput } from '@/delta/forms/textarea-input';
import { DateInput } from '@/delta/forms/date-input';
import { FileInput } from '@/delta/forms/file-input';
import { cn } from '@/lib/utils';

// Field types
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'checkbox'
  | 'select'
  | 'radio'
  | 'switch'
  | 'textarea'
  | 'date'
  | 'file';

// Base field definition
interface BaseFieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  hint?: string;
  labelVariant?: 'default' | 'muted';
  variant?: 'default' | 'pill';
  className?: string;
  hidden?: boolean | ((values: Record<string, any>) => boolean);
  // New properties for field grouping and layout
  group?: string;
  width?: string | number;
}

// Text field definition
interface TextFieldDefinition extends BaseFieldDefinition {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  defaultValue?: string;
}

// Checkbox field definition
interface CheckboxFieldDefinition extends BaseFieldDefinition {
  type: 'checkbox';
  defaultChecked?: boolean;
}

// Select field definition
interface SelectFieldDefinition extends BaseFieldDefinition {
  type: 'select';
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  defaultValue?: string;
}

// Radio field definition
interface RadioFieldDefinition extends BaseFieldDefinition {
  type: 'radio';
  options: {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }[];
  orientation?: 'vertical' | 'horizontal';
  defaultValue?: string;
}

// Switch field definition
interface SwitchFieldDefinition extends BaseFieldDefinition {
  type: 'switch';
  defaultChecked?: boolean;
}

// Textarea field definition
interface TextareaFieldDefinition extends BaseFieldDefinition {
  type: 'textarea';
  placeholder?: string;
  rows?: number;
  defaultValue?: string;
}

// Date field definition
interface DateFieldDefinition extends BaseFieldDefinition {
  type: 'date';
  placeholder?: string;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
}

// File field definition
interface FileFieldDefinition extends BaseFieldDefinition {
  type: 'file';
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  showPreviews?: boolean;
  showIcons?: boolean;
}

// Union of all field definitions
export type FieldDefinition =
  | TextFieldDefinition
  | CheckboxFieldDefinition
  | SelectFieldDefinition
  | RadioFieldDefinition
  | SwitchFieldDefinition
  | TextareaFieldDefinition
  | DateFieldDefinition
  | FileFieldDefinition;

// Form props
export interface SmartFormProps {
  fields: FieldDefinition[];
  schema: z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;
  onSubmit: (data: any) => Promise<void> | void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  fieldClassName?: string;
  submitClassName?: string;
  cancelClassName?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: number;
  gap?: number;
  loading?: boolean;
  defaultValues?: Record<string, any>;
  successMessage?: string;
  errorMessage?: string;
  resetOnSuccess?: boolean;
  id?: string;
}

export function SmartForm({
  fields,
  schema,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  className,
  fieldClassName,
  submitClassName,
  cancelClassName,
  layout = 'vertical',
  columns = 1,
  gap = 6,
  loading = false,
  defaultValues = {},
  successMessage,
  errorMessage,
  resetOnSuccess = false,
  id,
}: SmartFormProps) {
  // Use a ref to store the initial defaultValues to prevent re-renders
  const initialDefaultValuesRef = React.useRef(defaultValues);

  const [formState, setFormState] = React.useState<{
    values: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isSubmitted: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage?: string;
    successMessage?: string;
  }>({
    values: { ...initialDefaultValuesRef.current },
    errors: {},
    touched: {},
    isSubmitting: false,
    isSubmitted: false,
    isSuccess: false,
    isError: false,
  });

  // Only update values from defaultValues on mount or when explicitly reset
  const resetForm = React.useCallback(
    (newValues = initialDefaultValuesRef.current) => {
      setFormState((prev) => ({
        ...prev,
        values: { ...newValues },
        errors: {},
        touched: {},
        isSubmitted: false,
        isSuccess: false,
        isError: false,
        errorMessage: undefined,
        successMessage: undefined,
      }));
    },
    [],
  );

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      isSubmitted: true,
      isSuccess: false,
      isError: false,
    }));

    try {
      // Validate form data against schema
      const result = schema.safeParse(formState.values);

      if (!result.success) {
        // Format errors
        const formattedErrors: Record<string, string> = {};
        const formattedError = result.error.format();

        Object.entries(formattedError).forEach(([key, value]) => {
          if (
            key !== '_errors' &&
            typeof value === 'object' &&
            '_errors' in value &&
            Array.isArray(value._errors)
          ) {
            formattedErrors[key] = value._errors[0];
          }
        });

        setFormState((prev) => ({
          ...prev,
          errors: formattedErrors,
          isSubmitting: false,
          isError: true,
          errorMessage: errorMessage || 'Please fix the errors in the form',
        }));
        return;
      }

      // Call onSubmit with validated data
      await onSubmit(result.data);

      // Update form state on success
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        successMessage: successMessage || 'Form submitted successfully',
      }));

      // Reset form if needed
      if (resetOnSuccess) {
        resetForm();
      }
    } catch (error) {
      // Handle submission errors
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        isError: true,
        errorMessage:
          errorMessage || 'An error occurred while submitting the form',
      }));
    }
  };

  // Handle field change - use a memoized callback to prevent recreating on every render
  const handleChange = React.useCallback((name: string, value: any) => {
    setFormState((prev) => {
      // Only update if the value has actually changed
      if (prev.values[name] === value) {
        return prev;
      }

      return {
        ...prev,
        values: {
          ...prev.values,
          [name]: value,
        },
        touched: {
          ...prev.touched,
          [name]: true,
        },
      };
    });
  }, []);

  // Validate a single field - memoized to prevent recreating on every render
  const validateField = React.useCallback(
    (name: string, value: any) => {
      try {
        // Get the underlying object schema if it's a ZodEffects
        const objectSchema =
          schema instanceof z.ZodEffects ? schema.innerType() : schema;

        // Create a partial schema for just this field
        const fieldSchema = z.object({
          [name]: objectSchema.shape[name],
        });

        // Validate the field
        const result = fieldSchema.safeParse({ [name]: value });

        if (!result.success) {
          const error = result.error.format()[name]?._errors[0];
          setFormState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: error || 'Invalid value',
            },
          }));
        } else {
          // Clear error if validation passes
          setFormState((prev) => {
            // Only update if there was an error before
            if (!prev.errors[name]) {
              return prev;
            }

            const newErrors = { ...prev.errors };
            delete newErrors[name];

            return {
              ...prev,
              errors: newErrors,
            };
          });
        }
      } catch (error) {
        // If there's an error in validation, don't update the error state
        console.error('Error validating field:', error);
      }
    },
    [schema],
  );

  // Render form layout
  const getFormLayoutClassName = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap items-start';
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`;
      case 'vertical':
      default:
        return 'flex flex-col space-y-6';
    }
  };

  // Memoize the visible fields to prevent unnecessary re-renders
  const visibleFields = React.useMemo(() => {
    return fields.filter((field) => {
      if (typeof field.hidden === 'function') {
        return !field.hidden(formState.values);
      }
      return !field.hidden;
    });
  }, [fields, formState.values]);

  // Group fields by their group property
  const groupedFields = React.useMemo(() => {
    const groups: Record<string, FieldDefinition[]> = {};
    const ungroupedFields: FieldDefinition[] = [];

    visibleFields.forEach((field) => {
      if (field.group) {
        if (!groups[field.group]) {
          groups[field.group] = [];
        }
        groups[field.group].push(field);
      } else {
        ungroupedFields.push(field);
      }
    });

    return { groups, ungroupedFields };
  }, [visibleFields]);

  // Render form fields - memoized to prevent recreating on every render
  const renderField = React.useCallback(
    (field: FieldDefinition) => {
      const commonProps = {
        label: field.label,
        name: field.name,
        required: field.required,
        disabled: field.disabled || loading || formState.isSubmitting,
        description: field.description,
        hint: field.hint,
        labelVariant: field.labelVariant,
        variant: field.variant,
        error: formState.errors[field.name],
        className: cn(fieldClassName, field.className),
      };

      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
        case 'url':
          return (
            <TextInput
              {...commonProps}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={formState.values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          );
        case 'checkbox':
          return (
            <CheckboxInput
              {...commonProps}
              defaultChecked={formState.values[field.name] || false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
          );
        case 'select':
          return (
            <SelectInput
              {...commonProps}
              options={field.options}
              placeholder={field.placeholder}
              defaultValue={formState.values[field.name] || ''}
              onValueChange={(value) => handleChange(field.name, value)}
            />
          );
        case 'radio':
          return (
            <RadioInput
              {...commonProps}
              options={field.options}
              orientation={field.orientation}
              defaultValue={formState.values[field.name] || ''}
              onValueChange={(value) => handleChange(field.name, value)}
            />
          );
        case 'switch':
          return (
            <SwitchInput
              {...commonProps}
              defaultChecked={formState.values[field.name] || false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
          );
        case 'textarea':
          return (
            <TextareaInput
              {...commonProps}
              placeholder={field.placeholder}
              rows={field.rows}
              defaultValue={formState.values[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          );
        case 'date':
          return (
            <DateInput
              {...commonProps}
              placeholder={field.placeholder}
              defaultValue={formState.values[field.name]}
              minDate={field.minDate}
              maxDate={field.maxDate}
              dateFormat={field.dateFormat}
              onValueChange={(date) => handleChange(field.name, date)}
            />
          );
        case 'file':
          return (
            <FileInput
              {...commonProps}
              accept={field.accept}
              multiple={field.multiple}
              maxSize={field.maxSize}
              maxFiles={field.maxFiles}
              showPreviews={field.showPreviews}
              showIcons={field.showIcons}
              onFilesSelected={(files) =>
                handleChange(field.name, field.multiple ? files : files[0])
              }
            />
          );
        default:
          return null;
      }
    },
    [
      fieldClassName,
      formState.errors,
      formState.isSubmitting,
      formState.values,
      handleChange,
      loading,
    ],
  );

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn('w-full', className)}
      noValidate
    >
      {/* Form status messages */}
      {formState.isSuccess && formState.successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
          {formState.successMessage}
        </div>
      )}

      {formState.isError && formState.errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {formState.errorMessage}
        </div>
      )}

      {/* Form fields */}
      <div className={getFormLayoutClassName()}>
        {/* Render ungrouped fields */}
        {groupedFields.ungroupedFields.map((field) => (
          <div
            key={field.name}
            className={cn(
              layout === 'horizontal' && 'mr-4 mb-4',
              layout === 'vertical' && 'mb-0',
              layout === 'grid' && 'mb-0',
            )}
            style={
              field.width
                ? {
                    width:
                      typeof field.width === 'number'
                        ? `${field.width}px`
                        : field.width,
                  }
                : undefined
            }
          >
            {renderField(field)}
          </div>
        ))}

        {/* Render grouped fields */}
        {Object.entries(groupedFields.groups).map(([groupName, fields]) => (
          <div key={groupName} className="w-full mb-6">
            <div className="flex flex-wrap gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={cn(
                    'flex-1',
                    field.width ? '' : `w-full sm:w-[calc(50%-8px)]`
                  )}
                  style={
                    field.width
                      ? {
                          width:
                            typeof field.width === 'number'
                              ? `${field.width}px`
                              : field.width,
                        }
                      : undefined
                  }
                >
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Form actions */}
      <div className="mt-6 flex items-center justify-end space-x-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading || formState.isSubmitting}
            className={cancelClassName}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading || formState.isSubmitting}
          className={submitClassName}
        >
          {formState.isSubmitting ? 'Submitting...' : submitText}
        </Button>
      </div>
    </form>
  );
}
