import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, ArrowRight, Shield, Sparkles, Check, AlertCircle, Save } from "lucide-react";

// Progress indicator for multi-step signup
const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
      <span className="font-medium text-warm-stone">Step {currentStep} of {totalSteps}</span>
      <span>{currentStep === 1 ? "Your Info" : "Secure Password"}</span>
    </div>
    <div className="h-2 bg-warm-stone/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-warm-stone rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  </div>
);

// Inline validation message component
const ValidationMessage = ({ message, type }: { message: string; type: "error" | "success" | "hint" }) => (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    className={`mt-1.5 text-xs flex items-center gap-1 ${
      type === "error" ? "text-[#A67563]" : type === "success" ? "text-accent-gold" : "text-muted-foreground"
    }`}
  >
    {type === "error" && <AlertCircle className="h-3 w-3" />}
    {type === "success" && <Check className="h-3 w-3" />}
    {message}
  </motion.p>
);

// Password strength indicator
const PasswordStrength = ({ password }: { password: string }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ["Weak", "Fair", "Good", "Strong", "Excellent"];
  // Password strength indicator using warm palette
  const colors = ["bg-[#A67563]", "bg-[#B8956A]", "bg-warm-stone", "bg-accent-gold/80", "bg-accent-gold"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= strength ? colors[strength - 1] : "bg-warm-stone/20"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium">{labels[strength - 1] || "Too short"}</span>
      </p>
    </div>
  );
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  // Validation states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem("signup_progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.firstName) setFirstName(data.firstName);
        if (data.email) setEmail(data.email);
        toast.info("Welcome back! Your progress has been restored.", { icon: <Save className="h-4 w-4" /> });
      } catch (e) {
        console.error("Error loading saved progress:", e);
      }
    }
  }, []);

  // Save progress to localStorage (debounced)
  const saveProgress = useCallback(() => {
    if (firstName || email) {
      localStorage.setItem("signup_progress", JSON.stringify({ firstName, email }));
    }
  }, [firstName, email]);

  useEffect(() => {
    const timer = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timer);
  }, [saveProgress]);

  // Inline validation
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First name is required";
        } else {
          delete newErrors.firstName;
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "email" ? email : field === "password" ? password : firstName;
    validateField(field, value);
  };

  const canProceedToStep2 = () => {
    return firstName.trim() && email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleNextStep = () => {
    setTouched({ firstName: true, email: true });
    validateField("firstName", firstName);
    validateField("email", email);

    if (canProceedToStep2()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    // Step 2 validation
    setTouched((prev) => ({ ...prev, password: true }));
    if (!validateField("password", password)) return;

    if (!agreeTerms) {
      toast.error("Please agree to the terms to continue");
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password, firstName, "");
    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      // Clear saved progress on success
      localStorage.removeItem("signup_progress");
      toast.success("Account created! Welcome to Elevare Health.");
      navigate("/intake");
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
              alt="Elevar Health - Premium Men's Health & Wellness"
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

      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphic Card */}
          <Card variant="glass" className="p-6 sm:p-8">
            <CardContent className="p-0">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={step} totalSteps={2} />

              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10">
                  <Sparkles className="h-7 w-7 text-warm-stone" />
                </div>
                <h1 className="font-display text-2xl font-bold text-rich-black">
                  {step === 1 ? "Create Account" : "Set Your Password"}
                </h1>
                <p className="mt-2 text-warm-gray">
                  {step === 1 ? "Start your health journey today" : "Choose a secure password"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {/* First Name - Required */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-rich-black">
                          First Name <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                          <Input
                            id="firstName"
                            placeholder="Your first name"
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                              if (touched.firstName) validateField("firstName", e.target.value);
                            }}
                            onBlur={() => handleBlur("firstName")}
                            className="pl-10"
                            disabled={isLoading}
                            error={touched.firstName && !!errors.firstName}
                            success={touched.firstName && !errors.firstName && !!firstName}
                            autoComplete="given-name"
                          />
                        </div>
                        <AnimatePresence>
                          {touched.firstName && errors.firstName && (
                            <ValidationMessage message={errors.firstName} type="error" />
                          )}
                          {touched.firstName && !errors.firstName && firstName && (
                            <ValidationMessage message="Looks good!" type="success" />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email - Required */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-rich-black">
                          Email <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                          <Input
                            id="email"
                            type="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (touched.email) validateField("email", e.target.value);
                            }}
                            onBlur={() => handleBlur("email")}
                            className="pl-10"
                            disabled={isLoading}
                            error={touched.email && !!errors.email}
                            success={touched.email && !errors.email && !!email}
                            autoComplete="email"
                          />
                        </div>
                        <AnimatePresence>
                          {touched.email && errors.email && (
                            <ValidationMessage message={errors.email} type="error" />
                          )}
                          {touched.email && !errors.email && email && (
                            <ValidationMessage message="Valid email address" type="success" />
                          )}
                        </AnimatePresence>
                      </div>

                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className="w-full mt-6"
                        disabled={isLoading || !canProceedToStep2()}
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      {/* Email display */}
                      <div className="rounded-lg border border-warm-stone/20 bg-soft-linen/50 p-3 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-warm-stone" />
                        <span className="text-sm text-rich-black">{email}</span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="ml-auto text-xs text-warm-stone hover:underline"
                        >
                          Change
                        </button>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-rich-black">
                          Password <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (touched.password) validateField("password", e.target.value);
                            }}
                            onBlur={() => handleBlur("password")}
                            className="pl-10 pr-10"
                            disabled={isLoading}
                            error={touched.password && !!errors.password}
                            autoComplete="new-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-stone/60 transition-colors hover:text-warm-stone"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <PasswordStrength password={password} />
                        <AnimatePresence>
                          {touched.password && errors.password && (
                            <ValidationMessage message={errors.password} type="error" />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Terms Agreement */}
                      <div className="flex items-start gap-3 rounded-lg border border-warm-stone/10 bg-soft-linen/50 p-3">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                          disabled={isLoading}
                        />
                        <label htmlFor="terms" className="text-sm text-warm-gray cursor-pointer">
                          I agree to the{" "}
                          <Link to="/terms" className="text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">Terms of Service</Link>
                          {" "}and{" "}
                          <Link to="/privacy" className="text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">Privacy Policy</Link>
                        </label>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                          disabled={isLoading}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          variant="secondary"
                          size="lg"
                          className="flex-1"
                          disabled={isLoading || !agreeTerms || !password || password.length < 6}
                          isLoading={isLoading}
                          loadingText="Creating..."
                        >
                          Create Account
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-warm-gray">Already have an account? </span>
                <Link to="/login" className="font-medium text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">
                  Sign in
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

export default Signup;
