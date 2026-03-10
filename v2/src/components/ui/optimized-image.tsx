import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "auto" | string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoadComplete?: () => void;
  onLoadError?: () => void;
}

const aspectRatioClasses: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
};

/**
 * OptimizedImage - Image component with lazy loading, skeleton loading state, and error fallback
 *
 * Features:
 * - Native lazy loading
 * - Skeleton placeholder while loading
 * - Smooth fade-in transition on load
 * - Error fallback support
 * - Aspect ratio presets
 */
const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      aspectRatio = "auto",
      showSkeleton = true,
      skeletonClassName,
      objectFit = "cover",
      onLoadComplete,
      onLoadError,
      className,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    useEffect(() => {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    }, [src]);

    const handleLoad = () => {
      setIsLoading(false);
      onLoadComplete?.();
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);

      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setIsLoading(true);
        setHasError(false);
      } else {
        onLoadError?.();
      }
    };

    const aspectClass = aspectRatioClasses[aspectRatio] || aspectRatio;

    return (
      <div className={cn("relative overflow-hidden", aspectClass, className)}>
        {/* Skeleton placeholder */}
        {showSkeleton && isLoading && (
          <Skeleton
            className={cn(
              "absolute inset-0 h-full w-full",
              skeletonClassName
            )}
          />
        )}

        {/* Actual image */}
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "h-full w-full max-w-full transition-opacity duration-500 ease-out",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down",
            isLoading ? "opacity-0" : "opacity-100",
            hasError && !fallbackSrc && "hidden"
          )}
          {...props}
        />

        {/* Error state */}
        {hasError && !fallbackSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">
              Failed to load image
            </span>
          </div>
        )}
      </div>
    );
  }
);
OptimizedImage.displayName = "OptimizedImage";

/**
 * BackgroundImage - Optimized background image with lazy loading
 */
interface BackgroundImageProps {
  src: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  showOverlay?: boolean;
}

const BackgroundImage = ({
  src,
  alt = "",
  children,
  className,
  overlayClassName,
  showOverlay = true,
}: BackgroundImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />

      {/* Skeleton while loading */}
      {!isLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}

      {/* Optional overlay */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-transparent to-black/50",
            overlayClassName
          )}
        />
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

export { OptimizedImage, BackgroundImage };
