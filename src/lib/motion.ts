/**
 * Premium Motion System for Elevare Health
 *
 * Design Philosophy:
 * - Sophisticated, measured movements (no bouncy/playful animations)
 * - Subtle elegance over flashy effects
 * - Consistent timing across the application
 * - Performance-optimized with GPU acceleration
 * - Respects user motion preferences
 */

import { Variants, Transition } from "framer-motion";

// =============================================================================
// TIMING & EASING CURVES
// Premium easing curves inspired by luxury brands
// =============================================================================

export const easing = {
  // Primary ease - smooth and refined (cubic-bezier)
  smooth: [0.25, 0.1, 0.25, 1.0] as const,

  // Subtle deceleration - elements coming to rest
  decelerate: [0.0, 0.0, 0.2, 1.0] as const,

  // Gentle acceleration - elements starting motion
  accelerate: [0.4, 0.0, 1.0, 1.0] as const,

  // Premium entrance - elegant reveal
  entrance: [0.16, 1.0, 0.3, 1.0] as const,

  // Exit with grace
  exit: [0.4, 0.0, 0.2, 1.0] as const,

  // Apple-inspired spring (not bouncy)
  spring: { type: "spring", stiffness: 300, damping: 30 } as const,

  // Gentle spring for larger movements
  gentleSpring: { type: "spring", stiffness: 200, damping: 25 } as const,
};

// Consistent duration scales (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.7,
  slowest: 1.0,
  // Page-level transitions
  page: 0.5,
};

// =============================================================================
// BASE TRANSITIONS
// Reusable transition configurations
// =============================================================================

export const transitions = {
  // Default smooth transition
  default: {
    duration: duration.normal,
    ease: easing.smooth,
  } as Transition,

  // Fast micro-interactions
  micro: {
    duration: duration.fast,
    ease: easing.smooth,
  } as Transition,

  // Entrance animations
  enter: {
    duration: duration.slow,
    ease: easing.entrance,
  } as Transition,

  // Exit animations
  leave: {
    duration: duration.fast,
    ease: easing.exit,
  } as Transition,

  // Spring-based (controlled, not bouncy)
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  } as Transition,

  // Gentle spring for larger elements
  gentleSpring: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  } as Transition,

  // Page transitions
  page: {
    duration: duration.page,
    ease: easing.smooth,
  } as Transition,
};

// =============================================================================
// VARIANT PRESETS
// Common animation patterns as Framer Motion variants
// =============================================================================

/**
 * Fade in from below - elegant entrance
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
};

/**
 * Subtle fade in - minimal movement
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

/**
 * Scale in with fade - for modals, cards
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.entrance,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: duration.fast,
      ease: easing.exit,
    },
  },
};

/**
 * Slide in from right - for sheets, sidebars
 */
export const slideInRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: duration.normal,
      ease: easing.exit,
    },
  },
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: duration.normal,
      ease: easing.exit,
    },
  },
};

/**
 * Slide in from bottom - for mobile sheets
 */
export const slideInBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: duration.normal,
      ease: easing.exit,
    },
  },
};

// =============================================================================
// STAGGER CONFIGURATIONS
// For animating lists and groups of elements
// =============================================================================

/**
 * Container variant for staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fast stagger for smaller items
 */
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Slow stagger for larger sections
 */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/**
 * Stagger item - use with stagger containers
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.entrance,
    },
  },
};

// =============================================================================
// HOVER & INTERACTION STATES
// Micro-interactions for buttons, cards, links
// =============================================================================

/**
 * Subtle lift on hover - for cards
 */
export const hoverLift = {
  y: -4,
  transition: {
    duration: duration.fast,
    ease: easing.smooth,
  },
};

/**
 * Subtle scale on hover - for buttons
 */
export const hoverScale = {
  scale: 1.02,
  transition: {
    duration: duration.fast,
    ease: easing.smooth,
  },
};

/**
 * Tap/press feedback
 */
export const tapScale = {
  scale: 0.98,
  transition: {
    duration: duration.instant,
    ease: easing.smooth,
  },
};

/**
 * Card hover variant - subtle lift with shadow enhancement
 */
export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
  hover: {
    y: -6,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

/**
 * Button hover - subtle glow effect
 */
export const buttonHover: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: duration.instant,
      ease: easing.smooth,
    },
  },
};

// =============================================================================
// SCROLL ANIMATIONS
// Viewport-triggered reveal animations
// =============================================================================

/**
 * Standard viewport settings for whileInView
 */
export const viewportSettings = {
  once: true,
  margin: "-80px",
  amount: 0.2,
};

/**
 * Scroll reveal - fade in from below
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slower,
      ease: easing.entrance,
    },
  },
};

/**
 * Scroll reveal with scale
 */
export const scrollRevealScale: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slower,
      ease: easing.entrance,
    },
  },
};

// =============================================================================
// PAGE TRANSITIONS
// For route-level transitions
// =============================================================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.entrance,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: duration.fast,
      ease: easing.exit,
    },
  },
};

// =============================================================================
// LOADING STATES
// Skeleton and loading animations
// =============================================================================

/**
 * Pulse animation for loading states
 */
export const loadingPulse: Variants = {
  initial: {
    opacity: 0.4,
  },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Shimmer effect for skeletons
 */
export const shimmer = {
  backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
  backgroundSize: "200% 100%",
  animation: "shimmer 2s infinite",
};

// =============================================================================
// ACCORDION / COLLAPSE
// For expandable content
// =============================================================================

export const accordionContent: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: duration.normal,
        ease: easing.smooth,
      },
      opacity: {
        duration: duration.fast,
        ease: easing.smooth,
      },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: duration.normal,
        ease: easing.smooth,
      },
      opacity: {
        duration: duration.normal,
        delay: 0.1,
        ease: easing.smooth,
      },
    },
  },
};

// =============================================================================
// TEXT ANIMATIONS
// For headlines and text reveals
// =============================================================================

/**
 * Text reveal - character by character
 */
export const textRevealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const textRevealChar: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.entrance,
    },
  },
};

/**
 * Word fade in - for subtitles
 */
export const wordFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const wordFadeInItem: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
};

// =============================================================================
// COUNTER ANIMATION
// For animating numbers
// =============================================================================

/**
 * Counter animation configuration
 * Use with useSpring or useMotionValue
 */
export const counterConfig = {
  duration: 2000, // 2 seconds
  ease: (t: number) => {
    // Ease out quart for smooth counting
    return 1 - Math.pow(1 - t, 4);
  },
};

// =============================================================================
// TOAST / NOTIFICATION
// For notification animations
// =============================================================================

export const toast: Variants = {
  initial: {
    opacity: 0,
    y: -8,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.entrance,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    transition: {
      duration: duration.fast,
      ease: easing.exit,
    },
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// Helpers for creating custom animations
// =============================================================================

/**
 * Create a stagger delay based on index
 */
export const createStaggerDelay = (index: number, baseDelay: number = 0.05) => ({
  delay: index * baseDelay,
});

/**
 * Create viewport-triggered animation props
 */
export const createScrollAnimation = (delay: number = 0) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportSettings,
  transition: { ...transitions.enter, delay },
});

/**
 * Reduce motion for accessibility
 * Returns simplified animations when user prefers reduced motion
 */
export const reducedMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
