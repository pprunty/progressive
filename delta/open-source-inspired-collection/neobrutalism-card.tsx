import React from 'react';
import { cn } from '@/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  color?:
    | 'blue'
    | 'pink'
    | 'green'
    | 'yellow'
    | 'purple'
    | 'gray'
    | 'orange'
    | 'red'
    | 'mint'
    | 'cream';
  hover?: boolean;
  borderWidth?: 'thin' | 'medium' | 'thick';
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      color = 'blue',
      hover = false,
      borderWidth = 'medium',
      children,
      ...props
    },
    ref,
  ) => {
    const colorStyles = {
      blue: 'bg-blue-300',
      pink: 'bg-pink-300',
      green: 'bg-green-300',
      yellow: 'bg-yellow-300',
      purple: 'bg-purple-300',
      gray: 'bg-gray-300',
      orange: 'bg-[#FFB347]',
      red: 'bg-[#FF7F7F]',
      mint: 'bg-[#98FF98]',
      cream: 'bg-[#F4E3CC]',
    };

    const borderWidthStyles = {
      thin: 'border-[1px]',
      medium: 'border-2',
      thick: 'border-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg',
          'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)]',
          borderWidthStyles[borderWidth],
          'border-black',
          colorStyles[color],
          'text-black',
          hover &&
            'transition-all duration-200 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] active:translate-y-1 active:translate-x-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-bold tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-black/80 mt-2', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
