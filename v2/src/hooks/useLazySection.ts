import { useEffect, useRef, useState, useCallback } from "react";

interface UseLazySectionOptions {
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for triggering visibility */
  threshold?: number;
  /** Whether to only trigger once */
  once?: boolean;
  /** Delay before marking as visible (ms) */
  delay?: number;
}

/**
 * Hook for lazy loading sections based on viewport visibility
 * Optimized for mobile performance with IntersectionObserver
 */
export function useLazySection(options: UseLazySectionOptions = {}) {
  const {
    rootMargin = "200px 0px",
    threshold = 0.01,
    once = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => {
            setIsVisible(true);
            setHasBeenVisible(true);
          }, delay);
        } else {
          setIsVisible(true);
          setHasBeenVisible(true);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [delay, once]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already visible and only triggering once
    if (once && hasBeenVisible) return;

    // Check if IntersectionObserver is available
    if (!("IntersectionObserver" in window)) {
      // Fallback: immediately show content
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, once, hasBeenVisible, handleIntersection]);

  return {
    ref,
    isVisible,
    hasBeenVisible,
  };
}

/**
 * Hook for checking if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy support
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for detecting mobile device
 */
export function useIsMobileDevice(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Use passive listener for better scroll performance
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

export default useLazySection;
