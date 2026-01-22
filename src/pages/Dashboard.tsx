import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
  Home
} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

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
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  active: { label: "Active", color: "bg-primary-light text-primary", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-gray-100 text-gray-600", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: AlertCircle },
};

const Dashboard = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileData) setProfile(profileData);

      // Fetch treatments
      const { data: treatmentsData } = await supabase
        .from("treatments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (treatmentsData) setTreatments(treatmentsData as Treatment[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="Pure Nova Health" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold">
              Pure<span className="text-primary">Nova</span>Health
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track your treatments and manage your health journey
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Link to="/intake">
            <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Start Treatment</p>
                <p className="text-sm text-muted-foreground">Complete intake</p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Messages</p>
              <p className="text-sm text-muted-foreground">0 unread</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Appointments</p>
              <p className="text-sm text-muted-foreground">None scheduled</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <User className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Profile</p>
              <p className="text-sm text-muted-foreground">Edit details</p>
            </div>
          </div>
        </motion.div>

        {/* Treatments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">My Treatments</h2>
            <Link to="/#treatments">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Treatment
              </Button>
            </Link>
          </div>

          {treatments.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Pill className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">No treatments yet</h3>
              <p className="mb-4 text-muted-foreground">
                Start your health journey by completing a free consultation
              </p>
              <Link to="/#treatments">
                <Button className="bg-primary hover:bg-primary-dark">
                  Browse Treatments
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {treatments.map((treatment) => {
                const status = statusConfig[treatment.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <div
                    key={treatment.id}
                    className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                        <Pill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{treatment.treatment_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {treatment.medication || "Medication pending"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Recent Activity</h2>
          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center gap-4 text-muted-foreground">
              <Package className="h-5 w-5" />
              <p>No recent activity. Start a treatment to see updates here.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;