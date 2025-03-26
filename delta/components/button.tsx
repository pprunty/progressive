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
  actionColor?: string; // New prop for customizing action variant color
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
  actionColor, // New prop
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

  // Get action variant styles based on whether a custom color is provided
  const getActionStyles = () => {
    if (actionColor) {
      // If it's a Tailwind class (starts with bg-)
      if (actionColor.startsWith('bg-')) {
        const baseColor = actionColor.replace('bg-', '');
        return [
          `${actionColor} text-white`,
          `hover:${actionColor}/80 active:${actionColor}/80`,
          `focus-visible:outline-${baseColor}/50`,
          `disabled:hover:${actionColor}`,
        ];
      }
      // If it's a hex color
      return [
        `bg-[${actionColor}] text-white`,
        `hover:bg-[${actionColor}]/80 active:bg-[${actionColor}]/80`,
        `focus-visible:outline-[${actionColor}]/50`,
        `disabled:hover:bg-[${actionColor}]`,
      ];
    }

    return [
      'bg-blue-600 text-white',
      'hover:bg-blue-600/80 active:bg-blue-600/80',
      'focus-visible:outline-blue-500/50',
      'disabled:hover:bg-blue-600',
    ];
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
        'active:scale-[0.99]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',

        // Add relative positioning when extended click area is enabled
        extendedClickArea && 'relative',

        // Primary variant styling
        variant === 'primary' && [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/80 active:bg-primary/80',
          'focus-visible:outline-primary/50',
          'disabled:hover:bg-primary',
        ],

        // Secondary variant styling
        variant === 'secondary' && [
          'bg-background text-secondary-foreground',
          'border border-border',
          'hover:bg-secondary/80 active:bg-secondary/80',
          'hover:border-border-hover',
          'focus-visible:outline-secondary/50',
          'disabled:hover:bg-secondary disabled:hover:border-border',
        ],

        // Destructive variant styling
        variant === 'destructive' && [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/80 active:bg-destructive/80',
          'focus-visible:outline-destructive/50',
          'disabled:hover:bg-destructive',
        ],

        // Action variant styling with customizable color
        variant === 'action' && getActionStyles(),

        // Add the extended click area pseudo-element styles
        extendedClickArea &&
          'before:absolute before:-inset-10 before:block before:content-[""]',

        className,
      )}
      // Add these critical styles inline to ensure they override browser defaults
      style={{
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        ...(variant === 'action' && actionColor && !actionColor.startsWith('bg-') && {
          backgroundColor: actionColor,
          '--tw-bg-opacity': 1,
        }),
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
