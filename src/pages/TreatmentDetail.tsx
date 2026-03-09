import { useEffect, useState, useCallback } from "react";
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
  AlertTriangle,
  Package,
  RefreshCw,
  FileText,
  Syringe,
  Info,
  TrendingUp,
  Loader2,
} from "lucide-react";

// Fallback image for when product images fail to load
const FALLBACK_IMAGE = "/images/products/medication-package.png";
const LOGO_FALLBACK = "/placeholder.svg";

// Safe date formatting utility
const safeFormatDate = (dateString: string, formatStr: string, fallback = "Date unavailable"): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return fallback;
    return format(date, formatStr);
  } catch {
    return fallback;
  }
};

const safeFormatDistanceToNow = (dateString: string, fallback = ""): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return fallback;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return fallback;
  }
};

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

// Status config using warm luxury palette with WCAG AA compliant contrast
const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
  pending: {
    label: "Pending Review",
    color: "bg-warm-stone/15 text-[#4A4239] border-warm-stone/30",
    icon: Clock,
    description: "Your treatment request is awaiting provider review."
  },
  under_review: {
    label: "Under Review",
    color: "bg-warm-stone/20 text-[#4A4239] border-warm-stone/35",
    icon: AlertCircle,
    description: "A provider is currently reviewing your treatment plan."
  },
  approved: {
    label: "Approved",
    color: "bg-accent-gold/15 text-[#6B5A2F] border-accent-gold/30",
    icon: CheckCircle2,
    description: "Your treatment has been approved and will ship soon."
  },
  active: {
    label: "Active",
    color: "bg-accent-gold/20 text-[#6B5A2F] border-accent-gold/35",
    icon: CheckCircle2,
    description: "Your treatment is active. Follow dosage instructions carefully."
  },
  completed: {
    label: "Completed",
    color: "bg-warm-gray/25 text-[#4A4239] border-warm-gray/40",
    icon: CheckCircle2,
    description: "This treatment cycle has been completed."
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-[#A67563]/15 text-[#5C3D32] border-[#A67563]/30",
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

// Generate mock timeline events - using warm luxury palette with good contrast
const generateTimelineEvents = (treatment: Treatment): TimelineEvent[] => {
  const events: TimelineEvent[] = [
    {
      date: treatment.created_at,
      title: "Treatment Requested",
      description: "You submitted your treatment intake form",
      icon: FileText,
      color: "bg-[#5C5248]", // Darker warm stone for better contrast with white icon
    },
  ];

  if (treatment.status !== "pending") {
    events.push({
      date: new Date(new Date(treatment.created_at).getTime() + 86400000).toISOString(),
      title: "Provider Review Started",
      description: "A provider began reviewing your case",
      icon: AlertCircle,
      color: "bg-[#8B7355]", // Darker amber-brown for better contrast
    });
  }

  if (["approved", "active", "completed"].includes(treatment.status)) {
    events.push({
      date: new Date(new Date(treatment.created_at).getTime() + 172800000).toISOString(),
      title: "Treatment Approved",
      description: "Your treatment plan was approved",
      icon: CheckCircle2,
      color: "bg-[#9A8544]", // Darker gold for better contrast with white icon
    });
  }

  if (treatment.start_date) {
    events.push({
      date: treatment.start_date,
      title: "Treatment Started",
      description: `${treatment.medication || "Medication"} ${treatment.dosage || ""} prescribed`,
      icon: Syringe,
      color: "bg-[#4A4239]", // Dark warm tone for better contrast with white icon
    });
  }

  if (treatment.status === "active" && treatment.next_refill_date) {
    events.push({
      date: treatment.next_refill_date,
      title: "Upcoming Refill",
      description: "Next refill scheduled",
      icon: RefreshCw,
      color: "bg-[#3D3A35]", // Dark charcoal for better contrast with white icon
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
  const [error, setError] = useState<string | null>(null);
  const [selectedRefillDate, setSelectedRefillDate] = useState<Date | undefined>();
  const [isUpdatingRefill, setIsUpdatingRefill] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});

  // Handle image load errors with fallback
  const handleImageError = useCallback((imageKey: string) => {
    setImageLoadErrors(prev => ({ ...prev, [imageKey]: true }));
  }, []);

  const fetchTreatment = useCallback(async () => {
    if (!user || !id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("treatments")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError("Treatment not found or you don't have access to view it.");
        return;
      }

      setTreatment(data as Treatment);
      if (data.next_refill_date) {
        setSelectedRefillDate(new Date(data.next_refill_date));
      }
    } catch (err) {
      console.error("Error fetching treatment:", err);
      setError("Failed to load treatment details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [user, id]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user && id) {
      fetchTreatment();
    }
  }, [user, authLoading, id, navigate, fetchTreatment]);

  const handleRefillSchedule = useCallback(async (date: Date | undefined) => {
    if (!date || !treatment) return;

    // Validate date is in valid range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = addDays(today, 90);

    if (isBefore(date, today)) {
      toast({
        title: "Invalid Date",
        description: "Please select a future date for your refill.",
        variant: "destructive",
      });
      return;
    }

    if (isAfter(date, maxDate)) {
      toast({
        title: "Invalid Date",
        description: "Please select a date within the next 90 days.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingRefill(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const { error: updateError } = await supabase
        .from("treatments")
        .update({ next_refill_date: formattedDate })
        .eq("id", treatment.id)
        .eq("user_id", user?.id);

      if (updateError) throw updateError;

      setSelectedRefillDate(date);
      setTreatment(prev => prev ? { ...prev, next_refill_date: formattedDate } : null);
      toast({
        title: "Refill Scheduled",
        description: `Your next refill is scheduled for ${format(date, "MMMM d, yyyy")}`,
      });
    } catch (err) {
      console.error("Error updating refill date:", err);
      toast({
        title: "Error",
        description: "Failed to schedule refill. Please try again.",
        variant: "destructive",
      });
      // Revert the selected date on error
      if (treatment.next_refill_date) {
        setSelectedRefillDate(new Date(treatment.next_refill_date));
      } else {
        setSelectedRefillDate(undefined);
      }
    } finally {
      setIsUpdatingRefill(false);
    }
  }, [treatment, user?.id, toast]);

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading treatment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/30 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Error Loading Treatment</h2>
        <p className="text-center text-muted-foreground">{error}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
          <Button onClick={() => fetchTreatment()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-muted/30 px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Treatment Not Found</h2>
        <p className="text-center text-muted-foreground">
          The treatment you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
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
    <div className="min-h-screen bg-muted/30 pb-24 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 min-h-[56px] items-center justify-between px-4 sm:h-16">
          <Link to="/" className="flex items-center min-h-[44px] min-w-[44px]">
            <img
              src={imageLoadErrors["logo"] ? LOGO_FALLBACK : "/elevar-logo.svg"}
              alt="Elevar Health logo"
              loading="eager"
              className="h-7 w-auto max-w-full sm:h-8"
              onError={() => handleImageError("logo")}
            />
          </Link>
          <Link to="/dashboard" className="min-h-[44px] min-w-[44px] flex items-center">
            <Button variant="ghost" size="sm" className="min-h-[44px] px-3 text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="container px-4 py-6 sm:py-8">
        {/* Back Link & Title with Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            to="/dashboard"
            className="mb-4 inline-flex items-center min-h-[44px] text-sm text-muted-foreground hover:text-foreground active:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            My Treatments
          </Link>

          {/* Mobile Product Image - Responsive hero */}
          <div className="sm:hidden mb-4">
            <div className="relative w-full aspect-square max-w-[200px] mx-auto overflow-hidden rounded-2xl border border-neutral-gray/20 bg-gradient-to-br from-soft-linen to-warm-stone/5 p-4 shadow-sm">
              <img
                src={imageLoadErrors["product-mobile"] ? FALLBACK_IMAGE : productImage}
                alt={treatment.medication || treatment.treatment_type}
                className="h-full w-full object-contain"
                onError={() => handleImageError("product-mobile")}
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex items-start gap-5">
            {/* Desktop Product Image */}
            <div className="hidden sm:block flex-shrink-0">
              <div className="h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-2xl border border-neutral-gray/20 bg-gradient-to-br from-soft-linen to-warm-stone/5 p-2 shadow-sm">
                <img
                  src={imageLoadErrors["product"] ? FALLBACK_IMAGE : productImage}
                  alt={treatment.medication || treatment.treatment_type}
                  className="h-full w-full object-contain"
                  onError={() => handleImageError("product")}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-3 sm:gap-4">
              <div className="w-full sm:w-auto">
                <h1 className="font-display text-xl font-bold text-foreground sm:text-2xl md:text-3xl leading-tight">
                  {treatment.treatment_type}
                </h1>
                <p className="mt-1 text-base sm:text-lg text-[#4A4239] leading-snug">
                  {treatment.medication || "Medication pending assignment"}
                </p>
              </div>
              <div className={cn("flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium min-h-[44px]", status.color)}>
                <StatusIcon className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">{status.label}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-2">
            {/* Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full flex-shrink-0", status.color.split(" ")[0])}>
                  <StatusIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                    Treatment Status
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-[#4A4239] leading-relaxed">{status.description}</p>
                </div>
              </div>
            </motion.div>

            {/* Medication & Dosage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="mb-4 sm:mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light flex-shrink-0">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Medication & Dosage
                </h3>
              </div>

              <div className="mb-4 sm:mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>Medication</p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-foreground leading-snug">
                    {treatment.medication || "Pending assignment"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>Dosage</p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-foreground leading-snug">
                    {treatment.dosage || "To be determined"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>Frequency</p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-foreground leading-snug">
                    {dosageInfo.frequency}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>Timing</p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-foreground leading-snug">
                    {dosageInfo.timing}
                  </p>
                </div>
              </div>

              {/* Dosage Instructions */}
              <div className="rounded-xl border border-primary/30 bg-primary-light/40 p-3 sm:p-4">
                <div className="mb-2 sm:mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 text-[#4A4239] flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-[#3D3632]">Important Instructions</span>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {dosageInfo.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[#3D3632] leading-relaxed" style={{ fontSize: 'max(12px, 0.875rem)' }}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4A4239]" />
                      <span>{note}</span>
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
              className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="mb-4 sm:mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/15 flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Treatment Timeline
                </h3>
              </div>

              <div className="relative space-y-4 sm:space-y-6">
                {timelineEvents.map((event, index) => {
                  const EventIcon = event.icon;
                  const isLast = index === timelineEvents.length - 1;
                  const isUpcoming = "upcoming" in event && event.upcoming;

                  return (
                    <div key={index} className="relative flex gap-3 sm:gap-4">
                      {/* Line */}
                      {!isLast && (
                        <div className="absolute left-4 sm:left-5 top-8 sm:top-10 h-full w-0.5 bg-muted" />
                      )}
                      {/* Icon */}
                      <div className={cn(
                        "relative z-10 flex h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-white",
                        isUpcoming ? "border-2 border-dashed border-[#5C5248] bg-background" : event.color
                      )}>
                        <EventIcon className={cn("h-4 w-4 sm:h-5 sm:w-5", isUpcoming && "text-[#4A4239]")} />
                      </div>
                      {/* Content */}
                      <div className={cn("flex-1 pb-2 min-w-0", isUpcoming && "opacity-90")}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm sm:text-base font-semibold text-foreground">{event.title}</span>
                          {isUpcoming && (
                            <span className="rounded-full bg-[#5C5248]/15 px-2 py-0.5 text-xs font-semibold text-[#4A4239] whitespace-nowrap">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-[#4A4239] leading-relaxed" style={{ fontSize: 'max(12px, 0.875rem)' }}>{event.description}</p>
                        <p className="mt-1 text-xs text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>
                          {isUpcoming
                            ? safeFormatDate(event.date, "MMMM d, yyyy")
                            : `${safeFormatDate(event.date, "MMM d, yyyy")} • ${safeFormatDistanceToNow(event.date)}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Refill Scheduling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold/15 flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-accent-gold" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Refill Schedule
                </h3>
              </div>

              {treatment.next_refill_date ? (
                <div className="mb-4 rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-[#5C5248] font-medium" style={{ fontSize: 'max(12px, 0.75rem)' }}>Next Refill</p>
                  <p className="mt-1 text-base sm:text-lg font-semibold text-foreground">
                    {safeFormatDate(treatment.next_refill_date, "MMMM d, yyyy")}
                  </p>
                  {refillDaysRemaining !== null && (
                    <p className={cn(
                      "mt-1 text-sm",
                      refillDaysRemaining <= 7 ? "text-[#B45309] font-semibold" : "text-[#5C5248]"
                    )} style={{ fontSize: 'max(12px, 0.875rem)' }}>
                      {refillDaysRemaining > 0
                        ? `${refillDaysRemaining} days remaining`
                        : refillDaysRemaining === 0
                        ? "Refill due today!"
                        : "Refill overdue"}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mb-4 text-sm text-[#5C5248] leading-relaxed" style={{ fontSize: 'max(12px, 0.875rem)' }}>
                  No refill date scheduled. Schedule your next refill below.
                </p>
              )}

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal min-h-[44px] text-sm",
                      !selectedRefillDate && "text-muted-foreground"
                    )}
                    disabled={!["approved", "active"].includes(treatment.status) || isUpdatingRefill}
                  >
                    {isUpdatingRefill ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    )}
                    {selectedRefillDate
                      ? format(selectedRefillDate, "PPP")
                      : "Schedule Refill"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
                  <Calendar
                    mode="single"
                    selected={selectedRefillDate}
                    onSelect={(date) => {
                      if (date) {
                        handleRefillSchedule(date);
                        setCalendarOpen(false);
                      }
                    }}
                    disabled={(date) =>
                      isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 90))
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {!["approved", "active"].includes(treatment.status) && (
                <p className="mt-2 text-xs text-[#5C5248]" style={{ fontSize: 'max(12px, 0.75rem)' }}>
                  Refill scheduling is available once your treatment is approved.
                </p>
              )}
            </motion.div>

            {/* Treatment Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-stone/10 flex-shrink-0">
                  <FileText className="h-5 w-5 text-warm-stone" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                  Treatment Details
                </h3>
              </div>

              <div className="space-y-3 text-sm" style={{ fontSize: 'max(12px, 0.875rem)' }}>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#5C5248]">Start Date</span>
                  <span className="font-semibold text-foreground text-right">
                    {treatment.start_date
                      ? safeFormatDate(treatment.start_date, "MMM d, yyyy")
                      : "Not started"}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#5C5248]">Created</span>
                  <span className="font-semibold text-foreground text-right">
                    {safeFormatDate(treatment.created_at, "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[#5C5248]">Last Updated</span>
                  <span className="font-semibold text-foreground text-right">
                    {safeFormatDistanceToNow(treatment.updated_at, "Recently")}
                  </span>
                </div>
              </div>

              {treatment.notes && (
                <div className="mt-4 rounded-xl bg-muted/50 p-3 sm:p-4">
                  <p className="mb-1 text-sm font-semibold text-foreground">Provider Notes</p>
                  <p className="text-sm text-[#4A4239] leading-relaxed" style={{ fontSize: 'max(12px, 0.875rem)' }}>{treatment.notes}</p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions - Hidden on mobile since we have sticky CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden md:block rounded-2xl border bg-card p-4 sm:p-6 shadow-sm"
            >
              <h3 className="mb-4 font-display text-base sm:text-lg font-semibold text-foreground">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link to="/dashboard" className="block">
                  <Button variant="outline" className="w-full justify-start min-h-[44px] text-sm">
                    <Package className="mr-2 h-4 w-4" />
                    View All Treatments
                  </Button>
                </Link>
                <Link to="/intake" className="block">
                  <Button variant="outline" className="w-full justify-start min-h-[44px] text-sm">
                    <Pill className="mr-2 h-4 w-4" />
                    Request New Treatment
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full min-h-[48px] text-sm font-medium">
                <Package className="mr-2 h-4 w-4" />
                All Treatments
              </Button>
            </Link>
            <Link to="/intake" className="flex-1">
              <Button className="w-full min-h-[48px] text-sm font-medium bg-primary hover:bg-primary/90">
                <Pill className="mr-2 h-4 w-4" />
                New Treatment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
