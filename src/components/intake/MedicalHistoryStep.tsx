import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <p className="mt-1 text-muted-foreground">
          This information helps our providers create a safe, personalized treatment plan
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="currentWeight" className="text-rich-black">Current Weight (lbs)</Label>
          <Input
            id="currentWeight"
            type="number"
            placeholder="e.g., 180"
            value={data.currentWeight}
            onChange={(e) => onChange({ currentWeight: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="targetWeight" className="text-rich-black">Target Weight (lbs)</Label>
          <Input
            id="targetWeight"
            type="number"
            placeholder="e.g., 160"
            value={data.targetWeight}
            onChange={(e) => onChange({ targetWeight: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label className="text-base text-rich-black">Height</Label>
        <div className="mt-2 flex gap-4">
          <div className="w-24">
            <Select value={data.heightFeet} onValueChange={(value) => onChange({ heightFeet: value })}>
              <SelectTrigger>
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
          <div className="w-24">
            <Select value={data.heightInches} onValueChange={(value) => onChange({ heightInches: value })}>
              <SelectTrigger>
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
      </div>

      <div>
        <Label className="text-base font-semibold text-rich-black">Do you have any of the following conditions?</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {medicalConditionOptions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={data.medicalConditions.includes(condition)}
                onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
              />
              <Label htmlFor={condition} className="text-sm font-normal cursor-pointer text-rich-black">
                {condition}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentMedications" className="text-rich-black">Current Medications</Label>
        <Textarea
          id="currentMedications"
          placeholder="List any medications you're currently taking, including dosages..."
          value={data.currentMedications}
          onChange={(e) => onChange({ currentMedications: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies" className="text-rich-black">Allergies</Label>
        <Textarea
          id="allergies"
          placeholder="List any known allergies to medications or substances..."
          value={data.allergies}
          onChange={(e) => onChange({ allergies: e.target.value })}
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousTreatments" className="text-rich-black">Previous Weight Loss or Hormone Treatments</Label>
        <Textarea
          id="previousTreatments"
          placeholder="Describe any previous treatments you've tried and their outcomes..."
          value={data.previousTreatments}
          onChange={(e) => onChange({ previousTreatments: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  );
};

export default MedicalHistoryStep;
