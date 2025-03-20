'use client';

import type React from 'react';
import { memo, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { FC } from 'react';
import clsx from 'clsx';
import type { IconProps } from '@phosphor-icons/react';
import { Plus } from '@phosphor-icons/react';

// Define the route type
export interface RouteItem {
  href: string;
  label: string;
  icon?: React.ForwardRefExoticComponent<IconProps>;
}

interface BarItemProps {
  href: string;
  label: string;
  Icon?: React.ForwardRefExoticComponent<IconProps>;
  isActive: boolean;
  showLabels: boolean;
  onItemClick: () => void;
  animationKey: number;
}

const BarItem = memo(
  ({
    href,
    label,
    Icon,
    isActive,
    showLabels,
    onItemClick,
    animationKey,
  }: BarItemProps) => {
    return (
      <li className="flex-1">
        <Link
          href={href}
          className={clsx(
            'flex flex-col items-center justify-center w-full h-full px-1',
            showLabels ? 'py-2' : 'py-4',
          )}
          onClick={(e) => {
            if (isActive) {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }
            onItemClick();
          }}
        >
          <div
            key={animationKey}
            className={clsx(
              'flex flex-col items-center',
              isActive && 'icon-pulse',
            )}
          >
            {Icon && (
              <div className="icon-container">
                <Icon
                  weight={isActive ? 'fill' : 'regular'}
                  className={clsx(
                    'w-7 h-7',
                    isActive ? 'text-primary' : 'text-muted-foreground',
                  )}
                />
              </div>
            )}
            {showLabels && (
              <span
                className={clsx(
                  'text-[10px] leading-tight text-center mt-1.5',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            )}
          </div>
        </Link>
      </li>
    );
  },
);

BarItem.displayName = 'BarItem';

// Center Button Config
export interface CenterButtonConfig {
  onClick: () => void;
  label?: string;
  icon?: React.ForwardRefExoticComponent<IconProps>;
}

// Center Button Props
interface CenterButtonProps {
  onClick: () => void;
  label?: string;
  showLabels: boolean;
  animationKey: number;
  Icon?: React.ForwardRefExoticComponent<IconProps>;
}

// Center Button component
const CenterButton = memo(
  ({ onClick, label, showLabels, animationKey, Icon }: CenterButtonProps) => {
    // Use the provided Icon or default to Plus
    const ButtonIcon = Icon || Plus;

    return (
      <li className="flex-none -mt-5 z-10">
        <button
          onClick={onClick}
          className="flex flex-col items-center justify-center"
          aria-label={label || 'Action'}
        >
          <div
            key={animationKey}
            className={clsx('flex flex-col items-center', 'icon-pulse')}
          >
            <div className="icon-container p-3.5 rounded-full bg-primary shadow-lg hover:bg-primary-hover transition-colors">
              <ButtonIcon
                weight="bold"
                className="w-6 h-6 text-primary-foreground"
              />
            </div>
            {showLabels && label && (
              <span className="text-[10px] leading-tight text-center mt-1.5 text-primary">
                {label}
              </span>
            )}
          </div>
        </button>
      </li>
    );
  },
);

CenterButton.displayName = 'CenterButton';

interface BottomBarProps {
  routes: RouteItem[];
  showLabels?: boolean;
  centerButton?: CenterButtonConfig;
  className?: string;
}

const BottomBar: FC<BottomBarProps> = memo(function BottomBar({
  routes,
  showLabels = false,
  centerButton,
  className,
}) {
  const pathname = usePathname();
  const [animationKeys, setAnimationKeys] = useState<Record<string, number>>(
    {},
  );

  const handleItemClick = useCallback((href: string) => {
    setAnimationKeys((prev) => ({
      ...prev,
      [href]: (prev[href] || 0) + 1,
    }));
  }, []);

  const handleCenterButtonClick = useCallback(() => {
    setAnimationKeys((prev) => ({
      ...prev,
      centerButton: (prev.centerButton || 0) + 1,
    }));
    centerButton?.onClick();
  }, [centerButton]);

  // Split routes into two halves for layout with center button
  const halfLength = Math.ceil(routes.length / 2);
  const firstHalf = routes.slice(0, halfLength);
  const secondHalf = routes.slice(halfLength);

  return (
    <>
      {/* CSS for icon-pulse animation */}
      <style jsx global>{`
        .icon-pulse {
          animation: icon-pulse 0.3s ease-in-out;
        }

        @keyframes icon-pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      <nav
        className={clsx(
          'block md:hidden fixed py-1 bottom-0 left-0 border-t border-border right-0 z-50 bg-background backdrop-blur-lg bg-opacity-95',
          className,
        )}
      >
        <ul className="flex justify-around items-center relative">
          {centerButton ? (
            <>
              {/* First half of navigation items */}
              {firstHalf.map(({ href, label, icon: Icon }) => (
                <BarItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                  showLabels={showLabels}
                  onItemClick={() => handleItemClick(href)}
                  animationKey={animationKeys[href] || 0}
                />
              ))}

              {/* Center button */}
              <CenterButton
                onClick={handleCenterButtonClick}
                label={centerButton.label}
                Icon={centerButton.icon}
                showLabels={showLabels}
                animationKey={animationKeys.centerButton || 0}
              />

              {/* Second half of navigation items */}
              {secondHalf.map(({ href, label, icon: Icon }) => (
                <BarItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                  showLabels={showLabels}
                  onItemClick={() => handleItemClick(href)}
                  animationKey={animationKeys[href] || 0}
                />
              ))}
            </>
          ) : (
            // Original layout without center button
            routes.map(({ href, label, icon: Icon }) => (
              <BarItem
                key={href}
                href={href}
                label={label}
                Icon={Icon}
                isActive={pathname === href}
                showLabels={showLabels}
                onItemClick={() => handleItemClick(href)}
                animationKey={animationKeys[href] || 0}
              />
            ))
          )}
        </ul>
      </nav>
    </>
  );
});

BottomBar.displayName = 'BottomBar';

export default BottomBar;
