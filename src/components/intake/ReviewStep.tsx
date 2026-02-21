import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Target, Heart, Activity, Shield, Edit2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewStepProps {
  formData: {
    healthGoals: {
      primaryGoal: string;
      secondaryGoals: string[];
      targetTimeline: string;
    };
    medicalHistory: {
      currentWeight: string;
      targetWeight: string;
      heightFeet: string;
      heightInches: string;
      medicalConditions: string[];
      currentMedications: string;
      allergies: string;
      previousTreatments: string;
    };
    lifestyle: {
      exerciseFrequency: string;
      stressLevel: string;
      sleepHours: string;
      dietDescription: string;
    };
  };
  agreedToTerms: boolean;
  onAgreeChange: (agreed: boolean) => void;
}

const goalLabels: Record<string, string> = {
  "weight-loss": "Weight Loss",
  "hormone-therapy": "Hormone Optimization",
  "peptide-therapy": "Peptide Therapy",
  "anti-aging": "Anti-Aging & Vitality",
};

const timelineLabels: Record<string, string> = {
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "6-12-months": "6-12 months",
  "ongoing": "Ongoing maintenance",
};

const exerciseLabels: Record<string, string> = {
  "sedentary": "Sedentary",
  "light": "Light (1-2 days/week)",
  "moderate": "Moderate (3-4 days/week)",
  "active": "Very Active (5+ days/week)",
};

const stressLabels: Record<string, string> = {
  "low": "Low",
  "moderate": "Moderate",
  "high": "High",
  "very-high": "Very High",
};

const sleepLabels: Record<string, string> = {
  "less-than-5": "Less than 5 hours",
  "5-6": "5-6 hours",
  "6-7": "6-7 hours",
  "7-8": "7-8 hours",
  "8-plus": "8+ hours",
};

// Count how many fields are filled in a section
const countFilledFields = (obj: Record<string, unknown>): number => {
  return Object.values(obj).filter((v) => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return v.trim() !== "";
    return !!v;
  }).length;
};

const ReviewStep = ({ formData, agreedToTerms, onAgreeChange }: ReviewStepProps) => {
  const { healthGoals, medicalHistory, lifestyle } = formData;

  const medicalFieldsCount = countFilledFields(medicalHistory);
  const lifestyleFieldsCount = countFilledFields(lifestyle);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-rich-black">Almost There!</h2>
        <p className="mt-1 text-muted-foreground">
          Review your information below. Our medical team will review it within 24-48 hours.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Health Goals */}
        <Card variant="glass">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-rich-black">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-warm-stone" />
                Health Goals
              </div>
              <CheckCircle className="h-4 w-4 text-accent-gold" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground block mb-1">Primary Goal</span>
              <Badge variant="default" className="text-sm">
                {goalLabels[healthGoals.primaryGoal] || healthGoals.primaryGoal}
              </Badge>
            </div>
            {healthGoals.secondaryGoals.length > 0 && (
              <div>
                <span className="text-muted-foreground block mb-1.5">Additional Goals</span>
                <div className="flex flex-wrap gap-1.5">
                  {healthGoals.secondaryGoals.map((goal) => (
                    <Badge key={goal} variant="outline" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {healthGoals.targetTimeline && (
              <div>
                <span className="text-muted-foreground">Timeline: </span>
                <span className="text-rich-black">{timelineLabels[healthGoals.targetTimeline]}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Info */}
        <Card variant="glass">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-rich-black">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-warm-stone" />
                Medical Info
              </div>
              {medicalFieldsCount > 0 ? (
                <span className="text-xs text-muted-foreground">{medicalFieldsCount} fields</span>
              ) : (
                <span className="text-xs text-muted-foreground">Optional</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {medicalHistory.currentWeight || medicalHistory.targetWeight ? (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="text-rich-black">
                    {medicalHistory.currentWeight ? `${medicalHistory.currentWeight} lbs` : "—"}
                    {medicalHistory.targetWeight && ` → ${medicalHistory.targetWeight} lbs`}
                  </span>
                </div>
              </>
            ) : null}
            {medicalHistory.heightFeet && medicalHistory.heightInches && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Height:</span>
                <span className="text-rich-black">
                  {`${medicalHistory.heightFeet}'${medicalHistory.heightInches}"`}
                </span>
              </div>
            )}
            {medicalHistory.medicalConditions.length > 0 && (
              <div className="pt-1">
                <span className="text-muted-foreground block mb-1">Conditions</span>
                <span className="text-rich-black text-xs">
                  {medicalHistory.medicalConditions.join(", ")}
                </span>
              </div>
            )}
            {medicalHistory.currentMedications && (
              <div className="pt-1">
                <span className="text-muted-foreground block mb-1">Medications</span>
                <span className="text-rich-black text-xs line-clamp-2">
                  {medicalHistory.currentMedications}
                </span>
              </div>
            )}
            {medicalFieldsCount === 0 && (
              <p className="text-muted-foreground italic">No medical information provided</p>
            )}
          </CardContent>
        </Card>

        {/* Lifestyle */}
        <Card variant="glass" className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base text-rich-black">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-warm-stone" />
                Lifestyle
              </div>
              {lifestyleFieldsCount > 0 ? (
                <span className="text-xs text-muted-foreground">{lifestyleFieldsCount} fields</span>
              ) : (
                <span className="text-xs text-muted-foreground">Optional</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lifestyleFieldsCount > 0 ? (
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                {lifestyle.exerciseFrequency && (
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Exercise</span>
                    <span className="text-rich-black">{exerciseLabels[lifestyle.exerciseFrequency]}</span>
                  </div>
                )}
                {lifestyle.stressLevel && (
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Stress Level</span>
                    <span className="text-rich-black">{stressLabels[lifestyle.stressLevel]}</span>
                  </div>
                )}
                {lifestyle.sleepHours && (
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Sleep</span>
                    <span className="text-rich-black">{sleepLabels[lifestyle.sleepHours]}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No lifestyle information provided</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Terms Agreement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className={`border-2 transition-colors ${agreedToTerms ? "border-accent-gold/40 bg-accent-gold/5" : "border-warm-stone/20 bg-warm-stone/5"}`}>
          <CardContent className="flex items-start gap-4 pt-6">
            <Shield className="mt-0.5 h-6 w-6 text-warm-stone flex-shrink-0" />
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="font-semibold text-rich-black">Your information is secure</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All data is encrypted and HIPAA-compliant. Only your assigned provider will review your information.
                </p>
              </div>
              <div
                onClick={() => onAgreeChange(!agreedToTerms)}
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all ${
                  agreedToTerms
                    ? "border-accent-gold/40 bg-accent-gold/10"
                    : "border-warm-stone/10 bg-soft-linen/50 hover:border-warm-stone/30"
                }`}
              >
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => onAgreeChange(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer text-rich-black">
                  I confirm that the information provided is accurate to the best of my knowledge. I understand that a
                  licensed provider will review my intake and may request additional information before prescribing
                  treatment.
                </Label>
              </div>
              {!agreedToTerms && (
                <p className="text-xs text-warm-stone flex items-center gap-1">
                  <Edit2 className="h-3 w-3" />
                  Please check the box above to continue
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReviewStep;
