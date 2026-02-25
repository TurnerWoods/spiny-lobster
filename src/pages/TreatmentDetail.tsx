import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { format, formatDistanceToNow, addDays, isBefore, isAfter } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Pill,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  RefreshCw,
  FileText,
  Syringe,
  Info,
  TrendingUp,
} from "lucide-react";

interface Treatment {
  id: string;
  treatment_type: string;
  medication: string | null;
  status: string;
  dosage: string | null;
  start_date: string | null;
  next_refill_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Status config using warm luxury palette instead of clinical colors
const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
  pending: {
    label: "Pending Review",
    color: "bg-warm-stone/10 text-warm-stone border-warm-stone/20",
    icon: Clock,
    description: "Your treatment request is awaiting provider review."
  },
  under_review: {
    label: "Under Review",
    color: "bg-warm-stone/15 text-warm-stone border-warm-stone/25",
    icon: AlertCircle,
    description: "A provider is currently reviewing your treatment plan."
  },
  approved: {
    label: "Approved",
    color: "bg-accent-gold/10 text-[#9A8444] border-accent-gold/20",
    icon: CheckCircle2,
    description: "Your treatment has been approved and will ship soon."
  },
  active: {
    label: "Active",
    color: "bg-accent-gold/15 text-[#9A8444] border-accent-gold/25",
    icon: CheckCircle2,
    description: "Your treatment is active. Follow dosage instructions carefully."
  },
  completed: {
    label: "Completed",
    color: "bg-warm-gray/30 text-warm-stone border-warm-gray/40",
    icon: CheckCircle2,
    description: "This treatment cycle has been completed."
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-[#A67563]/10 text-[#8B5A4A] border-[#A67563]/20",
    icon: AlertCircle,
    description: "This treatment has been cancelled."
  },
};

// Map treatment types and medication names to matching product images
const getProductImage = (treatmentType: string, medication: string | null): string => {
  const medLower = (medication || "").toLowerCase();
  const typeLower = treatmentType.toLowerCase();

  // Match by specific medication name first
  const medMap: Record<string, string> = {
    "semaglutide": "/images/products/semaglutide-vial.png",
    "tirzepatide": "/images/products/tirzepatide-prep.png",
    "testosterone": "/images/products/testosterone-vial.png",
    "testosterone cypionate": "/images/products/testosterone-vial.png",
    "testosterone cream": "/images/products/medication-package.png",
    "hcg": "/images/products/hcg-vial.png",
    "gonadorelin": "/images/products/hcg-vial.png",
    "anastrozole": "/images/products/anastrozole-bottle.png",
    "bpc-157": "/images/products/bpc-157-vial.png",
    "bpc": "/images/products/bpc-157-vial.png",
    "tb-500": "/images/products/tb-500-vial.png",
    "tb500": "/images/products/tb-500-vial.png",
    "ghk-cu": "/images/products/ghk-cu-vial.png",
    "ghk": "/images/products/ghk-cu-vial.png",
    "sermorelin": "/images/products/sermorelin-vial.png",
    "cjc-1295": "/images/products/cjc-1295-vial.png",
    "ipamorelin": "/images/products/ipamorelin-vial.png",
    "ghrp-2": "/images/products/ghrp-2-vial.png",
    "pt-141": "/images/products/pt141-vial.png",
    "pt141": "/images/products/pt141-vial.png",
    "bremelanotide": "/images/products/pt141-vial.png",
    "tadalafil": "/images/products/tadalafil-tablets.png",
    "cialis": "/images/products/tadalafil-tablets.png",
    "kisspeptin": "/images/products/kisspeptin-vial.png",
    "oxytocin": "/images/products/oxytocin-spray.png",
    "semax": "/images/products/semax-vial.png",
    "selank": "/images/products/selank-vial.png",
    "dihexa": "/images/products/dihexa-vial.png",
    "mots-c": "/images/products/mots-c-vial.png",
    "methylene blue": "/images/products/methylene-blue-vial.png",
    "nad+": "/images/products/nad-vial.png",
    "nad": "/images/products/nad-vial.png",
    "epitalon": "/images/products/epitalon-vial.png",
    "thymosin": "/images/products/thymosin-alpha-vial.png",
    "finasteride": "/images/products/medication-package.png",
    "minoxidil": "/images/products/hair-growth-dropper.png",
    "tretinoin": "/images/products/medication-package.png",
  };

  for (const [key, img] of Object.entries(medMap)) {
    if (medLower.includes(key)) return img;
  }

  // Fallback by treatment category
  const typeMap: Record<string, string> = {
    "weight loss": "/images/products/semaglutide-vial.png",
    "weight": "/images/products/semaglutide-vial.png",
    "metabolic": "/images/products/semaglutide-vial.png",
    "hormone": "/images/products/testosterone-vial.png",
    "trt": "/images/products/testosterone-vial.png",
    "testosterone": "/images/products/testosterone-vial.png",
    "peptide": "/images/products/bpc-157-vial.png",
    "strength": "/images/products/wolverine-stack.png",
    "recovery": "/images/products/bpc-157-vial.png",
    "sexual": "/images/products/pt141-vial.png",
    "intimate": "/images/products/pt141-vial.png",
    "mood": "/images/products/semax-selank-vials.png",
    "cognitive": "/images/products/semax-selank-vials.png",
    "anti-aging": "/images/products/longevity-stack.png",
    "longevity": "/images/products/longevity-stack.png",
    "hair": "/images/products/hair-restoration-kit.png",
    "skin": "/images/products/ghk-cu-vial.png",
  };

  for (const [key, img] of Object.entries(typeMap)) {
    if (typeLower.includes(key)) return img;
  }

  return "/images/products/medication-package.png";
};

// Mock dosage instructions based on treatment type
const getDosageInstructions = (treatmentType: string, dosage: string | null) => {
  const instructions: Record<string, { frequency: string; timing: string; notes: string[] }> = {
    "Weight Loss": {
      frequency: "Once weekly",
      timing: "Same day each week, any time of day",
      notes: [
        "Inject subcutaneously in abdomen, thigh, or upper arm",
        "Rotate injection sites to prevent irritation",
        "Can be taken with or without food",
        "Store in refrigerator between 36-46°F (2-8°C)",
      ],
    },
    "Peptide Therapy": {
      frequency: "Daily or as prescribed",
      timing: "Morning on empty stomach preferred",
      notes: [
        "Reconstitute with bacteriostatic water as directed",
        "Store reconstituted solution in refrigerator",
        "Use within 30 days of reconstitution",
        "Inject subcutaneously as directed",
      ],
    },
    "Hormone Therapy": {
      frequency: "Weekly or bi-weekly",
      timing: "Consistent timing each week",
      notes: [
        "Follow prescribed injection schedule strictly",
        "Report any unusual side effects immediately",
        "Blood work required every 3-6 months",
        "Avoid alcohol 24 hours before/after injection",
      ],
    },
  };

  return instructions[treatmentType] || {
    frequency: dosage || "As prescribed",
    timing: "Follow provider instructions",
    notes: ["Take as directed by your healthcare provider"],
  };
};

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
  upcoming?: boolean;
}

// Generate mock timeline events - using warm luxury palette
const generateTimelineEvents = (treatment: Treatment): TimelineEvent[] => {
  const events: TimelineEvent[] = [
    {
      date: treatment.created_at,
      title: "Treatment Requested",
      description: "You submitted your treatment intake form",
      icon: FileText,
      color: "bg-warm-stone",
    },
  ];

  if (treatment.status !== "pending") {
    events.push({
      date: new Date(new Date(treatment.created_at).getTime() + 86400000).toISOString(),
      title: "Provider Review Started",
      description: "A provider began reviewing your case",
      icon: AlertCircle,
      color: "bg-[#B8956A]", // Warm amber-brown
    });
  }

  if (["approved", "active", "completed"].includes(treatment.status)) {
    events.push({
      date: new Date(new Date(treatment.created_at).getTime() + 172800000).toISOString(),
      title: "Treatment Approved",
      description: "Your treatment plan was approved",
      icon: CheckCircle2,
      color: "bg-accent-gold",
    });
  }

  if (treatment.start_date) {
    events.push({
      date: treatment.start_date,
      title: "Treatment Started",
      description: `${treatment.medication || "Medication"} ${treatment.dosage || ""} prescribed`,
      icon: Syringe,
      color: "bg-primary",
    });
  }

  if (treatment.status === "active" && treatment.next_refill_date) {
    events.push({
      date: treatment.next_refill_date,
      title: "Upcoming Refill",
      description: "Next refill scheduled",
      icon: RefreshCw,
      color: "bg-deep-charcoal",
      upcoming: true,
    });
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const TreatmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRefillDate, setSelectedRefillDate] = useState<Date | undefined>();
  const [isUpdatingRefill, setIsUpdatingRefill] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user && id) {
      fetchTreatment();
    }
  }, [user, authLoading, id, navigate]);

  const fetchTreatment = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from("treatments")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        navigate("/dashboard");
        return;
      }

      setTreatment(data as Treatment);
      if (data.next_refill_date) {
        setSelectedRefillDate(new Date(data.next_refill_date));
      }
    } catch (error) {
      console.error("Error fetching treatment:", error);
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefillSchedule = async (date: Date | undefined) => {
    if (!date || !treatment) return;

    setIsUpdatingRefill(true);
    try {
      const { error } = await supabase
        .from("treatments")
        .update({ next_refill_date: format(date, "yyyy-MM-dd") })
        .eq("id", treatment.id);

      if (error) throw error;

      setSelectedRefillDate(date);
      setTreatment({ ...treatment, next_refill_date: format(date, "yyyy-MM-dd") });
      toast({
        title: "Refill Scheduled",
        description: `Your next refill is scheduled for ${format(date, "MMMM d, yyyy")}`,
      });
    } catch (error) {
      console.error("Error updating refill date:", error);
      toast({
        title: "Error",
        description: "Failed to schedule refill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingRefill(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!treatment) {
    return null;
  }

  const status = statusConfig[treatment.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const dosageInfo = getDosageInstructions(treatment.treatment_type, treatment.dosage);
  const timelineEvents = generateTimelineEvents(treatment);
  const productImage = getProductImage(treatment.treatment_type, treatment.medication);

  const refillDaysRemaining = treatment.next_refill_date
    ? Math.ceil((new Date(treatment.next_refill_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health logo"
              loading="eager"
              className="h-8 w-auto max-w-full"
            />
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Back Link & Title with Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/dashboard"
            className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            My Treatments
          </Link>
          <div className="flex items-start gap-5">
            {/* Product Image */}
            <div className="hidden sm:block flex-shrink-0">
              <div className="h-20 w-20 overflow-hidden rounded-2xl border border-neutral-gray/20 bg-gradient-to-br from-soft-linen to-warm-stone/5 p-2 shadow-sm">
                <img
                  src={productImage}
                  alt={treatment.medication || treatment.treatment_type}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {treatment.treatment_type}
                </h1>
                <p className="mt-1 text-lg text-muted-foreground">
                  {treatment.medication || "Medication pending assignment"}
                </p>
              </div>
              <div className={cn("flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium", status.color)}>
                <StatusIcon className="h-4 w-4" />
                {status.label}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", status.color.split(" ")[0])}>
                  <StatusIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Treatment Status
                  </h3>
                  <p className="mt-1 text-muted-foreground">{status.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Medication & Dosage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Medication & Dosage
                </h3>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Medication</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {treatment.medication || "Pending assignment"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Dosage</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {treatment.dosage || "To be determined"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {dosageInfo.frequency}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Timing</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {dosageInfo.timing}
                  </p>
                </div>
              </div>

              {/* Dosage Instructions */}
              <div className="rounded-xl border border-primary/20 bg-primary-light/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Important Instructions</span>
                </div>
                <ul className="space-y-2">
                  {dosageInfo.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Treatment Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/15">
                  <TrendingUp className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Treatment Timeline
                </h3>
              </div>

              <div className="relative space-y-6">
                {timelineEvents.map((event, index) => {
                  const EventIcon = event.icon;
                  const isLast = index === timelineEvents.length - 1;
                  const isUpcoming = "upcoming" in event && event.upcoming;

                  return (
                    <div key={index} className="relative flex gap-4">
                      {/* Line */}
                      {!isLast && (
                        <div className="absolute left-5 top-10 h-full w-0.5 bg-muted" />
                      )}
                      {/* Icon */}
                      <div className={cn(
                        "relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white",
                        isUpcoming ? "border-2 border-dashed border-warm-stone bg-background" : event.color
                      )}>
                        <EventIcon className={cn("h-5 w-5", isUpcoming && "text-warm-stone")} />
                      </div>
                      {/* Content */}
                      <div className={cn("flex-1 pb-2", isUpcoming && "opacity-75")}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">{event.title}</span>
                          {isUpcoming && (
                            <span className="rounded-full bg-warm-stone/10 px-2 py-0.5 text-xs font-medium text-warm-stone">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {isUpcoming
                            ? format(new Date(event.date), "MMMM d, yyyy")
                            : `${format(new Date(event.date), "MMM d, yyyy")} • ${formatDistanceToNow(new Date(event.date), { addSuffix: true })}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Refill Scheduling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/15">
                  <RefreshCw className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Refill Schedule
                </h3>
              </div>

              {treatment.next_refill_date ? (
                <div className="mb-4 rounded-xl bg-muted/50 p-4">
                  <p className="text-sm text-muted-foreground">Next Refill</p>
                  <p className="mt-1 font-semibold text-foreground">
                    {format(new Date(treatment.next_refill_date), "MMMM d, yyyy")}
                  </p>
                  {refillDaysRemaining !== null && (
                    <p className={cn(
                      "mt-1 text-sm",
                      refillDaysRemaining <= 7 ? "text-amber-600" : "text-muted-foreground"
                    )}>
                      {refillDaysRemaining > 0
                        ? `${refillDaysRemaining} days remaining`
                        : refillDaysRemaining === 0
                        ? "Refill due today!"
                        : "Refill overdue"}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mb-4 text-sm text-muted-foreground">
                  No refill date scheduled. Schedule your next refill below.
                </p>
              )}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    disabled={!["approved", "active"].includes(treatment.status)}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedRefillDate
                      ? format(selectedRefillDate, "PPP")
                      : "Schedule Refill"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedRefillDate}
                    onSelect={(date) => {
                      setSelectedRefillDate(date);
                      handleRefillSchedule(date);
                    }}
                    disabled={(date) =>
                      isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 90))
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </motion.div>

            {/* Treatment Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10">
                  <FileText className="h-5 w-5 text-warm-stone" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Treatment Details
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium text-foreground">
                    {treatment.start_date
                      ? format(new Date(treatment.start_date), "MMM d, yyyy")
                      : "Not started"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium text-foreground">
                    {format(new Date(treatment.created_at), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium text-foreground">
                    {formatDistanceToNow(new Date(treatment.updated_at), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {treatment.notes && (
                <div className="mt-4 rounded-xl bg-muted/50 p-4">
                  <p className="mb-1 text-sm font-medium text-foreground">Provider Notes</p>
                  <p className="text-sm text-muted-foreground">{treatment.notes}</p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    View All Treatments
                  </Button>
                </Link>
                <Link to="/intake" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Pill className="mr-2 h-4 w-4" />
                    Request New Treatment
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TreatmentDetail;
