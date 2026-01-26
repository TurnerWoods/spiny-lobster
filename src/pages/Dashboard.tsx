import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Sparkles
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
  pending: { label: "Pending Review", color: "bg-warm-stone/20 text-warm-stone", icon: Clock },
  under_review: { label: "Under Review", color: "bg-warm-stone/30 text-warm-stone", icon: AlertCircle },
  approved: { label: "Approved", color: "bg-success/10 text-success", icon: CheckCircle2 },
  active: { label: "Active", color: "bg-warm-stone/10 text-warm-stone", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive", icon: AlertCircle },
};

const Dashboard = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

      // Fetch unread message count
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_read", false)
        .neq("sender_role", "patient");

      setUnreadCount(count || 0);
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-warm-stone border-t-transparent" />
      </div>
    );
  }

  const firstName = profile?.first_name || user?.email?.split("@")[0] || "Patient";

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-linen via-pure-white to-light-cloud">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-warm-stone/10 bg-pure-white/70 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold text-rich-black">
              Elevare<span className="text-warm-stone">Health</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-warm-gray hover:text-warm-stone hover:bg-warm-stone/10">
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-warm-stone/20 bg-pure-white/80 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-warm-stone" />
            <span className="text-sm font-medium text-warm-stone">Patient Dashboard</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-rich-black">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-1 text-warm-gray">
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
            <Card variant="glass" className="flex items-center gap-4 p-4 transition-all hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
                <Plus className="h-6 w-6 text-warm-stone" />
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
            className="text-left"
          >
            <Card variant="glass" className="flex h-full items-center gap-4 p-4 transition-all hover:shadow-lg">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
                <MessageCircle className="h-6 w-6 text-warm-stone" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-pure-white">
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
          <Card variant="glass" className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
              <Calendar className="h-6 w-6 text-warm-stone" />
            </div>
            <div>
              <p className="font-semibold text-rich-black">Appointments</p>
              <p className="text-sm text-warm-gray">None scheduled</p>
            </div>
          </Card>
          <Card variant="glass" className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
              <User className="h-6 w-6 text-warm-stone" />
            </div>
            <div>
              <p className="font-semibold text-rich-black">Profile</p>
              <p className="text-sm text-warm-gray">Edit details</p>
            </div>
          </Card>
        </motion.div>

        {/* Treatments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-rich-black">My Treatments</h2>
            <Link to="/#treatments">
              <Button variant="outline" size="sm" className="border-warm-stone/30 text-warm-stone hover:bg-warm-stone/10">
                <Plus className="mr-2 h-4 w-4" />
                New Treatment
              </Button>
            </Link>
          </div>

          {treatments.length === 0 ? (
            <Card variant="glass" className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warm-stone/10">
                <Pill className="h-8 w-8 text-warm-stone" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-rich-black">No treatments yet</h3>
              <p className="mb-4 text-warm-gray">
                Start your health journey by completing a free consultation
              </p>
              <Link to="/#treatments">
                <Button className="bg-warm-stone text-pure-white shadow-lg hover:bg-warm-stone/90">
                  Browse Treatments
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {treatments.map((treatment) => {
                const status = statusConfig[treatment.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <Link key={treatment.id} to={`/treatment/${treatment.id}`}>
                    <Card variant="glass" className="flex items-center justify-between p-4 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warm-stone/10">
                          <Pill className="h-6 w-6 text-warm-stone" />
                        </div>
                        <div>
                          <p className="font-semibold text-rich-black">{treatment.treatment_type}</p>
                          <p className="text-sm text-warm-gray">
                            {treatment.medication || "Medication pending"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${status.color}`}>
                          <StatusIcon className="h-4 w-4" />
                          {status.label}
                        </div>
                        <ChevronRight className="h-5 w-5 text-warm-stone/60" />
                      </div>
                    </Card>
                  </Link>
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
          <h2 className="mb-4 font-display text-xl font-bold text-rich-black">Recent Activity</h2>
          <Card variant="glass" className="p-6">
            <div className="flex items-center gap-4 text-warm-gray">
              <Package className="h-5 w-5 text-warm-stone/60" />
              <p>No recent activity. Start a treatment to see updates here.</p>
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
