import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud p-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-bold text-rich-black">
              Something went wrong
            </h1>
            <p className="mt-3 text-muted-foreground">
              We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-destructive">
                  Error Details
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-destructive/80">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={this.handleRefresh}
                className="bg-warm-stone text-pure-white hover:bg-warm-stone/90"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={this.handleGoHome}
                className="border-warm-stone/30 hover:bg-warm-stone/10"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
