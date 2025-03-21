'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  CloudArrowUp,
  X,
  File,
  Image,
  FileText,
  FileVideo,
  FileAudio,
} from '@phosphor-icons/react';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';

export interface FileInputProps {
  /** The label for the file input field */
  label: string;
  /** The name of the file input field (used for form submission) */
  name: string;
  /** Optional description text to display below the label */
  description?: string;
  /** Optional hint text to display below the file input */
  hint?: string;
  /** Error message to display (typically from Zod validation) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is in a loading/pending state */
  pending?: boolean;
  /** Container className for the entire component */
  containerClassName?: string;
  /** Dropzone className for the file drop area */
  dropzoneClassName?: string;
  /** Label className for customizing the label */
  labelClassName?: string;
  /** Label variant - 'default' or 'muted' */
  labelVariant?: 'default' | 'muted';
  /** Input variant - 'default' or 'pill' */
  variant?: 'default' | 'pill';
  /** Whether to show a colored border (only applies to pill variant) */
  coloredBorder?: boolean;
  /** Zod schema for validation (optional - can be handled at the form level) */
  schema?: z.ZodType<File | File[]>;
  /** Callback when validation occurs */
  onValidate?: (isValid: boolean, files: File | File[], error?: string) => void;
  /** Callback when files are selected */
  onFilesSelected?: (files: File[]) => void;
  /** ID for the file input */
  id?: string;
  /** Whether the file input is disabled */
  disabled?: boolean;
  /** Whether to accept multiple files */
  multiple?: boolean;
  /** Accepted file types (e.g., "image/*", ".pdf", etc.) */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files (only applies when multiple is true) */
  maxFiles?: number;
  /** Custom text for the dropzone */
  dropzoneText?: string;
  /** Whether to show file previews */
  showPreviews?: boolean;
  /** Whether to show file type icons */
  showIcons?: boolean;
}

/**
 * FileInput component that integrates with Zod validation
 */
export function FileInput({
  label,
  name,
  description,
  hint,
  error,
  required = false,
  pending = false,
  containerClassName,
  dropzoneClassName,
  labelClassName,
  labelVariant = 'default',
  variant = 'default',
  coloredBorder = false,
  schema,
  onValidate,
  onFilesSelected,
  id = name,
  disabled = false,
  multiple = false,
  accept,
  maxSize,
  maxFiles = 5,
  dropzoneText,
  showPreviews = true,
  showIcons = true,
}: FileInputProps) {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const hasError = !!localError || !!error;
  const errorId = `error-${id}`;
  const hintId = `hint-${id}`;

  // Update local error when prop changes
  React.useEffect(() => {
    setLocalError(error);
  }, [error]);

  // Handle validation with the provided schema
  const validateFiles = React.useCallback(
    (files: File[]) => {
      if (!schema) return;

      try {
        const result = schema.safeParse(multiple ? files : files[0]);
        if (!result.success) {
          const errorMessage =
            result.error.errors[0]?.message || 'Invalid file(s)';
          setLocalError(errorMessage);
          onValidate?.(false, multiple ? files : files[0], errorMessage);
        } else {
          setLocalError(undefined);
          onValidate?.(true, multiple ? files : files[0]);
        }
      } catch (err) {
        setLocalError('Validation error');
        onValidate?.(false, multiple ? files : files[0], 'Validation error');
      }
    },
    [schema, onValidate, multiple],
  );

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);

    // Validate file size if maxSize is provided
    if (maxSize) {
      const oversizedFiles = selectedFiles.filter(
        (file) => file.size > maxSize,
      );
      if (oversizedFiles.length > 0) {
        const fileNames = oversizedFiles.map((f) => f.name).join(', ');
        const errorMsg = `File${oversizedFiles.length > 1 ? 's' : ''} too large: ${fileNames}`;
        setLocalError(errorMsg);
        return;
      }
    }

    // Validate number of files if multiple is true
    if (multiple && maxFiles && selectedFiles.length > maxFiles) {
      setLocalError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    // Update files state
    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;

    // Check if we're exceeding maxFiles after combining with existing files
    if (multiple && maxFiles && newFiles.length > maxFiles) {
      setLocalError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    setFiles(newFiles);

    // Validate with schema if provided
    if (schema) {
      validateFiles(newFiles);
    }

    // Call onFilesSelected callback
    onFilesSelected?.(newFiles);

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !pending) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !pending) {
      e.dataTransfer.dropEffect = 'copy';
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || pending) return;

    const droppedFiles = Array.from(e.dataTransfer.files);

    // Validate file types if accept is provided
    if (accept) {
      const acceptedTypes = accept.split(',').map((type) => type.trim());
      const invalidFiles = droppedFiles.filter((file) => {
        return !acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            // Check file extension
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          } else if (type.includes('/*')) {
            // Check file type category (e.g., "image/*")
            const category = type.split('/')[0];
            return file.type.startsWith(`${category}/`);
          } else {
            // Check exact mime type
            return file.type === type;
          }
        });
      });

      if (invalidFiles.length > 0) {
        const fileNames = invalidFiles.map((f) => f.name).join(', ');
        const errorMsg = `Invalid file type${invalidFiles.length > 1 ? 's' : ''}: ${fileNames}`;
        setLocalError(errorMsg);
        return;
      }
    }

    // Validate file size if maxSize is provided
    if (maxSize) {
      const oversizedFiles = droppedFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        const fileNames = oversizedFiles.map((f) => f.name).join(', ');
        const errorMsg = `File${oversizedFiles.length > 1 ? 's' : ''} too large: ${fileNames}`;
        setLocalError(errorMsg);
        return;
      }
    }

    // Validate number of files if multiple is true
    const newFiles = multiple ? [...files, ...droppedFiles] : droppedFiles;

    if (multiple && maxFiles && newFiles.length > maxFiles) {
      setLocalError(`You can only upload up to ${maxFiles} files`);
      return;
    }

    setFiles(newFiles);

    // Validate with schema if provided
    if (schema) {
      validateFiles(newFiles);
    }

    // Call onFilesSelected callback
    onFilesSelected?.(newFiles);
  };

  // Handle file removal
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    // Validate with schema if provided
    if (schema) {
      validateFiles(newFiles);
    }

    // Call onFilesSelected callback
    onFilesSelected?.(newFiles);
  };

  // Get appropriate icon for file type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image weight="regular" className="h-5 w-5" />;
    } else if (file.type.startsWith('video/')) {
      return <FileVideo weight="regular" className="h-5 w-5" />;
    } else if (file.type.startsWith('audio/')) {
      return <FileAudio weight="regular" className="h-5 w-5" />;
    } else if (file.type.startsWith('text/') || file.type.includes('pdf')) {
      return <FileText weight="regular" className="h-5 w-5" />;
    } else {
      return <File weight="regular" className="h-5 w-5" />;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  // Generate image preview URL
  const getImagePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div
      className={cn('group/field grid gap-2', containerClassName)}
      data-invalid={hasError}
    >
      <label
        htmlFor={id}
        className={cn(
          'text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]/field:text-destructive',
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

      <div
        className={cn(
          'relative cursor-pointer transition-colors',
          'flex flex-col items-center justify-center gap-2 text-center p-4 rounded-lg',
          // Default variant with single dashed border
          variant === 'default' &&
            'border-2 border-dashed border-muted-foreground/25',
          variant === 'default' &&
            'shadow-[0px_1px_1px_rgba(0,0,0,0.03),_0px_3px_6px_rgba(0,0,0,0.02)]',

          // Pill variant with solid border (not dashed)
          variant === 'pill' &&
            'bg-muted border border-solid border-transparent rounded-lg',
          variant === 'pill' && coloredBorder && 'border-primary/30',

          // Dragging state
          isDragging && 'border-primary/50 bg-primary/5',

          // Error state
          hasError &&
            'border-destructive/50 group-data-[invalid=true]/field:border-destructive',

          // Disabled state
          (disabled || pending) && 'opacity-60 cursor-not-allowed',

          dropzoneClassName,
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && !pending && fileInputRef.current?.click()}
        aria-invalid={hasError}
        aria-errormessage={hasError ? errorId : undefined}
        aria-describedby={hint ? hintId : undefined}
      >
        <input
          ref={fileInputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || pending}
          className="sr-only"
          onChange={handleFileChange}
          aria-required={required}
        />

        <CloudArrowUp
          weight="regular"
          className="h-10 w-10 text-muted-foreground/70"
        />

        <div className="space-y-1">
          <p className="text-md font-medium text-foreground">
            {dropzoneText || (
              <>
                <span className="text-primary">Click to upload</span> or drag
                and drop
              </>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {multiple
              ? `Upload up to ${maxFiles} file${maxFiles !== 1 ? 's' : ''}`
              : 'Upload a file'}
            {accept && ` (${accept.replace(/,/g, ', ')})`}
            {maxSize && ` up to ${formatFileSize(maxSize)}`}
          </p>
        </div>
      </div>

      {/* File previews */}
      {showPreviews && files.length > 0 && (
        <div className="mt-2 space-y-2">
          {files.map((file, index) => {
            const imagePreview = getImagePreview(file);

            return (
              <div
                key={`${file.name}-${index}`}
                className={cn(
                  'flex items-center justify-between p-2',
                  variant === 'pill'
                    ? 'bg-muted rounded-lg'
                    : 'bg-muted/50 border border-border rounded',
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  {showIcons && (
                    <div className="flex-shrink-0 text-muted-foreground">
                      {getFileIcon(file)}
                    </div>
                  )}

                  {imagePreview && (
                    <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0 bg-background">
                      <img
                        src={imagePreview || '/placeholder.svg'}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-md font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full flex-shrink-0 transition-none hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={disabled || pending}
                  aria-label={`Remove ${file.name}`}
                >
                  <X weight="regular" className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

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
