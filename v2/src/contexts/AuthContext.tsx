import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: AuthError | null;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    let isMounted = true;
    let initialized = false;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isMounted) return;

        // Handle specific auth events
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setError(null);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setError(null);
        } else if (event === 'USER_UPDATED') {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        } else if (event === 'INITIAL_SESSION') {
          // Handle initial session event from Supabase
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }

        // Set loading false after auth state changes (post-initialization)
        if (initialized) {
          setIsLoading(false);
        }
      }
    );

    // THEN get the initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (sessionError) {
          console.error('Error fetching initial session:', sessionError);
          setError(sessionError);
        } else {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Unexpected error during auth initialization:', err);
      } finally {
        if (isMounted) {
          initialized = true;
          setIsInitialized(true);
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName || '',
            last_name: lastName || '',
          },
        },
      });

      if (signUpError) {
        setError(signUpError);
        return { error: signUpError };
      }

      // Profile update is handled by database trigger on user creation
      // The user metadata (first_name, last_name) is passed in options.data above
      // This ensures profile is created even if email confirmation is required

      return { error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Unexpected signup error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError);
        return { error: signInError };
      }

      return { error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Unexpected signin error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        setError(signOutError);
        return { error: signOutError };
      }

      // Clear local state immediately
      setUser(null);
      setSession(null);

      return { error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Unexpected signout error:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    session,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};