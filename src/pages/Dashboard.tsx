import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  QuickActionsGridSkeleton,
  DashboardTreatmentListSkeleton,
} from "@/components/ui/treatment-card-skeleton";
import {
  Pill,
  MessageCircle,
  LogOut,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  ChevronRight,
  Home,
  Sparkles,
  Activity
} from "lucide-react";
import PatientMessaging from "@/components/dashboard/PatientMessaging";

interface Profile {
  first_name: string | null;
  last_name: string | null;
}

interface Treatment {
  id: string;
  treatment_type: string;
  medication: string | null;
  status: string;
  dosage: string | null;
  start_date: string | null;
  next_refill_date: string | null;
  created_at: string;
}

// Map treatment types to product images
const treatmentImages: Record<string, string> = {
  "Weight Loss": "/images/products/semaglutide-vial.png",
  "Testosterone": "/images/products/testosterone-vial.png",
  "TRT": "/images/products/testosterone-vial.png",
  "Hormones": "/images/products/testosterone-vial.png",
  "Peptides": "/images/products/wolverine-stack.png",
  "Strength": "/images/products/wolverine-stack.png",
  "Anti-Aging": "/images/products/longevity-stack.png",
  "Hair": "/images/products/hair-restoration-kit.png",
  "Hair Restoration": "/images/products/hair-restoration-kit.png",
  "Mood": "/images/products/semax-selank-vials.png",
  "Mood & Cognitive": "/images/products/semax-selank-vials.png",
  "Sexual Health": "/images/products/pt141-vial.png",
  "NAD+": "/images/products/nad-vial.png",
  "GLP-1": "/images/products/semaglutide-vial.png",
  "Semaglutide": "/images/products/semaglutide-vial.png",
  "Tirzepatide": "/images/products/tirzepatide-prep.png",
};

const getTreatmentImage = (type: string): string | null => {
  // Direct match
  if (treatmentImages[type]) return treatmentImages[type];
  // Partial match
  const key = Object.keys(treatmentImages).find(k => type.toLowerCase().includes(k.toLowerCase()));
  return key ? treatmentImages[key] : null;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending Review", color: "bg-warm-stone/20 text-warm-stone border border-warm-stone/30", icon: Clock },
  under_review: { label: "Under Review", color: "bg-warm-stone/30 text-warm-stone border border-warm-stone/40", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-success/10 text-success border border-success/30", icon: CheckCircle2 },
  active: { label: "Active", color: "bg-warm-stone/10 text-warm-stone border border-warm-stone/20", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground border border-border", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive border border-destructive/30", icon: AlertCircle },
};

const Dashboard = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchData();
    }
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    if (!user) return;
    setError(null);

    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      if (profileData) setProfile(profileData);

      // Fetch treatments
      const { data: treatmentsData, error: treatmentsError } = await supabase
        .from("treatments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (treatmentsError) throw treatmentsError;
      if (treatmentsData) setTreatments(treatmentsData as Treatment[]);

      // Fetch unread message count
      const { count, error: messagesError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false)
        .neq("sender_role", "patient");

      if (messagesError) throw messagesError;
      setUnreadCount(count || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to load your data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Show skeleton loading state - Mobile optimized
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
        {/* Header skeleton */}
        <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
          <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 sm:h-8 w-24 sm:w-32 rounded" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Skeleton className="h-11 w-11 sm:h-9 sm:w-20 rounded" />
              <Skeleton className="h-11 w-11 sm:h-9 sm:w-24 rounded" />
            </div>
          </div>
        </header>

        <main className="container px-4 py-6 sm:py-8 md:py-12">
          {/* Welcome section skeleton */}
          <div className="mb-6 sm:mb-8">
            <Skeleton className="mb-3 sm:mb-4 h-8 sm:h-10 w-36 sm:w-48 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-56 sm:w-72" />
            <Skeleton className="mt-2 h-4 sm:h-5 w-48 sm:w-64" />
          </div>

          {/* Quick actions skeleton */}
          <div className="mb-8 sm:mb-10">
            <QuickActionsGridSkeleton count={2} />
          </div>

          {/* Treatments section skeleton */}
          <div>
            <div className="mb-4 sm:mb-5 flex items-center justify-between">
              <Skeleton className="h-6 sm:h-7 w-32 sm:w-40" />
              <Skeleton className="h-11 w-24 sm:h-9 sm:w-32" />
            </div>
            <DashboardTreatmentListSkeleton count={3} />
          </div>
        </main>
      </div>
    );
  }

  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      {/* Header - Mobile optimized with 44px minimum touch targets */}
      <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80 min-h-[44px] min-w-[44px]">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health logo"
              loading="eager"
              className="h-7 sm:h-8 w-auto max-w-full"
            />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2" role="navigation" aria-label="Main navigation">
            <Link to="/">
              <Button variant="ghost" size="sm" className="min-h-[44px] min-w-[44px] px-3 text-warm-gray hover:text-rich-black hover:bg-warm-stone/10">
                <Home className="h-5 w-5 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline text-sm">Home</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="min-h-[44px] min-w-[44px] px-3 text-warm-gray hover:text-rich-black hover:bg-warm-stone/10">
              <LogOut className="h-5 w-5 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-6 sm:py-8 md:py-12">
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card variant="glass" className="p-4 border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive flex-1">{error}</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={fetchData}
                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  Retry
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Welcome Section - Mobile optimized typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm backdrop-blur-sm">
            <Activity className="h-4 w-4 text-warm-stone" />
            <span className="text-xs sm:text-sm font-medium text-warm-stone">Patient Dashboard</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-rich-black leading-tight">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-warm-gray leading-relaxed">
            Track your treatments and manage your health journey
          </p>
        </motion.div>

        {/* Quick Actions - Mobile optimized with stacked cards and 44px touch targets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 sm:mb-10 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2"
        >
          <Link to="/intake" className="group block min-h-[72px]">
            <Card variant="glass" className="flex h-full items-center gap-3 sm:gap-4 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30 active:scale-[0.98]">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/20">
                <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-warm-stone" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rich-black text-sm sm:text-base">Start Treatment</p>
                <p className="text-xs sm:text-sm text-warm-gray">Complete intake</p>
              </div>
            </Card>
          </Link>
          <button
            onClick={() => {
              setIsMessagingOpen(true);
              setUnreadCount(0);
            }}
            className="text-left group w-full min-h-[72px]"
          >
            <Card variant="glass" className="flex h-full items-center gap-3 sm:gap-4 p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30 active:scale-[0.98]">
              <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/20">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-warm-stone" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-pure-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-rich-black text-sm sm:text-base">Messages</p>
                <p className="text-xs sm:text-sm text-warm-gray truncate">
                  {unreadCount > 0 ? `${unreadCount} unread` : "Chat with care team"}
                </p>
              </div>
            </Card>
          </button>
{/* Appointments and Profile cards hidden until features are ready */}
        </motion.div>

        {/* Treatments Section - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 sm:mb-5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-warm-stone flex-shrink-0" />
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-rich-black truncate">My Treatments</h2>
            </div>
            <Link to="/#treatments" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="min-h-[44px] px-3 sm:px-4 border-warm-stone/30 text-warm-stone hover:bg-warm-stone/10 hover:border-warm-stone/50 text-xs sm:text-sm">
                <Plus className="mr-1.5 sm:mr-2 h-4 w-4" />
                <span className="hidden xs:inline">New </span>Treatment
              </Button>
            </Link>
          </div>

          {treatments.length === 0 ? (
            <Card variant="glass" className="p-6 sm:p-10 text-center">
              <div className="mx-auto mb-4 sm:mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-warm-stone/10 to-warm-stone/20">
                <Pill className="h-8 w-8 sm:h-10 sm:w-10 text-warm-stone" />
              </div>
              <h3 className="mb-2 sm:mb-3 font-display text-lg sm:text-xl font-semibold text-rich-black">No treatments yet</h3>
              <p className="mb-5 sm:mb-6 max-w-sm mx-auto text-sm sm:text-base text-warm-gray leading-relaxed">
                Start your personalized health journey by completing a free consultation with our providers
              </p>
              <Link to="/#treatments">
                <Button className="min-h-[44px] px-6 bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 transition-all duration-300 hover:shadow-xl active:scale-[0.98]">
                  Browse Treatments
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {treatments.map((treatment, index) => {
                const status = statusConfig[treatment.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <motion.div
                    key={treatment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={`/treatment/${treatment.id}`} className="group block min-h-[72px]">
                      <Card variant="glass" className="flex items-center justify-between p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30 active:scale-[0.99]">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                          {(() => {
                            const img = getTreatmentImage(treatment.treatment_type);
                            return img ? (
                              <div className="h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-full bg-warm-stone/5">
                                <img src={img} alt={treatment.treatment_type} className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10">
                                <Pill className="h-5 w-5 sm:h-6 sm:w-6 text-warm-stone" />
                              </div>
                            );
                          })()}
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-rich-black text-sm sm:text-base truncate">{treatment.treatment_type}</p>
                            <p className="text-xs sm:text-sm text-warm-gray truncate">
                              {treatment.medication || "Medication pending"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                          <div className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1.5 text-xs font-medium whitespace-nowrap ${status.color}`}>
                            <StatusIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span className="hidden sm:inline">{status.label}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-warm-stone/60 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Recent Activity - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-warm-stone flex-shrink-0" />
            <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-rich-black">Recent Activity</h2>
          </div>
          <Card variant="glass" className="p-6 sm:p-8">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-warm-stone/10">
                <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-warm-stone/60" />
              </div>
              <p className="text-sm sm:text-base text-warm-gray max-w-sm leading-relaxed">
                No recent activity. Start a treatment to see updates and track your progress here.
              </p>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Messaging Modal */}
      <PatientMessaging isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
    </div>
  );
};

export default Dashboard;
