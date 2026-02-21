import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
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
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      // Return custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud p-4">
          <Card variant="glass" className="max-w-lg p-8 text-center">
            {/* Error icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>

            {/* Error message */}
            <h1 className="mb-3 font-display text-2xl font-bold text-rich-black">
              Something went wrong
            </h1>
            <p className="mb-6 text-warm-gray">
              We apologize for the inconvenience. An unexpected error occurred while loading this page.
            </p>

            {/* Action buttons */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleRetry}
                className="bg-warm-stone text-pure-white hover:bg-warm-stone/90"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={this.handleGoHome}
                className="border-warm-stone/30 hover:bg-warm-stone/10"
              >
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>

            {/* Error details (development only) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-4 border-t border-warm-stone/10 pt-4">
                <button
                  onClick={this.toggleDetails}
                  className="flex w-full items-center justify-center gap-2 text-sm text-warm-gray hover:text-warm-stone"
                >
                  {this.state.showDetails ? (
                    <>
                      Hide Details
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show Details
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>

                {this.state.showDetails && (
                  <div className="mt-4 max-h-60 overflow-auto rounded-lg bg-rich-black/5 p-4 text-left">
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
                className="text-warm-stone hover:underline"
              >
                contact support
              </a>
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
 */
interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

interface SectionErrorState {
  hasError: boolean;
  error: Error | null;
}

class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorState
> {
  public state: SectionErrorState = {
    hasError: false,
    error: null,
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
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center rounded-xl border border-warm-stone/20 bg-warm-stone/5 p-8">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-warm-stone/60" />
            <p className="mb-3 text-sm text-warm-gray">
              This section couldn't be loaded.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleRetry}
              className="border-warm-stone/30 hover:bg-warm-stone/10"
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary, SectionErrorBoundary };
