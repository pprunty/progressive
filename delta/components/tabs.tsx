'use client';

import React, {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  useCallback,
  forwardRef,
} from 'react';
import { cn } from '@/lib/utils';
import { XScrollable } from '@/delta/components/x-scrollable';

// Base Tabs component (Root)
const Tabs = forwardRef<
  HTMLDivElement,
  {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children?: ReactNode;
  }
>(
  (
    { defaultValue, value, onValueChange, className, children, ...props },
    ref,
  ) => {
    const [activeValue, setActiveValue] = useState(value || defaultValue || '');

    useEffect(() => {
      if (value !== undefined) {
        setActiveValue(value);
      }
    }, [value]);

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setActiveValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [onValueChange, value],
    );

    return (
      <div ref={ref} className={cn('tabs-container', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          return React.cloneElement(child as React.ReactElement<{
            activeValue?: string;
            onValueChange?: (value: string) => void;
            className?: string;
            children?: ReactNode;
            [key: string]: any;
          }>, {
            activeValue,
            onValueChange: handleValueChange,
          });
        })}
      </div>
    );
  },
);
Tabs.displayName = 'Tabs';

// TabsList component
const TabsList = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    activeValue?: string;
    onValueChange?: (value: string) => void;
    children?: ReactNode;
    showHoverEffect?: boolean;
    showActiveIndicator?: boolean;
    activeIndicatorPosition?: 'top' | 'bottom';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'pills' | 'underlined';
    stretch?: boolean;
    ariaLabel?: string;
    showBottomBorder?: boolean;
    bottomBorderClassName?: string;
    activeIndicatorClassName?: string;
    hoverIndicatorClassName?: string;
  }
>(
  (
    {
      className,
      activeValue,
      onValueChange,
      children,
      showHoverEffect = true,
      showActiveIndicator = true,
      activeIndicatorPosition = 'bottom',
      size = 'md',
      variant = 'default',
      stretch = false,
      ariaLabel = 'Tabs',
      showBottomBorder = false,
      bottomBorderClassName,
      activeIndicatorClassName,
      hoverIndicatorClassName,
      ...props
    },
    ref,
  ) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoverStyle, setHoverStyle] = useState({});
    const [activeStyle, setActiveStyle] = useState({
      left: '0px',
      width: '0px',
    });
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    // Find active tab index based on value
    const activeIndex = React.Children.toArray(children).findIndex(
      (child) =>
        React.isValidElement(child) &&
        (child as React.ReactElement<{ value: string }>).props.value === activeValue,
    );

    // Update hover indicator position
    useEffect(() => {
      if (hoveredIndex !== null && showHoverEffect) {
        const hoveredElement = tabRefs.current[hoveredIndex];
        if (hoveredElement) {
          const { offsetLeft, offsetWidth } = hoveredElement;
          setHoverStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        }
      }
    }, [hoveredIndex, showHoverEffect]);

    // Update active indicator position
    const updateActiveIndicator = useCallback(() => {
      if (showActiveIndicator && activeIndex >= 0) {
        const activeElement = tabRefs.current[activeIndex];
        if (activeElement) {
          const { offsetLeft, offsetWidth } = activeElement;
          setActiveStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        }
      }
    }, [activeIndex, showActiveIndicator]);

    // Update active indicator on active tab change
    useEffect(() => {
      updateActiveIndicator();
    }, [activeIndex, updateActiveIndicator]);

    // Initialize active indicator position
    useEffect(() => {
      requestAnimationFrame(updateActiveIndicator);
    }, [updateActiveIndicator]);

    // Function to scroll tab to center
    const scrollTabToCenter = (index: number) => {
      const tabElement = tabRefs.current[index];
      const scrollContainer = scrollContainerRef.current;

      if (tabElement && scrollContainer) {
        const containerWidth = scrollContainer.offsetWidth;
        const tabWidth = tabElement.offsetWidth;
        const tabLeft = tabElement.offsetLeft;

        // Calculate position to center the tab
        const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2;

        // Smooth scroll to the target position
        scrollContainer.scrollTo({
          left: scrollTarget,
          behavior: 'smooth',
        });
      }
    };

    // Size classes
    const sizeClasses = {
      sm: 'h-[24px] text-xs',
      md: 'h-[30px] text-sm',
      lg: 'h-[36px] text-base',
    };

    // Variant classes
    const variantClasses = {
      default: '',
      pills: 'rounded-full',
      underlined: '',
    };

    // Active indicator classes
    const activeIndicatorClasses = {
      default: 'h-[4px] bg-foreground dark:bg-white',
      pills: 'hidden',
      underlined: 'h-[4px] bg-foreground dark:bg-white',
    };

    // Hover indicator classes
    const hoverIndicatorClasses = {
      default: 'bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px]',
      pills: 'bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-full',
      underlined: 'bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px]',
    };

    // Create a proper ref callback function
    const setTabRef = useCallback(
      (el: HTMLDivElement | null, index: number) => {
        tabRefs.current[index] = el;
      },
      [],
    );

    // Save a reference to the scroll container when it's mounted
    const handleScrollableRef = useCallback((node: HTMLDivElement | null) => {
      if (node) {
        // Find the actual scrollable div inside XScrollable
        const scrollableDiv = node.querySelector(
          'div[class*="overflow-x-auto"]',
        );
        if (scrollableDiv) {
          scrollContainerRef.current = scrollableDiv as HTMLDivElement;
        }
      }
    }, []);

    // Center the active tab on initial render
    useEffect(() => {
      if (activeIndex >= 0) {
        // Use a small timeout to ensure the tabs are properly rendered
        const timer = setTimeout(() => {
          scrollTabToCenter(activeIndex);
        }, 100);

        return () => clearTimeout(timer);
      }
    }, [activeIndex]);

    return (
      <div
        ref={handleScrollableRef}
        className={cn('relative', className)}
        role="tablist"
        aria-label={ariaLabel}
        {...props}
      >
        <XScrollable showScrollbar={false}>
          <div className={cn('relative', showBottomBorder && 'pb-px')}>
            {/* Bottom border for the entire tab list */}
            {showBottomBorder && (
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 h-px bg-border dark:bg-border',
                  bottomBorderClassName,
                )}
              />
            )}

            {/* Hover Indicator */}
            {showHoverEffect && (
              <div
                className={cn(
                  'absolute transition-all duration-300 ease-out flex items-center z-0',
                  sizeClasses[size],
                  hoverIndicatorClasses[variant],
                  hoverIndicatorClassName,
                )}
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
                aria-hidden="true"
              />
            )}

            {/* Tabs */}
            <div
              ref={ref}
              className={cn(
                'relative flex items-center',
                stretch ? 'w-full' : '',
                variant === 'default' ? 'space-x-[6px]' : 'space-x-[2px]',
              )}
            >
              {React.Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) return child;

                const props = (child as React.ReactElement<{
                  value: string;
                  disabled?: boolean;
                  label?: string;
                  className?: string;
                  activeClassName?: string;
                  inactiveClassName?: string;
                  disabledClassName?: string;
                }>).props;

                const { value, disabled, label } = props;
                const isActive = value === activeValue;

                return (
                  <div
                    key={value}
                    ref={(el) => setTabRef(el, index)}
                    className={cn(
                      'px-3 py-2 sm:mb-1.5 mb-2 cursor-pointer transition-colors duration-300',
                      sizeClasses[size],
                      variant === 'pills' && isActive
                        ? 'bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-full'
                        : '',
                      disabled ? 'opacity-50 cursor-not-allowed' : '',
                      stretch ? 'flex-1 text-center' : '',
                      isActive
                        ? cn(
                            'text-foreground dark:text-white',
                            props.activeClassName,
                          )
                        : cn(
                            'text-[#0e0f1199] dark:text-[#ffffff99]',
                            props.inactiveClassName,
                          ),
                      disabled && props.disabledClassName,
                      variantClasses[variant],
                      props.className,
                    )}
                    onMouseEnter={() => !disabled && setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (!disabled) {
                        onValueChange?.(value);
                        scrollTabToCenter(index);
                      }
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-disabled={disabled}
                    aria-controls={`tabpanel-${value}`}
                    id={`tab-${value}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <div className="whitespace-nowrap flex items-center justify-center h-full">
                      {child}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Indicator */}
            {showActiveIndicator && variant !== 'pills' && activeIndex >= 0 && (
              <div
                className={cn(
                  'absolute transition-all duration-300 ease-out z-10',
                  activeIndicatorClasses[variant],
                  activeIndicatorPosition === 'top'
                    ? 'top-[-1px]'
                    : 'bottom-[-1px]',
                  activeIndicatorClassName,
                )}
                style={activeStyle}
                aria-hidden="true"
              />
            )}
          </div>
        </XScrollable>
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

// TabsTrigger component
const TabsTrigger = forwardRef<
  HTMLDivElement,
  {
    value: string;
    disabled?: boolean;
    label?: string;
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    disabledClassName?: string;
    activeValue?: string;
    onValueChange?: (value: string) => void;
    children?: ReactNode;
  }
>(
  (
    {
      value,
      disabled = false,
      label,
      className,
      activeClassName,
      inactiveClassName,
      disabledClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={className} {...props}>
        {label || children}
      </div>
    );
  },
);

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent component
const TabsContent = forwardRef<
  HTMLDivElement,
  {
    value: string;
    className?: string;
    activeValue?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
  }
>(
  (
    {
      value,
      className,
      activeValue,
      onValueChange, // Destructure this prop to prevent it from being passed to the div
      children,
      ...props
    },
    ref,
  ) => {
    if (value !== activeValue) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
