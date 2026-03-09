import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

interface MedicalHistoryStepProps {
  data: {
    currentMedications: string;
    allergies: string;
    medicalConditions: string[];
    previousTreatments: string;
    currentWeight: string;
    targetWeight: string;
    heightFeet: string;
    heightInches: string;
  };
  onChange: (data: Partial<MedicalHistoryStepProps["data"]>) => void;
}

const medicalConditionOptions = [
  "Diabetes (Type 1 or 2)",
  "High blood pressure",
  "Heart disease",
  "Thyroid disorder",
  "Sleep apnea",
  "Depression/Anxiety",
  "PCOS",
  "Low testosterone",
  "None of the above",
];

const MedicalHistoryStep = ({ data, onChange }: MedicalHistoryStepProps) => {
  const handleConditionChange = (condition: string, checked: boolean) => {
    let updated: string[];
    if (condition === "None of the above" && checked) {
      updated = ["None of the above"];
    } else if (checked) {
      updated = [...data.medicalConditions.filter((c) => c !== "None of the above"), condition];
    } else {
      updated = data.medicalConditions.filter((c) => c !== condition);
    }
    onChange({ medicalConditions: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold text-rich-black">Medical History</h2>
        <p className="mt-1 text-foreground/70">
          This information helps our providers create a safe, personalized treatment plan
        </p>
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-soft-linen/50 border border-warm-stone/10 p-3 text-sm text-foreground/70">
          <Info className="h-4 w-4 text-warm-stone mt-0.5 flex-shrink-0" />
          <span>All fields on this page are optional. Share what you're comfortable with - you can always add more details later.</span>
        </div>
      </div>

      {/* Weight & Height - Simplified layout for mobile */}
      <div className="space-y-4">
        <Label className="text-base font-semibold text-rich-black">
          Basic Measurements
          <span className="ml-2 text-xs font-normal text-foreground/60">(Optional)</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentWeight" className="text-sm text-rich-black">Current Weight</Label>
            <div className="relative">
              <Input
                id="currentWeight"
                type="number"
                inputMode="numeric"
                placeholder="180"
                value={data.currentWeight}
                onChange={(e) => onChange({ currentWeight: e.target.value })}
                className="pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/60">lbs</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetWeight" className="text-sm text-rich-black">Goal Weight</Label>
            <div className="relative">
              <Input
                id="targetWeight"
                type="number"
                inputMode="numeric"
                placeholder="160"
                value={data.targetWeight}
                onChange={(e) => onChange({ targetWeight: e.target.value })}
                className="pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-foreground/60">lbs</span>
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="text-sm text-rich-black">Height</legend>
          <div className="mt-2 flex gap-3">
            <div className="flex-1">
              <Select value={data.heightFeet} onValueChange={(value) => onChange({ heightFeet: value })}>
                <SelectTrigger id="heightFeet" aria-label="Height in feet" className="h-12 sm:h-11">
                  <SelectValue placeholder="Feet" />
                </SelectTrigger>
                <SelectContent>
                  {[4, 5, 6, 7].map((ft) => (
                    <SelectItem key={ft} value={ft.toString()}>
                      {ft} ft
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={data.heightInches} onValueChange={(value) => onChange({ heightInches: value })}>
                <SelectTrigger id="heightInches" aria-label="Height in inches" className="h-12 sm:h-11">
                  <SelectValue placeholder="Inches" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} in
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Medical Conditions - Better touch targets */}
      <div>
        <Label className="text-base font-semibold text-rich-black">
          Do you have any of the following conditions?
          <span className="ml-2 text-xs font-normal text-foreground/60">(Optional)</span>
        </Label>
        <p className="mt-1 mb-3 text-sm text-foreground/70">Select all that apply</p>
        <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Medical conditions">
          {medicalConditionOptions.map((condition) => {
            const isSelected = data.medicalConditions.includes(condition);
            const conditionId = `condition-${condition.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
            return (
              <div
                key={condition}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`${condition}${isSelected ? ", selected" : ""}`}
                className={`flex items-center space-x-3 rounded-lg border p-3 min-h-[48px] cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-warm-stone/30 focus-visible:ring-offset-2 active:scale-[0.98] ${
                  isSelected
                    ? "border-warm-stone bg-warm-stone/5"
                    : "border-warm-stone/20 hover:border-warm-stone/40"
                }`}
                onClick={() => handleConditionChange(condition, !isSelected)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleConditionChange(condition, !isSelected);
                  }
                }}
              >
                <Checkbox
                  id={conditionId}
                  checked={isSelected}
                  onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                  tabIndex={-1}
                  aria-hidden="true"
                />
                <span className="text-sm font-normal text-rich-black flex-1">
                  {condition}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medications - Simplified */}
      <div className="space-y-2">
        <Label htmlFor="currentMedications" className="text-base font-semibold text-rich-black">
          Current Medications
          <span className="ml-2 text-xs font-normal text-foreground/60">(Optional)</span>
        </Label>
        <p className="text-sm text-foreground/70 mb-2">Include prescription medications, supplements, and over-the-counter drugs</p>
        <Textarea
          id="currentMedications"
          placeholder="e.g., Metformin 500mg, Vitamin D 2000IU, Advil as needed..."
          value={data.currentMedications}
          onChange={(e) => onChange({ currentMedications: e.target.value })}
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Allergies - Simplified */}
      <div className="space-y-2">
        <Label htmlFor="allergies" className="text-base font-semibold text-rich-black">
          Known Allergies
          <span className="ml-2 text-xs font-normal text-foreground/60">(Optional)</span>
        </Label>
        <Textarea
          id="allergies"
          placeholder="e.g., Penicillin, shellfish, latex, or 'None known'"
          value={data.allergies}
          onChange={(e) => onChange({ allergies: e.target.value })}
          rows={2}
          className="resize-none"
        />
      </div>

      {/* Previous Treatments - Optional with expandable */}
      <div className="space-y-2">
        <Label htmlFor="previousTreatments" className="text-base font-semibold text-rich-black">
          Previous Treatments
          <span className="ml-2 text-xs font-normal text-foreground/60">(Optional)</span>
        </Label>
        <p className="text-sm text-foreground/70 mb-2">Have you tried weight loss or hormone treatments before?</p>
        <Textarea
          id="previousTreatments"
          placeholder="e.g., 'Tried Wegovy for 3 months with good results' or 'No previous treatments'"
          value={data.previousTreatments}
          onChange={(e) => onChange({ previousTreatments: e.target.value })}
          rows={2}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default MedicalHistoryStep;
