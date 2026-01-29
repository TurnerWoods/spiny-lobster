import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  Pill,
  MessageCircle,
  Calendar,
  LogOut,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  ChevronRight,
  Home,
  Sparkles,
  Activity,
  RefreshCw
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
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

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending Review", color: "bg-warm-stone/20 text-warm-stone border border-warm-stone/30", icon: Clock },
  under_review: { label: "Under Review", color: "bg-warm-stone/30 text-warm-stone border border-warm-stone/40", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-success/10 text-success border border-success/30", icon: CheckCircle2 },
  active: { label: "Active", color: "bg-warm-stone/10 text-warm-stone border border-warm-stone/20", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground border border-border", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive border border-destructive/30", icon: AlertCircle },
};

// Loading skeleton component for better perceived performance
const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
    {/* Header skeleton */}
    <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-warm-stone/10" />
          <div className="h-5 w-32 animate-pulse rounded bg-warm-stone/10" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-20 animate-pulse rounded-md bg-warm-stone/10" />
          <div className="h-9 w-20 animate-pulse rounded-md bg-warm-stone/10" />
        </div>
      </div>
    </header>

    <main className="container px-4 py-8 md:py-12">
      {/* Welcome section skeleton */}
      <div className="mb-8">
        <div className="mb-4 h-9 w-48 animate-pulse rounded-full bg-warm-stone/10" />
        <div className="h-10 w-72 animate-pulse rounded-lg bg-warm-stone/10" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-warm-stone/10" />
      </div>

      {/* Quick actions skeleton */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border border-warm-stone/10 bg-warm-stone/5" />
        ))}
      </div>

      {/* Treatments section skeleton */}
      <div className="mb-5 flex items-center justify-between">
        <div className="h-7 w-40 animate-pulse rounded bg-warm-stone/10" />
        <div className="h-9 w-32 animate-pulse rounded-md bg-warm-stone/10" />
      </div>
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-warm-stone/10 bg-warm-stone/5" />
        ))}
      </div>
    </main>
  </div>
);

// Error display component
const ErrorCard = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <Card variant="glass" className="border-destructive/30 bg-destructive/5 p-6">
    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-destructive">{message}</p>
        <p className="mt-1 text-sm text-destructive/70">
          Please check your connection and try again.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10"
      >
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
        Retry
      </Button>
    </div>
  </Card>
);

const Dashboard = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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

    setIsLoading(true);
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
      const { count, error: countError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false)
        .neq("sender_role", "patient");

      if (countError) throw countError;
      setUnreadCount(count || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to load your dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Show skeleton while loading
  if (authLoading || isLoading) {
    return <DashboardSkeleton />;
  }

  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src={logoIcon} alt="" className="h-8 w-auto" aria-hidden="true" />
            <span className="font-display text-lg font-bold text-rich-black">
              Elevare<span className="text-warm-stone">Health</span>
            </span>
            <span className="sr-only">Elevare Health - Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
                <Home className="mr-2 h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="container px-4 py-8 md:py-12" role="main">
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
            role="alert"
            aria-live="polite"
          >
            <ErrorCard message={error} onRetry={fetchData} />
          </motion.div>
        )}

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Activity className="h-4 w-4 text-warm-stone" aria-hidden="true" />
            <span className="text-sm font-medium text-warm-stone">Patient Dashboard</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-rich-black md:text-4xl">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-2 text-warm-gray">
            Track your treatments and manage your health journey
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="region"
          aria-label="Quick actions"
        >
          <Link to="/intake" className="group">
            <Card variant="glass" className="flex h-full items-center gap-4 p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/20">
                <Plus className="h-6 w-6 text-warm-stone" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-rich-black">Start Treatment</p>
                <p className="text-sm text-warm-gray">Complete intake</p>
              </div>
            </Card>
          </Link>
          <button
            onClick={() => {
              setIsMessagingOpen(true);
              setUnreadCount(0);
            }}
            className="text-left group w-full"
            aria-label={unreadCount > 0 ? `Messages, ${unreadCount} unread` : "Messages, Chat with care team"}
          >
            <Card variant="glass" className="flex h-full items-center gap-4 p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/20">
                <MessageCircle className="h-6 w-6 text-warm-stone" aria-hidden="true" />
                {unreadCount > 0 && (
                  <span
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-pure-white animate-pulse"
                    aria-hidden="true"
                  >
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-rich-black">Messages</p>
                <p className="text-sm text-warm-gray">
                  {unreadCount > 0 ? `${unreadCount} unread` : "Chat with care team"}
                </p>
              </div>
            </Card>
          </button>
          {/* Appointments - Coming Soon */}
          <Card variant="glass" className="flex items-center gap-4 p-5 opacity-60 cursor-not-allowed" aria-disabled="true">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
              <Calendar className="h-6 w-6 text-warm-stone/60" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-rich-black/80">Appointments</p>
              <p className="text-sm text-warm-gray">Coming soon</p>
            </div>
          </Card>
          {/* Profile - Coming Soon */}
          <Card variant="glass" className="flex items-center gap-4 p-5 opacity-60 cursor-not-allowed" aria-disabled="true">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
              <User className="h-6 w-6 text-warm-stone/60" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-rich-black/80">Profile</p>
              <p className="text-sm text-warm-gray">Coming soon</p>
            </div>
          </Card>
        </motion.div>

        {/* Treatments Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          aria-labelledby="treatments-heading"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-warm-stone" aria-hidden="true" />
              <h2 id="treatments-heading" className="font-display text-xl font-bold text-rich-black md:text-2xl">My Treatments</h2>
            </div>
            <Link to="/#treatments">
              <Button variant="outline" size="sm" className="border-warm-stone/30 text-warm-stone hover:bg-warm-stone/10 hover:border-warm-stone/50">
                <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                New Treatment
              </Button>
            </Link>
          </div>

          {treatments.length === 0 ? (
            <Card variant="glass" className="p-10 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-warm-stone/10 to-warm-stone/20">
                <Pill className="h-10 w-10 text-warm-stone" aria-hidden="true" />
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold text-rich-black">No treatments yet</h3>
              <p className="mb-6 max-w-sm mx-auto text-warm-gray">
                Start your personalized health journey by completing a free consultation with our providers
              </p>
              <Link to="/#treatments">
                <Button className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90 transition-all duration-300 hover:shadow-xl">
                  Browse Treatments
                </Button>
              </Link>
            </Card>
          ) : (
            <ul className="space-y-4" role="list" aria-label="Your treatments">
              {treatments.map((treatment, index) => {
                const status = statusConfig[treatment.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <motion.li
                    key={treatment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={`/treatment/${treatment.id}`} className="group block">
                      <Card variant="glass" className="flex items-center justify-between p-5 transition-all duration-300 hover:shadow-lg hover:border-warm-stone/30">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/20">
                            <Pill className="h-6 w-6 text-warm-stone" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="font-semibold text-rich-black">{treatment.treatment_type}</p>
                            <p className="text-sm text-warm-gray">
                              {treatment.medication || "Medication pending"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Status badge - visible on all screen sizes now */}
                          <div className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium ${status.color}`}>
                            <StatusIcon className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                            <span className="hidden sm:inline">{status.label}</span>
                            <span className="sm:hidden" aria-label={status.label}>{status.label.split(" ")[0]}</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-warm-stone/60 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </div>
                      </Card>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
          aria-labelledby="activity-heading"
        >
          <div className="flex items-center gap-3 mb-5">
            <Package className="h-5 w-5 text-warm-stone" aria-hidden="true" />
            <h2 id="activity-heading" className="font-display text-xl font-bold text-rich-black md:text-2xl">Recent Activity</h2>
          </div>
          <Card variant="glass" className="p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10">
                <Clock className="h-7 w-7 text-warm-stone/60" aria-hidden="true" />
              </div>
              <p className="text-warm-gray max-w-sm">
                No recent activity. Start a treatment to see updates and track your progress here.
              </p>
            </div>
          </Card>
        </motion.section>
      </main>

      {/* Messaging Modal */}
      <PatientMessaging isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
    </div>
  );
};

export default Dashboard;
