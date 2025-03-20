'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

interface ScrambleInProps {
  text: string;
  scrambleSpeed?: number;
  scrambledLetterCount?: number;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
  autoStart?: boolean;
  useIntersectionObserver?: boolean;
  retriggerOnIntersection?: boolean;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
  onStart?: () => void;
  onComplete?: () => void;
}

export interface ScrambleInHandle {
  start: () => void;
  reset: () => void;
}

const ScrambleIn = forwardRef<ScrambleInHandle, ScrambleInProps>(
  (
    {
      text,
      scrambleSpeed = 50,
      scrambledLetterCount = 2,
      characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      className = '',
      scrambledClassName = '',
      autoStart = true,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = '0px',
      onStart,
      onComplete,
    },
    ref,
  ) => {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleLetterCount, setVisibleLetterCount] = useState(0);
    const [scrambleOffset, setScrambleOffset] = useState(0);
    const containerRef = useRef<HTMLSpanElement>(null);
    const hasCompletedOnce = useRef(false);

    const startAnimation = useCallback(() => {
      setIsAnimating(true);
      setVisibleLetterCount(0);
      setScrambleOffset(0);
      onStart?.();
    }, [onStart]);

    const reset = useCallback(() => {
      setIsAnimating(false);
      setVisibleLetterCount(0);
      setScrambleOffset(0);
      setDisplayText('');
      hasCompletedOnce.current = false;
    }, []);

    useImperativeHandle(ref, () => ({
      start: startAnimation,
      reset,
    }));

    // Handle Intersection Observer
    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return;

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      };

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              startAnimation();
            }

            // If not set to retrigger, unobserve after first animation
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target);
            }
          }
        });
      };

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions,
      );
      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, [
      useIntersectionObserver,
      retriggerOnIntersection,
      intersectionThreshold,
      intersectionRootMargin,
      startAnimation,
    ]);

    // Standard autoStart if not using intersection observer
    useEffect(() => {
      if (autoStart && !useIntersectionObserver) {
        startAnimation();
      }
    }, [autoStart, useIntersectionObserver, startAnimation]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isAnimating) {
        interval = setInterval(() => {
          // Increase visible text length
          if (visibleLetterCount < text.length) {
            setVisibleLetterCount((prev) => prev + 1);
          }
          // Start sliding scrambled text out
          else if (scrambleOffset < scrambledLetterCount) {
            setScrambleOffset((prev) => prev + 1);
          }
          // Complete animation
          else {
            clearInterval(interval);
            setIsAnimating(false);
            hasCompletedOnce.current = true;
            onComplete?.();
          }

          // Calculate how many scrambled letters we can show
          const remainingSpace = Math.max(0, text.length - visibleLetterCount);
          const currentScrambleCount = Math.min(
            remainingSpace,
            scrambledLetterCount,
          );

          // Generate scrambled text
          const scrambledPart = Array(currentScrambleCount)
            .fill(0)
            .map(
              () => characters[Math.floor(Math.random() * characters.length)],
            )
            .join('');

          setDisplayText(text.slice(0, visibleLetterCount) + scrambledPart);
        }, scrambleSpeed);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [
      isAnimating,
      text,
      visibleLetterCount,
      scrambleOffset,
      scrambledLetterCount,
      characters,
      scrambleSpeed,
      onComplete,
    ]);

    const renderText = () => {
      const revealed = displayText.slice(0, visibleLetterCount);
      const scrambled = displayText.slice(visibleLetterCount);

      return (
        <>
          <span className={className}>{revealed}</span>
          <span className={scrambledClassName}>{scrambled}</span>
        </>
      );
    };

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className="inline-block whitespace-pre-wrap"
          aria-hidden="true"
        >
          {renderText()}
        </span>
      </>
    );
  },
);

ScrambleIn.displayName = 'ScrambleIn';
export default ScrambleIn;
