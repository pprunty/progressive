'use client';

import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { ClipLoader } from 'react-spinners';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'action';

export interface ButtonProps {
  onClick?: () => void;
  title: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  variant?: ButtonVariant;
  extendedClickArea?: boolean;
  isLoading?: boolean; // New prop for loading state
  spinnerSize?: number; // Optional prop for spinner size
  spinnerColor?: string; // Optional prop for spinner color
}

export function Button({
  onClick,
  title,
  type = 'button',
  className,
  disabled = false,
  icon,
  variant = 'primary',
  extendedClickArea = false,
  isLoading = false, // Default to not loading
  spinnerSize = 20, // Default size
  spinnerColor, // Will use appropriate color based on variant if not specified
}: ButtonProps) {
  // Determine spinner color based on variant and theme colors
  const getSpinnerColor = () => {
    if (spinnerColor) return spinnerColor;

    switch (variant) {
      case 'primary':
        return 'var(--primary-foreground)'; // White in light mode, dark in dark mode
      case 'secondary':
        return 'var(--secondary-foreground)'; // Dark in light mode, white in dark mode
      case 'action':
        return 'var(--action-foreground)'; // Always white/light
      case 'destructive':
        return 'var(--destructive-foreground)'; // Always white/light
      default:
        return 'currentColor'; // Fallback to the current text color
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading} // Disable when loading
      className={clsx(
        'w-full text-center rounded-md px-4 py-2 font-medium text-sm transition-all duration-200',
        'focus:outline-none focus:ring-0 focus-visible:ring-0',
        'focus:shadow-none focus-visible:shadow-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'active:opacity-80 active:scale-[0.99]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',

        // Add relative positioning when extended click area is enabled
        extendedClickArea && 'relative',

        // Primary variant styling
        variant === 'primary' && [
          'bg-primary text-primary-foreground',
          'hover:bg-primary-hover',
          'focus-visible:outline-primary/50',
          'disabled:hover:bg-primary',
        ],

        // Secondary variant styling
        variant === 'secondary' && [
          'bg-secondary text-secondary-foreground',
          'border border-border',
          'hover:bg-secondary-hover hover:border-border-hover',
          'focus-visible:outline-secondary/50',
          'disabled:hover:bg-secondary disabled:hover:border-border',
        ],

        // Destructive variant styling
        variant === 'destructive' && [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90',
          'focus-visible:outline-destructive/50',
          'disabled:hover:bg-destructive',
        ],

        // Action variant styling (form submission)
        variant === 'action' && [
          'bg-action text-action-foreground',
          'hover:bg-action-hover',
          'focus-visible:outline-action/50',
          'disabled:hover:bg-action',
        ],
        // Add the extended click area pseudo-element styles
        extendedClickArea &&
          'before:absolute before:-inset-10 before:block before:content-[""]',

        className,
      )}
      // Add these critical styles inline to ensure they override browser defaults
      style={{
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <ClipLoader
            size={spinnerSize}
            color={getSpinnerColor()}
            cssOverride={{ display: 'block' }}
          />
        ) : (
          <>
            {icon && <span className="flex items-center">{icon}</span>}
            <span>{title}</span>
          </>
        )}
      </div>
    </button>
  );
}
