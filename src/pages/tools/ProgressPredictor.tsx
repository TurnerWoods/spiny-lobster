import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TrendingUp, ArrowRight, Sparkles, Loader2, Zap, Scale, Brain, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProgressPredictor = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    treatment: "",
    age: "",
    currentWeight: "",
    goalWeight: "",
    primaryConcern: "",
    email: "",
  });

  const treatments = [
    { value: "trt", label: "Testosterone (TRT)", icon: Zap },
    { value: "glp1", label: "GLP-1 (Semaglutide/Tirzepatide)", icon: Scale },
    { value: "peptides", label: "Peptides (Sermorelin, etc.)", icon: Heart },
    { value: "nad", label: "NAD+ Therapy", icon: Brain },
  ];

  const concerns = [
    { value: "energy", label: "Low Energy / Fatigue" },
    { value: "weight", label: "Weight Loss" },
    { value: "muscle", label: "Muscle Building" },
    { value: "libido", label: "Low Libido" },
    { value: "focus", label: "Brain Fog / Focus" },
    { value: "sleep", label: "Poor Sleep" },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Generate predictions based on treatment and profile
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const treatmentPredictions = generatePredictions();
    setPredictions(treatmentPredictions);
    
    setIsGenerating(false);
    setStep(2);
  };

  const generatePredictions = () => {
    const treatment = formData.treatment;
    const weight = parseInt(formData.currentWeight) || 200;
    const goalWeight = parseInt(formData.goalWeight) || weight - 30;
    const weightToLose = weight - goalWeight;

    if (treatment === "trt") {
      return {
        title: "TRT Progress Prediction",
        timeline: [
          { week: "Week 2-4", milestone: "Energy Boost", description: "Initial improvements in energy, mood, and sense of well-being. Many patients report feeling 'more alive'.", confidence: 85 },
          { week: "Week 4-6", milestone: "Libido Returns", description: "Noticeable improvements in sexual desire and performance. Morning energy peaks.", confidence: 80 },
          { week: "Week 8-12", milestone: "Body Changes Begin", description: "Body composition shifts start. Muscle definition improves, stubborn fat begins mobilizing.", confidence: 75 },
          { week: "Month 3-6", milestone: "Optimal Results", description: "Full benefits realized. Muscle mass increases, fat loss accelerates, mental clarity peaks.", confidence: 90 },
        ],
        metrics: [
          { label: "Energy Level", before: "3/10", after: "8/10", improvement: "+167%" },
          { label: "Lean Muscle", before: "Declining", after: "+8-15 lbs", improvement: "Significant" },
          { label: "Body Fat", before: `${Math.round(weight * 0.25)} lbs`, after: `${Math.round(weight * 0.18)} lbs`, improvement: "-7%" },
          { label: "Libido", before: "Low", after: "Restored", improvement: "+200%" },
        ],
        factors: [
          "Starting testosterone level (lower = more dramatic improvement)",
          "Consistency with injection schedule",
          "Diet and exercise habits",
          "Sleep quality",
          "Age (younger patients often see faster results)",
        ],
      };
    }

    if (treatment === "glp1") {
      const weeklyLoss = 1.5; // lbs per week average
      const monthsToGoal = Math.round(weightToLose / (weeklyLoss * 4));
      
      return {
        title: "GLP-1 Weight Loss Prediction",
        timeline: [
          { week: "Week 1-2", milestone: "Appetite Reduction", description: "Significant decrease in hunger and food noise. Portion control becomes effortless.", confidence: 90 },
          { week: "Week 4-6", milestone: `First ${Math.round(weight * 0.05)} lbs Gone`, description: "5-8% body weight loss typical. Clothes fit looser, energy improving.", confidence: 85 },
          { week: "Month 3", milestone: `Down ${Math.round(weight * 0.12)} lbs`, description: "10-15% body weight loss. Major health markers improving (blood sugar, blood pressure).", confidence: 80 },
          { week: `Month ${monthsToGoal}`, milestone: "Goal Weight", description: `Projected to reach ${goalWeight} lbs with continued adherence.`, confidence: 70 },
        ],
        metrics: [
          { label: "Body Weight", before: `${weight} lbs`, after: `${goalWeight} lbs`, improvement: `-${weightToLose} lbs` },
          { label: "Waist Size", before: `${Math.round(weight / 5)}"`, after: `${Math.round(goalWeight / 5)}"`, improvement: `-${Math.round(weightToLose / 5)}"` },
          { label: "A1C", before: "Elevated", after: "Normal", improvement: "Normalized" },
          { label: "Appetite", before: "Constant", after: "Controlled", improvement: "-60%" },
        ],
        factors: [
          "Starting weight (higher BMI = faster initial loss)",
          "Medication dose (titration schedule)",
          "Protein intake (critical for muscle preservation)",
          "Physical activity level",
          "Hydration and sleep",
        ],
      };
    }

    if (treatment === "peptides") {
      return {
        title: "Peptide Therapy Prediction",
        timeline: [
          { week: "Week 1-2", milestone: "Sleep Quality", description: "Deeper, more restorative sleep. Wake feeling refreshed.", confidence: 85 },
          { week: "Week 4-8", milestone: "Recovery Enhancement", description: "Faster recovery from workouts. Reduced joint discomfort.", confidence: 80 },
          { week: "Month 2-3", milestone: "Body Composition", description: "Visible improvements in body composition. Skin quality improving.", confidence: 75 },
          { week: "Month 6+", milestone: "Anti-Aging Benefits", description: "Cumulative benefits in energy, appearance, and vitality.", confidence: 70 },
        ],
        metrics: [
          { label: "Sleep Score", before: "Poor", after: "Optimal", improvement: "+80%" },
          { label: "Recovery Time", before: "3-4 days", after: "1-2 days", improvement: "50% faster" },
          { label: "IGF-1 Levels", before: "Low-Normal", after: "Optimal", improvement: "+40%" },
          { label: "Skin Quality", before: "Aging", after: "Improved", improvement: "Visible" },
        ],
        factors: [
          "Baseline GH/IGF-1 levels",
          "Training intensity and frequency",
          "Timing of doses (evening optimal)",
          "Diet quality",
          "Overall health status",
        ],
      };
    }

    // NAD+ default
    return {
      title: "NAD+ Therapy Prediction",
      timeline: [
        { week: "Days 1-7", milestone: "Mental Clarity", description: "Brain fog lifts. Mental sharpness and focus improve noticeably.", confidence: 85 },
        { week: "Week 2-3", milestone: "Energy Surge", description: "Sustained energy throughout the day. Afternoon crashes disappear.", confidence: 80 },
        { week: "Week 4-6", milestone: "Recovery & Sleep", description: "Better sleep quality, faster recovery from physical and mental exertion.", confidence: 75 },
        { week: "Month 3+", milestone: "Cellular Benefits", description: "Long-term cellular health improvements. Biological age markers may improve.", confidence: 70 },
      ],
      metrics: [
        { label: "Mental Clarity", before: "Foggy", after: "Sharp", improvement: "+150%" },
        { label: "Energy Level", before: "3/10", after: "8/10", improvement: "+167%" },
        { label: "NAD+ Levels", before: "Depleted", after: "Optimal", improvement: "Restored" },
        { label: "Biological Age", before: "Accelerated", after: "Improved", improvement: "-5 years" },
      ],
      factors: [
        "Baseline NAD+ depletion level",
        "Age (older = more depleted = more improvement)",
        "Lifestyle factors (alcohol, stress)",
        "Consistency of treatment",
        "Overall metabolic health",
      ],
    };
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
              <TrendingUp className="h-9 w-9 text-[#C9A962]" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 mb-4">
            <Sparkles className="h-3 w-3 text-[#C9A962]" />
            <span className="text-xs font-semibold text-[#C9A962]">AI-Powered Forecasting</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-rich-black mb-4">
            Progress <span className="text-warm-stone">Predictor</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See your expected timeline based on patients like you. 
            Realistic projections for weight loss, energy, and more.
          </p>
        </motion.div>

        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-display text-xl font-bold text-rich-black mb-6">Tell us about yourself</h2>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Treatment You're Considering</Label>
                    <RadioGroup
                      value={formData.treatment}
                      onValueChange={(v) => setFormData({ ...formData, treatment: v })}
                      className="grid grid-cols-2 gap-3"
                    >
                      {treatments.map((t) => (
                        <div key={t.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={t.value} id={`treatment-${t.value}`} />
                          <Label htmlFor={`treatment-${t.value}`} className="cursor-pointer flex items-center gap-2">
                            <t.icon className="h-4 w-4 text-warm-stone" />
                            <span className="text-sm">{t.label}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Mobile-first: stacked then 2-col on sm+ */}
                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                    <div>
                      <Label>Age</Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g., 45"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Current Weight (lbs)</Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g., 220"
                        value={formData.currentWeight}
                        onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
                      />
                    </div>
                  </div>

                  {formData.treatment === "glp1" && (
                    <div>
                      <Label>Goal Weight (lbs)</Label>
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="e.g., 180"
                        value={formData.goalWeight}
                        onChange={(e) => setFormData({ ...formData, goalWeight: e.target.value })}
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium mb-3">Primary Concern</Label>
                    <RadioGroup
                      value={formData.primaryConcern}
                      onValueChange={(v) => setFormData({ ...formData, primaryConcern: v })}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    >
                      {concerns.map((c) => (
                        <div key={c.value} className="flex items-center space-x-3 p-3 rounded-lg border border-warm-stone/20 hover:border-warm-stone/40 transition-colors">
                          <RadioGroupItem value={c.value} id={`concern-${c.value}`} />
                          <Label htmlFor={`concern-${c.value}`} className="cursor-pointer flex-1">{c.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Email (to receive your forecast)</Label>
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

                  <Button
                    onClick={handleGenerate}
                    disabled={!formData.treatment || !formData.email || isGenerating}
                    className="w-full h-12 sm:h-11 bg-warm-stone hover:bg-warm-stone/90"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Forecast...
                      </>
                    ) : (
                      <>
                        See My Predictions
                        <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
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
                    <TrendingUp className="h-6 w-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-pure-white">{predictions?.title}</h2>
                    <p className="text-sm text-warm-gray">Based on similar patient outcomes</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <h3 className="text-[#C9A962] font-display text-lg font-semibold mb-4">Your Expected Timeline</h3>
                  <div className="space-y-4">
                    {predictions?.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 text-[#C9A962] font-bold text-sm">
                            {index + 1}
                          </div>
                          {index < predictions.timeline.length - 1 && (
                            <div className="w-px h-full bg-warm-stone/30 my-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold text-[#C9A962]">{item.week}</span>
                            <span className="text-pure-white font-semibold">{item.milestone}</span>
                            <span className="text-xs text-warm-gray bg-warm-stone/20 px-2 py-0.5 rounded-full">
                              {item.confidence}% confidence
                            </span>
                          </div>
                          <p className="text-sm text-warm-gray">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-8">
                  <h3 className="text-[#C9A962] font-display text-lg font-semibold mb-4">Expected Improvements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {predictions?.metrics.map((metric: any, index: number) => (
                      <div key={index} className="bg-deep-charcoal/50 rounded-xl p-4 border border-warm-stone/20 text-center">
                        <p className="text-xs text-warm-gray mb-2">{metric.label}</p>
                        <p className="text-xs text-warm-gray line-through">{metric.before}</p>
                        <p className="text-lg font-bold text-pure-white">{metric.after}</p>
                        <p className="text-xs text-[#C9A962] font-semibold">{metric.improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Factors */}
                <div className="bg-deep-charcoal/50 rounded-xl p-4 border border-warm-stone/20">
                  <h4 className="text-pure-white font-semibold mb-3">Factors That Influence Your Results</h4>
                  <ul className="space-y-2">
                    {predictions?.factors.map((factor: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-warm-gray">
                        <span className="text-[#C9A962]">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-warm-gray mt-6 text-center">
                  These predictions are based on average patient outcomes. Individual results vary based on compliance, lifestyle, and physiology.
                </p>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-bold text-rich-black mb-2">
                  Ready to Start Your Transformation?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our physicians will create a personalized treatment plan to help you achieve these results.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/intake">
                    <Button className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                      Begin Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => { setStep(1); setPredictions(null); }}>
                    Try Different Treatment
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

export default ProgressPredictor;
