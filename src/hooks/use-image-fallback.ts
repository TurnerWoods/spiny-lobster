import { useState, useCallback, SyntheticEvent } from "react";

/**
 * Hook for handling image loading errors with fallback support
 * @param fallbackSrc - The fallback image source to use when the primary image fails to load
 * @returns Object containing hasError state and onError handler
 */
export function useImageFallback(fallbackSrc?: string) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  const onError = useCallback(
    (event: SyntheticEvent<HTMLImageElement, Event>) => {
      const img = event.currentTarget;

      // Only attempt fallback if we haven't already errored and have a fallback
      if (!hasError && fallbackSrc && img.src !== fallbackSrc) {
        setHasError(true);
        setCurrentSrc(fallbackSrc);
        img.src = fallbackSrc;
      } else {
        // If fallback also fails, hide the image
        setHasError(true);
        img.style.display = "none";
      }
    },
    [hasError, fallbackSrc]
  );

  const reset = useCallback(() => {
    setHasError(false);
    setCurrentSrc(null);
  }, []);

  return {
    hasError,
    currentSrc,
    onError,
    reset,
  };
}

/**
 * Default placeholder image as a data URI (simple gray background with image icon)
 */
export const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Cpath fill='%239ca3af' d='M180 100h40v100h-40z'/%3E%3Ccircle fill='%239ca3af' cx='200' cy='80' r='20'/%3E%3C/svg%3E";

export default useImageFallback;
