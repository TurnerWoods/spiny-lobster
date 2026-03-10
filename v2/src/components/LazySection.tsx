import { ReactNode, forwardRef, HTMLAttributes } from "react";
import { useLazySection, usePrefersReducedMotion } from "@/hooks/useLazySection";
import { cn } from "@/lib/utils";

interface LazySectionProps extends HTMLAttributes<HTMLElement> {
  /** Content to render when visible */
  children: ReactNode;
  /** Placeholder to show while loading (optional) */
  placeholder?: ReactNode;
  /** Minimum height for the section before loading */
  minHeight?: string | number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to show a skeleton loader */
  showSkeleton?: boolean;
  /** Custom skeleton class */
  skeletonClassName?: string;
  /** HTML tag to use */
  as?: "section" | "div" | "article" | "aside";
  /** Delay before showing content (ms) */
  delay?: number;
}

/**
 * LazySection - Performance-optimized section wrapper
 * Uses IntersectionObserver to lazy load below-fold content
 * Respects user's reduced motion preferences
 */
const LazySection = forwardRef<HTMLElement, LazySectionProps>(
  (
    {
      children,
      placeholder,
      minHeight = "200px",
      rootMargin = "200px 0px",
      showSkeleton = true,
      skeletonClassName,
      as: Component = "section",
      delay = 0,
      className,
      style,
      ...props
    },
    _ref
  ) => {
    const { ref, isVisible, hasBeenVisible } = useLazySection({
      rootMargin,
      delay,
    });
    const prefersReducedMotion = usePrefersReducedMotion();

    // Show content immediately if reduced motion is preferred
    const shouldShowContent = isVisible || hasBeenVisible || prefersReducedMotion;

    const minHeightStyle =
      typeof minHeight === "number" ? `${minHeight}px` : minHeight;

    return (
      <Component
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          "lazy-section",
          shouldShowContent && "data-[loaded=true]",
          className
        )}
        style={{
          ...style,
          minHeight: !shouldShowContent ? minHeightStyle : undefined,
        }}
        data-loaded={shouldShowContent}
        {...props}
      >
        {shouldShowContent ? (
          children
        ) : placeholder ? (
          placeholder
        ) : showSkeleton ? (
          <div
            className={cn(
              "skeleton-pulse rounded-lg",
              skeletonClassName
            )}
            style={{ minHeight: minHeightStyle }}
            aria-hidden="true"
          />
        ) : null}
      </Component>
    );
  }
);

LazySection.displayName = "LazySection";

export default LazySection;

/**
 * Skeleton placeholder for lazy-loaded images
 */
export const ImageSkeleton = ({
  aspectRatio = "16/9",
  className,
}: {
  aspectRatio?: string;
  className?: string;
}) => (
  <div
    className={cn("skeleton-pulse rounded-lg bg-muted", className)}
    style={{ aspectRatio }}
    aria-hidden="true"
  />
);

/**
 * Skeleton placeholder for text content
 */
export const TextSkeleton = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={cn("space-y-3", className)} aria-hidden="true">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="skeleton-pulse h-4 rounded bg-muted"
        style={{
          width: i === lines - 1 ? "60%" : "100%",
        }}
      />
    ))}
  </div>
);

/**
 * Skeleton placeholder for cards
 */
export const CardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "rounded-xl border border-neutral-gray/20 bg-card p-6",
      className
    )}
    aria-hidden="true"
  >
    <div className="skeleton-pulse mb-4 h-32 rounded-lg bg-muted" />
    <div className="skeleton-pulse mb-2 h-6 w-3/4 rounded bg-muted" />
    <div className="skeleton-pulse h-4 w-1/2 rounded bg-muted" />
  </div>
);
