'use client';

import React, { useEffect, useState } from 'react';
import { Info, Lightbulb, Warning, XCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface AdmonitionProps {
  type?: 'warning' | 'note' | 'tip' | 'info' | 'danger';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Admonition({
  type = 'info',
  title,
  children,
  className,
}: AdmonitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const typeStyles: {
    [key: string]: {
      container: string;
      icon: string;
      title: string;
      iconComponent: React.ReactNode;
    };
  } = {
    note: {
      container:
        'bg-blue-50 dark:bg-blue-950/50 border-l-4 border-blue-500 dark:border-blue-400',
      icon: 'text-blue-500 dark:text-blue-400',
      title: 'text-blue-700 dark:text-blue-300',
      iconComponent: <Info weight="fill" className="h-5 w-5" />,
    },
    tip: {
      container:
        'bg-green-50 dark:bg-green-950/50 border-l-4 border-green-500 dark:border-green-400',
      icon: 'text-green-500 dark:text-green-400',
      title: 'text-green-700 dark:text-green-300',
      iconComponent: <Lightbulb weight="fill" className="h-5 w-5" />,
    },
    info: {
      container:
        'bg-slate-50 dark:bg-slate-900/50 border-l-4 border-slate-500 dark:border-slate-400',
      icon: 'text-slate-500 dark:text-slate-400',
      title: 'text-slate-700 dark:text-slate-300',
      iconComponent: <Info weight="fill" className="h-5 w-5" />,
    },
    warning: {
      container:
        'bg-amber-50 dark:bg-amber-950/50 border-l-4 border-amber-500 dark:border-amber-400',
      icon: 'text-amber-500 dark:text-amber-400',
      title: 'text-amber-700 dark:text-amber-300',
      iconComponent: <Warning weight="fill" className="h-5 w-5" />,
    },
    danger: {
      container:
        'bg-red-50 dark:bg-red-950/50 border-l-4 border-red-500 dark:border-red-400',
      icon: 'text-red-500 dark:text-red-400',
      title: 'text-red-700 dark:text-red-300',
      iconComponent: <XCircle weight="fill" className="h-5 w-5" />,
    },
  };

  const defaultTitle = {
    note: 'Note',
    tip: 'Tip',
    info: 'Info',
    warning: 'Warning',
    danger: 'Danger',
  };

  const styles = typeStyles[type];
  const displayTitle = title || defaultTitle[type];

  return (
    <div
      className={cn(
        `p-4 my-6 rounded-r-md shadow-sm transition-all duration-300 ease-in-out`,
        styles.container,
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
          {styles.iconComponent}
        </div>
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <h3 className={cn('font-medium text-base mb-1', styles.title)}>
              {displayTitle}
            </h3>
          )}
          <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
