import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp, RotateCcw, Copy, Check } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Custom error message to display instead of default */
  errorMessage?: string;
  /** Whether to show the "Go Home" button */
  showHomeButton?: boolean;
  /** Whether to show error details in production (default: false) */
  showDetailsInProduction?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
  errorId: string;
  copiedErrorId: boolean;
}

/**
 * Generate a unique error ID for support reference
 */
function generateErrorId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `ERR-${timestamp}-${randomPart}`.toUpperCase();
}

/**
 * ErrorBoundary - Catches JavaScript errors anywhere in the child component tree
 *
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 *
 * With custom fallback:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
    errorId: "",
    copiedErrorId: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error, errorId: generateErrorId() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Log error with ID for tracking
    console.error(`[${this.state.errorId}] Error:`, error.message);

    // Call optional error handler (useful for error tracking services like Sentry)
    this.props.onError?.(error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: "",
      copiedErrorId: false,
    });
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  private copyErrorId = async () => {
    try {
      await navigator.clipboard.writeText(this.state.errorId);
      this.setState({ copiedErrorId: true });
      setTimeout(() => this.setState({ copiedErrorId: false }), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      console.log("Error ID:", this.state.errorId);
    }
  };

  public render() {
    const { showHomeButton = true, showDetailsInProduction = false, errorMessage } = this.props;
    const showDetails = process.env.NODE_ENV === "development" || showDetailsInProduction;

    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with animation
      return (
        <div
          className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud p-4 animate-in fade-in duration-300"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <Card variant="glass" className="max-w-lg p-8 text-center animate-in zoom-in-95 duration-300">
            {/* Error icon with pulse animation */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 animate-in zoom-in duration-500">
              <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" />
            </div>

            {/* Error message */}
            <h1 className="mb-3 font-display text-2xl font-bold text-rich-black">
              Something went wrong
            </h1>
            <p className="mb-6 text-warm-gray">
              {errorMessage || "We apologize for the inconvenience. An unexpected error occurred while loading this page."}
            </p>

            {/* Error ID for support reference */}
            {this.state.errorId && (
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="text-xs text-warm-gray">
                  Error ID: <code className="rounded bg-warm-stone/10 px-2 py-1 font-mono text-warm-stone">{this.state.errorId}</code>
                </span>
                <button
                  onClick={this.copyErrorId}
                  className="rounded p-1 text-warm-gray hover:bg-warm-stone/10 hover:text-warm-stone transition-colors"
                  aria-label="Copy error ID"
                  title="Copy error ID"
                >
                  {this.state.copiedErrorId ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}

            {/* Action buttons */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleRetry}
                className="bg-warm-stone text-pure-white hover:bg-warm-stone/90"
                aria-label="Try loading the page again"
              >
                <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={this.handleReload}
                className="border-warm-stone/30 hover:bg-warm-stone/10"
                aria-label="Refresh the entire page"
              >
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                Refresh Page
              </Button>
              {showHomeButton && (
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="border-warm-stone/30 hover:bg-warm-stone/10"
                  aria-label="Go to the home page"
                >
                  <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                  Go Home
                </Button>
              )}
            </div>

            {/* Error details (development or when explicitly enabled) */}
            {showDetails && this.state.error && (
              <div className="mt-4 border-t border-warm-stone/10 pt-4">
                <button
                  onClick={this.toggleDetails}
                  className="flex w-full items-center justify-center gap-2 text-sm text-warm-gray hover:text-warm-stone transition-colors"
                  aria-expanded={this.state.showDetails}
                  aria-controls="error-details"
                >
                  {this.state.showDetails ? (
                    <>
                      Hide Details
                      <ChevronUp className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Show Details
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>

                {this.state.showDetails && (
                  <div
                    id="error-details"
                    className="mt-4 max-h-60 overflow-auto rounded-lg bg-rich-black/5 p-4 text-left animate-in slide-in-from-top-2 duration-200"
                  >
                    <p className="mb-2 font-mono text-sm font-semibold text-destructive">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="whitespace-pre-wrap font-mono text-xs text-warm-gray">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Contact support */}
            <p className="mt-6 text-xs text-warm-gray">
              If this problem persists, please{" "}
              <a
                href="/contact"
                className="text-warm-stone underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-warm-stone focus:ring-offset-2 rounded"
              >
                contact support
              </a>
              {this.state.errorId && (
                <span> and reference error ID <strong>{this.state.errorId}</strong></span>
              )}
            </p>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * SectionErrorBoundary - Smaller error boundary for page sections
 * Shows inline error without disrupting the entire page
 *
 * Usage:
 * <SectionErrorBoundary sectionName="User Profile">
 *   <ProfileSection />
 * </SectionErrorBoundary>
 */
interface SectionErrorBoundaryProps {
  children: ReactNode;
  /** Name of the section for logging purposes */
  sectionName?: string;
  /** Optional callback when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Custom error message to display */
  errorMessage?: string;
  /** Custom fallback component */
  fallback?: ReactNode;
}

interface SectionErrorState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorState
> {
  public state: SectionErrorState = {
    hasError: false,
    error: null,
    retryCount: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<SectionErrorState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `Error in section "${this.props.sectionName || "Unknown"}":`,
        error,
        errorInfo
      );
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  public render() {
    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const maxRetries = 3;
      const canRetry = this.state.retryCount < maxRetries;

      return (
        <div
          className="flex items-center justify-center rounded-xl border border-warm-stone/20 bg-warm-stone/5 p-8 animate-in fade-in duration-200"
          role="alert"
          aria-live="polite"
        >
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-warm-stone/60" aria-hidden="true" />
            <p className="mb-1 text-sm font-medium text-warm-gray">
              {this.props.errorMessage || "This section couldn't be loaded."}
            </p>
            {this.props.sectionName && (
              <p className="mb-3 text-xs text-warm-gray/70">
                Section: {this.props.sectionName}
              </p>
            )}
            {canRetry ? (
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleRetry}
                className="border-warm-stone/30 hover:bg-warm-stone/10"
                aria-label={`Retry loading ${this.props.sectionName || "this section"}`}
              >
                <RotateCcw className="mr-2 h-3 w-3" aria-hidden="true" />
                Retry {this.state.retryCount > 0 && `(${this.state.retryCount}/${maxRetries})`}
              </Button>
            ) : (
              <p className="text-xs text-warm-gray/70">
                Please refresh the page to try again.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary, SectionErrorBoundary };
