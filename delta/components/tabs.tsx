'use client';

import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';
import { cn } from '@/lib/utils';
import { XScrollable } from '@/delta/components/x-scrollable';

export interface TabItem {
  id: string;
  label: string | ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tab items to display */
  items: TabItem[];
  /** Index of the default active tab (0-based) */
  defaultActiveIndex?: number;
  /** Callback fired when active tab changes */
  onTabChange?: (index: number, id: string) => void;
  /** Custom class name for the tabs container */
  className?: string;
  /** Custom class name for the active indicator */
  activeIndicatorClassName?: string;
  /** Custom class name for the hover indicator */
  hoverIndicatorClassName?: string;
  /** Custom class name for each tab */
  tabClassName?: string;
  /** Custom class name for the active tab */
  activeTabClassName?: string;
  /** Custom class name for the inactive tab */
  inactiveTabClassName?: string;
  /** Custom class name for the disabled tab */
  disabledTabClassName?: string;
  /** Whether to show the hover effect */
  showHoverEffect?: boolean;
  /** Whether to show the active indicator */
  showActiveIndicator?: boolean;
  /** Position of the active indicator */
  activeIndicatorPosition?: 'top' | 'bottom';
  /** Size of the tabs */
  size?: 'sm' | 'md' | 'lg';
  /** Variant of the tabs */
  variant?: 'default' | 'pills' | 'underlined';
  /** Whether to stretch tabs to fill the container */
  stretch?: boolean;
  /** Aria label for the tabs navigation */
  ariaLabel?: string;
  /** Whether to show a bottom border for the entire tab list */
  showBottomBorder?: boolean;
  /** Custom class name for the bottom border */
  bottomBorderClassName?: string;
}

export function Tabs({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  activeIndicatorClassName,
  hoverIndicatorClassName,
  tabClassName,
  activeTabClassName,
  inactiveTabClassName,
  disabledTabClassName,
  showHoverEffect = true,
  showActiveIndicator = true,
  activeIndicatorPosition = 'bottom',
  size = 'md',
  variant = 'default',
  stretch = false,
  ariaLabel = 'Tabs',
  showBottomBorder = false,
  bottomBorderClassName,
}: TabsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

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
    if (showActiveIndicator) {
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
  }, []);

  // Initialize active indicator position
  useEffect(() => {
    requestAnimationFrame(updateActiveIndicator);
  }, [updateActiveIndicator]);

  // Handle tab click
  const handleTabClick = (index: number) => {
    if (items[index].disabled) return;

    setActiveIndex(index);
    onTabChange?.(index, items[index].id);

    // Scroll the clicked tab into center view
    scrollTabToCenter(index);
  };

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
    default: 'bg-foreground dark:bg-white',
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
  const setTabRef = useCallback((el: HTMLDivElement | null, index: number) => {
    tabRefs.current[index] = el;
  }, []);

  // Save a reference to the scroll container when it's mounted
  const handleScrollableRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // Find the actual scrollable div inside XScrollable
      const scrollableDiv = node.querySelector('div[class*="overflow-x-auto"]');
      if (scrollableDiv) {
        scrollContainerRef.current = scrollableDiv as HTMLDivElement;
      }
    }
  }, []);

  // Center the active tab on initial render
  useEffect(() => {
    // Use a small timeout to ensure the tabs are properly rendered
    const timer = setTimeout(() => {
      scrollTabToCenter(activeIndex);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const tabsContent = (
    <div
      className={cn('relative', showBottomBorder && 'pb-px', className)}
      role="tablist"
      aria-label={ariaLabel}
    >
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
        className={cn(
          'relative flex items-center',
          stretch ? 'w-full' : '',
          variant === 'default' ? 'space-x-[6px]' : 'space-x-[2px]',
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => setTabRef(el, index)}
            className={cn(
              'px-3 py-2 sm:mb-1.5 mb-2 cursor-pointer transition-colors duration-300',
              sizeClasses[size],
              variant === 'pills' && index === activeIndex
                ? 'bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-full'
                : '',
              item.disabled ? 'opacity-50 cursor-not-allowed' : '',
              stretch ? 'flex-1 text-center' : '',
              tabClassName,
              index === activeIndex
                ? cn('text-foreground dark:text-white', activeTabClassName)
                : cn(
                    'text-[#0e0f1199] dark:text-[#ffffff99]',
                    inactiveTabClassName,
                  ),
              item.disabled && disabledTabClassName,
              variantClasses[variant],
            )}
            onMouseEnter={() => !item.disabled && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleTabClick(index)}
            role="tab"
            aria-selected={index === activeIndex}
            aria-disabled={item.disabled}
            aria-controls={`tabpanel-${item.id}`}
            id={`tab-${item.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
          >
            <div className="whitespace-nowrap flex items-center justify-center h-full">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Active Indicator */}
      {showActiveIndicator && variant !== 'pills' && (
        <div
          className={cn(
            'absolute transition-all duration-300 ease-out z-10',
            activeIndicatorClasses[variant],
            activeIndicatorPosition === 'top' ? 'top-[-1px]' : 'bottom-[-1px]',
            activeIndicatorClassName,
          )}
          style={activeStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <div ref={handleScrollableRef}>
      <XScrollable showScrollbar={false}>{tabsContent}</XScrollable>
    </div>
  );
}

export interface TabPanelProps {
  /** ID of the tab this panel belongs to */
  tabId: string;
  /** Whether this panel is currently active */
  active: boolean;
  /** Content of the tab panel */
  children: ReactNode;
  /** Custom class name for the tab panel */
  className?: string;
}

export function TabPanel({
  tabId,
  active,
  children,
  className,
}: TabPanelProps) {
  if (!active) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className={className}
    >
      {children}
    </div>
  );
}

export interface TabsContentProps {
  /** Children should be TabPanel components */
  children: ReactNode;
  /** Custom class name for the tabs content container */
  className?: string;
}

export function TabsContent({ children, className }: TabsContentProps) {
  return <div className={className}>{children}</div>;
}
