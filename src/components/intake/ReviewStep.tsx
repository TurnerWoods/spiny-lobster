import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Target, Heart, Activity, Shield } from "lucide-react";

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
  "light": "Lightly Active",
  "moderate": "Moderately Active",
  "active": "Very Active",
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

const ReviewStep = ({ formData, agreedToTerms, onAgreeChange }: ReviewStepProps) => {
  const { healthGoals, medicalHistory, lifestyle } = formData;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground">Review Your Information</h2>
        <p className="mt-1 text-muted-foreground">
          Please review your information before submitting. Our providers will review your intake within 24-48 hours.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-primary" />
              Health Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Primary Goal: </span>
              <Badge variant="secondary">{goalLabels[healthGoals.primaryGoal] || healthGoals.primaryGoal}</Badge>
            </div>
            {healthGoals.secondaryGoals.length > 0 && (
              <div>
                <span className="text-muted-foreground">Additional Goals: </span>
                <div className="mt-1 flex flex-wrap gap-1">
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
                <span>{timelineLabels[healthGoals.targetTimeline]}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Heart className="h-4 w-4 text-primary" />
              Medical Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Weight:</span>
              <span>{medicalHistory.currentWeight || "—"} lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Target Weight:</span>
              <span>{medicalHistory.targetWeight || "—"} lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Height:</span>
              <span>
                {medicalHistory.heightFeet && medicalHistory.heightInches
                  ? `${medicalHistory.heightFeet}'${medicalHistory.heightInches}"`
                  : "—"}
              </span>
            </div>
            {medicalHistory.medicalConditions.length > 0 && (
              <div className="pt-2">
                <span className="text-muted-foreground">Conditions: </span>
                <span>{medicalHistory.medicalConditions.join(", ")}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" />
              Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <span className="text-muted-foreground">Exercise: </span>
              <span>{exerciseLabels[lifestyle.exerciseFrequency] || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Stress Level: </span>
              <span>{stressLabels[lifestyle.stressLevel] || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Sleep: </span>
              <span>{sleepLabels[lifestyle.sleepHours] || "—"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 pt-6">
          <Shield className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Your information is secure</h3>
              <p className="text-sm text-muted-foreground">
                All data is encrypted and HIPAA-compliant. Only your assigned provider will review your information.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => onAgreeChange(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I confirm that the information provided is accurate to the best of my knowledge. I understand that a
                licensed provider will review my intake and may request additional information before prescribing
                treatment.
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
