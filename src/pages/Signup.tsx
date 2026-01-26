import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Shield, Sparkles } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password, firstName, lastName);
    setIsLoading(false);

    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created! Welcome to Elevare Health.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="border-b border-warm-stone/10 bg-pure-white/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold text-rich-black">
              Elevare<span className="text-warm-stone">Health</span>
            </span>
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
          <div className="rounded-2xl border border-pure-white/40 bg-pure-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10">
                <Sparkles className="h-7 w-7 text-warm-stone" />
              </div>
              <h1 className="font-display text-2xl font-bold text-rich-black">Create Account</h1>
              <p className="mt-2 text-muted-foreground">Start your health journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-rich-black">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border-warm-stone/20 bg-pure-white/60 pl-10 backdrop-blur-sm focus:border-warm-stone focus:ring-warm-stone/20"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-rich-black">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-warm-stone/20 bg-pure-white/60 backdrop-blur-sm focus:border-warm-stone focus:ring-warm-stone/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-rich-black">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-warm-stone/20 bg-pure-white/60 pl-10 backdrop-blur-sm focus:border-warm-stone focus:ring-warm-stone/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-rich-black">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-warm-stone/20 bg-pure-white/60 pl-10 pr-10 backdrop-blur-sm focus:border-warm-stone focus:ring-warm-stone/20"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-stone/60 transition-colors hover:text-warm-stone"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-rich-black">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-stone/60" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-warm-stone/20 bg-pure-white/60 pl-10 backdrop-blur-sm focus:border-warm-stone focus:ring-warm-stone/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-warm-stone/10 bg-soft-linen/50 p-3">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  disabled={isLoading}
                  className="mt-0.5 border-warm-stone/30 data-[state=checked]:bg-warm-stone data-[state=checked]:border-warm-stone"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms-of-use" className="text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy-policy" className="text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-warm-stone text-pure-white shadow-lg transition-all hover:bg-warm-stone/90 hover:shadow-xl" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="font-medium text-warm-stone transition-colors hover:text-warm-stone/80 hover:underline">
                Sign in
              </Link>
            </div>
          </div>

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
