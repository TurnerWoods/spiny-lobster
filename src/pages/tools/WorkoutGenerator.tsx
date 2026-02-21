import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dumbbell, ArrowRight, Sparkles, Loader2, Calendar, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const WorkoutGenerator = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    treatment: "",
    experience: "",
    goal: "",
    daysPerWeek: "",
    equipment: "",
    email: "",
  });

  const treatments = [
    { value: "trt", label: "Testosterone (TRT)", focus: "Strength & hypertrophy optimized" },
    { value: "glp1", label: "GLP-1 (Weight Loss)", focus: "Muscle preservation priority" },
    { value: "peptides", label: "Peptides (Recovery)", focus: "Recovery-optimized training" },
    { value: "none", label: "No treatment", focus: "General fitness" },
  ];

  const experienceLevels = [
    { value: "beginner", label: "Beginner (0-6 months)", days: "3" },
    { value: "intermediate", label: "Intermediate (6mo-2yrs)", days: "4" },
    { value: "advanced", label: "Advanced (2+ years)", days: "5-6" },
  ];

  const goals = [
    { value: "strength", label: "Build Strength" },
    { value: "muscle", label: "Build Muscle Mass" },
    { value: "fat-loss", label: "Fat Loss + Muscle" },
    { value: "general", label: "General Fitness" },
  ];

  const equipmentOptions = [
    { value: "full-gym", label: "Full Gym Access" },
    { value: "home-basic", label: "Home (Dumbbells + Bands)" },
    { value: "home-full", label: "Home Gym (Rack + Weights)" },
    { value: "bodyweight", label: "Bodyweight Only" },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tool: "workout_generator",
            ...formData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWorkoutPlan(data.workoutPlan);
      } else {
        setWorkoutPlan(generateFallbackPlan());
      }
    } catch (error) {
      setWorkoutPlan(generateFallbackPlan());
    }
    
    setIsGenerating(false);
    setStep(3);
  };

  const generateFallbackPlan = () => {
    const isTRT = formData.treatment === "trt";
    const isGLP1 = formData.treatment === "glp1";
    const days = parseInt(formData.daysPerWeek) || 4;
    
    return `## Your ${isTRT ? "TRT-Optimized" : isGLP1 ? "Muscle-Preserving" : "Personalized"} Workout Plan

**Schedule:** ${days} days per week | **Focus:** ${formData.goal === "strength" ? "Progressive Overload" : formData.goal === "muscle" ? "Hypertrophy" : "Balanced Training"}

${isTRT ? "**TRT Advantage:** Your improved recovery means you can handle higher volume and intensity. We've programmed accordingly." : ""}
${isGLP1 ? "**Critical for GLP-1:** Resistance training is essential to preserve muscle during weight loss. Never skip strength work." : ""}

---

### Day 1: Upper Body Push
**Warm-up:** 5 min cardio + arm circles + band pull-aparts

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Bench Press | 4 | 8-10 | 90s |
| Overhead Press | 3 | 10-12 | 75s |
| Incline Dumbbell Press | 3 | 10-12 | 60s |
| Lateral Raises | 3 | 12-15 | 45s |
| Tricep Pushdowns | 3 | 12-15 | 45s |

---

### Day 2: Lower Body
**Warm-up:** 5 min bike + leg swings + bodyweight squats

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Squats | 4 | 6-8 | 2-3min |
| Romanian Deadlift | 3 | 10-12 | 90s |
| Leg Press | 3 | 12-15 | 75s |
| Walking Lunges | 3 | 12/leg | 60s |
| Calf Raises | 4 | 15-20 | 45s |

---

### Day 3: Upper Body Pull
**Warm-up:** 5 min row + shoulder circles + face pulls

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Barbell Rows | 4 | 8-10 | 90s |
| Pull-ups/Lat Pulldown | 3 | 8-12 | 75s |
| Seated Cable Row | 3 | 10-12 | 60s |
| Face Pulls | 3 | 15-20 | 45s |
| Bicep Curls | 3 | 12-15 | 45s |

---

### Day 4: ${days >= 4 ? "Lower Body + Core" : "Rest/Active Recovery"}
${days >= 4 ? `**Warm-up:** 5 min cardio + hip circles

| Exercise | Sets | Reps | Rest |
|----------|------|------|------|
| Deadlift | 4 | 5-6 | 3min |
| Bulgarian Split Squat | 3 | 10/leg | 60s |
| Leg Curl | 3 | 12-15 | 45s |
| Plank | 3 | 45-60s | 30s |
| Ab Wheel/Cable Crunch | 3 | 12-15 | 45s |` : "Light walking, stretching, or yoga recommended."}

---

### Progression Plan
- **Weeks 1-4:** Focus on form, find working weights
- **Weeks 5-8:** Add weight when you hit top of rep range
- **Week 9:** Deload week (reduce weight 40%, same reps)
- **Week 10+:** Start new progression cycle

### Recovery Recommendations
${isTRT ? "- Sleep 7-8 hours for optimal hormone utilization\n- Post-workout protein within 2 hours\n- You recover faster—but don't overtrain" : ""}
${isGLP1 ? "- Prioritize protein (30g+ per meal)\n- Stay hydrated—crucial on GLP-1\n- Don't skip meals around training" : ""}
- Rest 48 hours between training same muscle groups
- Listen to your body—adjust intensity as needed

### Treatment-Specific Tips
${isTRT ? "**For TRT patients:** You may notice faster strength gains and recovery. Progressive overload is your friend—push yourself but maintain form." : ""}
${isGLP1 ? "**For GLP-1 patients:** Your body wants to lose muscle along with fat. This resistance program is specifically designed to signal your body to preserve lean mass." : ""}
${formData.treatment === "peptides" ? "**For Peptide users:** Time your training before evening peptide doses for optimal GH release. Focus on quality sleep for maximum benefit." : ""}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A962] via-[#D4B86A] to-[#C9A962] p-[3px] mb-6">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-deep-charcoal">
              <Dumbbell className="h-9 w-9 text-[#C9A962]" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 mb-4">
            <Sparkles className="h-3 w-3 text-[#C9A962]" />
            <span className="text-xs font-semibold text-[#C9A962]">AI Training by Coach Ryan</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-rich-black mb-4">
            AI Workout <span className="text-warm-stone">Generator</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a custom workout program that complements your treatment protocol. 
            TRT-optimized strength training or GLP-1 muscle preservation—designed for your goals.
          </p>
        </motion.div>

        {step < 3 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 md:p-8">
                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-warm-stone' : 'bg-warm-stone/20'}`} />
                  <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-warm-stone' : 'bg-warm-stone/20'}`} />
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-rich-black">Your Training Profile</h2>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Current Treatment Protocol</Label>
                      <RadioGroup
                        value={formData.treatment}
                        onValueChange={(v) => setFormData({ ...formData, treatment: v })}
                        className="grid gap-3"
                      >
                        {treatments.map((t) => (
                          <div key={t.value} className="flex items-center space-x-3">
                            <RadioGroupItem value={t.value} id={`treatment-${t.value}`} />
                            <Label htmlFor={`treatment-${t.value}`} className="flex-1 cursor-pointer">
                              <span className="font-medium">{t.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">({t.focus})</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Training Experience</Label>
                      <RadioGroup
                        value={formData.experience}
                        onValueChange={(v) => setFormData({ ...formData, experience: v })}
                        className="grid gap-3"
                      >
                        {experienceLevels.map((e) => (
                          <div key={e.value} className="flex items-center space-x-3">
                            <RadioGroupItem value={e.value} id={`exp-${e.value}`} />
                            <Label htmlFor={`exp-${e.value}`} className="flex-1 cursor-pointer">
                              <span className="font-medium">{e.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">(Recommended: {e.days} days/week)</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.treatment || !formData.experience}
                      className="w-full bg-warm-stone hover:bg-warm-stone/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-rich-black">Customize Your Program</h2>

                    <div>
                      <Label className="text-sm font-medium mb-3">Primary Goal</Label>
                      <RadioGroup
                        value={formData.goal}
                        onValueChange={(v) => setFormData({ ...formData, goal: v })}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        {goals.map((g) => (
                          <div key={g.value} className="flex items-center space-x-3 p-3 rounded-lg border border-warm-stone/20 hover:border-warm-stone/40 transition-colors">
                            <RadioGroupItem value={g.value} id={`goal-${g.value}`} />
                            <Label htmlFor={`goal-${g.value}`} className="cursor-pointer flex-1">{g.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Days Per Week You Can Train</Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="2"
                        max="6"
                        placeholder="e.g., 4"
                        value={formData.daysPerWeek}
                        onChange={(e) => setFormData({ ...formData, daysPerWeek: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium mb-3">Equipment Access</Label>
                      <RadioGroup
                        value={formData.equipment}
                        onValueChange={(v) => setFormData({ ...formData, equipment: v })}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        {equipmentOptions.map((e) => (
                          <div key={e.value} className="flex items-center space-x-3 p-3 rounded-lg border border-warm-stone/20 hover:border-warm-stone/40 transition-colors">
                            <RadioGroupItem value={e.value} id={`equip-${e.value}`} />
                            <Label htmlFor={`equip-${e.value}`} className="cursor-pointer flex-1 text-sm">{e.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Email (to receive your program)</Label>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 sm:h-11">
                        Back
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        disabled={!formData.goal || !formData.daysPerWeek || !formData.email || isGenerating}
                        className="flex-1 h-12 sm:h-11 bg-warm-stone hover:bg-warm-stone/90"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            Generate Program
                            <Sparkles className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Results */}
            <Card className="bg-gradient-to-br from-deep-charcoal via-deep-charcoal to-warm-stone/20 border-warm-stone/30 mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30">
                    <Dumbbell className="h-6 w-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-pure-white">Your Custom Workout Program</h2>
                    <p className="text-sm text-warm-gray">by Coach Ryan, Fitness Specialist</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <Calendar className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Frequency</p>
                    <p className="font-semibold text-pure-white">{formData.daysPerWeek} days/week</p>
                  </div>
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <Target className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Focus</p>
                    <p className="font-semibold text-pure-white capitalize">{formData.goal?.replace("-", " ")}</p>
                  </div>
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <Zap className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Protocol</p>
                    <p className="font-semibold text-pure-white uppercase">{formData.treatment || "Standard"}</p>
                  </div>
                </div>

                <div className="bg-deep-charcoal/50 rounded-xl p-6 border border-warm-stone/20 prose prose-invert max-w-none overflow-x-auto">
                  <div className="text-pure-white/90 whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: workoutPlan?.replace(/## /g, '<h2 class="text-[#C9A962] font-display text-xl font-bold mt-6 mb-3">').replace(/### /g, '<h3 class="text-pure-white font-display text-lg font-semibold mt-4 mb-2">').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#C9A962]">$1</strong>').replace(/---/g, '<hr class="border-warm-stone/30 my-4">') || "" }} />
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-bold text-rich-black mb-2">
                  Maximize Your Results
                </h3>
                <p className="text-muted-foreground mb-4">
                  Combine this program with physician-supervised treatment for optimal outcomes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/intake">
                    <Button className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                      Start Treatment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => { setStep(1); setWorkoutPlan(null); }}>
                    Create New Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WorkoutGenerator;
