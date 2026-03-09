import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Shield, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
    return "";
  };

  // Password validation
  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Validate on blur
  const handleBlur = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      return;
    }

    setAuthError(null);
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      const errorMessage = error.message || "Failed to sign in. Please check your credentials and try again.";
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="border-b border-warm-stone/10 bg-pure-white/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health logo"
              loading="eager"
              className="h-8 w-auto max-w-full"
            />
          </Link>
          <Link to="/" className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-warm-stone">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphic Card */}
          <Card variant="glass" className="p-8">
            <CardContent className="p-0">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10">
                  <Shield className="h-7 w-7 text-warm-stone" />
                </div>
                <h1 className="font-display text-2xl font-bold text-rich-black">Welcome Back</h1>
                <p className="mt-2 text-warm-gray">Sign in to your patient portal</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* General Auth Error Banner */}
                <AnimatePresence>
                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-lg border border-red-200 bg-red-50 p-3 flex items-start gap-2"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">{authError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5">
                  <Label htmlFor="email" required>Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/50 transition-colors group-focus-within:text-warm-stone" />
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) {
                          setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur("email")}
                      className="pl-11"
                      disabled={isLoading}
                      error={touched.email && !!errors.email}
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-1.5 text-sm text-red-600 mt-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" required>Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone focus-visible:ring-offset-2 rounded"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/50 transition-colors group-focus-within:text-warm-stone" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (touched.password) {
                          setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                        }
                      }}
                      onBlur={() => handleBlur("password")}
                      className="pl-11 pr-11"
                      disabled={isLoading}
                      error={touched.password && !!errors.password}
                      aria-invalid={touched.password && !!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-stone/50 transition-colors hover:text-warm-stone focus:outline-none focus-visible:text-warm-stone"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <AnimatePresence>
                    {touched.password && errors.password && (
                      <motion.p
                        id="password-error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-1.5 text-sm text-red-600 mt-1.5"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full mt-2"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-warm-gray">Don't have an account? </span>
                <Link to="/signup" className="font-medium text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-warm-stone" />
            <span>HIPAA Compliant • 256-bit Encryption</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
