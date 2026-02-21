import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Utensils, ArrowRight, Sparkles, Loader2, ShoppingCart, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const MealPlanner = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    treatment: "",
    goal: "",
    calories: "",
    dietType: "",
    city: "",
    email: "",
  });

  const treatments = [
    { value: "trt", label: "Testosterone (TRT)", focus: "High protein, healthy fats" },
    { value: "glp1", label: "GLP-1 (Semaglutide/Tirzepatide)", focus: "Protein priority, small portions" },
    { value: "peptides", label: "Peptides (Sermorelin, etc.)", focus: "Fasting windows, low glycemic" },
    { value: "none", label: "No current treatment", focus: "Balanced nutrition" },
  ];

  const goals = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "muscle-gain", label: "Build Muscle" },
    { value: "maintenance", label: "Maintain Weight" },
    { value: "energy", label: "Optimize Energy" },
  ];

  const dietTypes = [
    { value: "standard", label: "No Restrictions" },
    { value: "low-carb", label: "Low Carb / Keto" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "high-protein", label: "High Protein" },
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
            tool: "meal_planner",
            ...formData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMealPlan(data.mealPlan);
      } else {
        setMealPlan(generateFallbackPlan());
      }
    } catch (error) {
      setMealPlan(generateFallbackPlan());
    }
    
    setIsGenerating(false);
    setStep(3);
  };

  const generateFallbackPlan = () => {
    const isGLP1 = formData.treatment === "glp1";
    const isTRT = formData.treatment === "trt";
    
    return `## Your Personalized Meal Plan

**Daily Targets:** ${formData.calories || "2000"} calories | ${isTRT ? "180g" : "150g"} protein | ${isGLP1 ? "80+ oz" : "64+ oz"} water

### Sample Day

**Breakfast (${isGLP1 ? "300" : "450"} cal)**
- ${isGLP1 ? "Greek yogurt parfait with berries and granola" : "3-egg omelet with spinach, cheese, and turkey bacon"}
- ${isTRT ? "Add: avocado for healthy fats" : ""}

**Lunch (${isGLP1 ? "400" : "550"} cal)**
- ${isGLP1 ? "Grilled chicken salad with light vinaigrette" : "Grilled salmon bowl with quinoa and vegetables"}
- ${isTRT ? "Include: olive oil dressing for testosterone support" : ""}

**Dinner (${isGLP1 ? "400" : "600"} cal)**
- ${isGLP1 ? "4oz lean steak with roasted vegetables" : "8oz ribeye with sweet potato and asparagus"}
- ${formData.city === "austin" ? "Try: Perry's Steakhouse for a quality meal out" : ""}

**Snacks (${isGLP1 ? "200" : "400"} cal)**
- Protein shake (30g protein)
- ${isGLP1 ? "Small handful of almonds" : "Cottage cheese with fruit"}

### ${formData.city ? `Texas Restaurant Guide (${formData.city.charAt(0).toUpperCase() + formData.city.slice(1)})` : "Restaurant Tips"}
${formData.city === "austin" ? "- **Protein-focused:** Perry's Steakhouse, Eddie V's\n- **Healthy options:** True Food Kitchen, Flower Child\n- **Tex-Mex (smart choices):** Torchy's (protein bowl), Freebirds (naked burrito)" : 
formData.city === "houston" ? "- **Protein-focused:** Pappas Bros, Taste of Texas\n- **Healthy options:** Local Foods, Snap Kitchen\n- **Tex-Mex:** El Tiempo (fajitas, skip tortillas)" : 
"- Look for grilled proteins and vegetable sides\n- Ask for sauces on the side\n- Prioritize protein at every meal"}

### H-E-B Shopping List
**Proteins:** Chicken breast, ground turkey, salmon, eggs
**Produce:** Spinach, broccoli, bell peppers, avocados, berries
**Dairy:** Greek yogurt, cottage cheese, cheese
**Pantry:** Olive oil, quinoa, oats, almonds

${isGLP1 ? "**GLP-1 Tip:** Eat slowly, stop when satisfied. Small portions are your friend on this medication." : ""}
${isTRT ? "**TRT Tip:** Include zinc-rich foods (beef, oysters) and healthy fats for optimal hormone production." : ""}`;
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
              <Utensils className="h-9 w-9 text-[#C9A962]" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 mb-4">
            <Sparkles className="h-3 w-3 text-[#C9A962]" />
            <span className="text-xs font-semibold text-[#C9A962]">AI Nutrition by Chef Antonio</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-rich-black mb-4">
            AI Meal <span className="text-warm-stone">Planner</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a personalized meal plan that supports your treatment protocol. 
            Includes Texas restaurant recommendations and H-E-B shopping lists.
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
                    <h2 className="font-display text-xl font-bold text-rich-black">Tell us about your treatment</h2>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Current Treatment Protocol</Label>
                      <RadioGroup
                        value={formData.treatment}
                        onValueChange={(v) => setFormData({ ...formData, treatment: v })}
                        className="grid gap-3"
                      >
                        {treatments.map((t) => (
                          <div key={t.value} className="flex items-center space-x-3">
                            <RadioGroupItem value={t.value} id={t.value} />
                            <Label htmlFor={t.value} className="flex-1 cursor-pointer">
                              <span className="font-medium">{t.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">({t.focus})</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Primary Goal</Label>
                      <RadioGroup
                        value={formData.goal}
                        onValueChange={(v) => setFormData({ ...formData, goal: v })}
                        className="grid grid-cols-2 gap-3"
                      >
                        {goals.map((g) => (
                          <div key={g.value} className="flex items-center space-x-3">
                            <RadioGroupItem value={g.value} id={g.value} />
                            <Label htmlFor={g.value} className="cursor-pointer">{g.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.treatment || !formData.goal}
                      className="w-full bg-warm-stone hover:bg-warm-stone/90"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-xl font-bold text-rich-black">Customize your plan</h2>

                    <div className="space-y-5">
                      <div>
                        <Label>Daily Calorie Target (optional)</Label>
                        <Input
                          type="number"
                          inputMode="numeric"
                          placeholder="e.g., 2000"
                          value={formData.calories}
                          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label className="mb-3">Diet Preference</Label>
                        <RadioGroup
                          value={formData.dietType}
                          onValueChange={(v) => setFormData({ ...formData, dietType: v })}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {dietTypes.map((d) => (
                            <div key={d.value} className="flex items-center space-x-3 p-3 rounded-lg border border-warm-stone/20 hover:border-warm-stone/40 transition-colors">
                              <RadioGroupItem value={d.value} id={d.value} />
                              <Label htmlFor={d.value} className="cursor-pointer flex-1">{d.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div>
                        <Label>Texas City (for restaurant recommendations)</Label>
                        <Input
                          type="text"
                          placeholder="e.g., Austin, Houston, Dallas"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value.toLowerCase() })}
                        />
                      </div>

                      <div>
                        <Label>Email (to receive your meal plan)</Label>
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
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 sm:h-11">
                        Back
                      </Button>
                      <Button
                        onClick={handleGenerate}
                        disabled={!formData.email || isGenerating}
                        className="flex-1 h-12 sm:h-11 bg-warm-stone hover:bg-warm-stone/90"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            Generate Plan
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
                    <Utensils className="h-6 w-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-pure-white">Your Personalized Meal Plan</h2>
                    <p className="text-sm text-warm-gray">by Chef Antonio, Nutrition Expert</p>
                  </div>
                </div>

                <div className="bg-deep-charcoal/50 rounded-xl p-6 border border-warm-stone/20 prose prose-invert max-w-none">
                  <div className="text-pure-white/90 whitespace-pre-line leading-relaxed" dangerouslySetInnerHTML={{ __html: mealPlan?.replace(/## /g, '<h2 class="text-[#C9A962] font-display text-xl font-bold mt-6 mb-3">').replace(/### /g, '<h3 class="text-pure-white font-display text-lg font-semibold mt-4 mb-2">').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#C9A962]">$1</strong>') || "" }} />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <Clock className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Prep Time</p>
                    <p className="font-semibold text-pure-white">~30 min/day</p>
                  </div>
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <ShoppingCart className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Weekly Cost</p>
                    <p className="font-semibold text-pure-white">~$120-150</p>
                  </div>
                  <div className="bg-deep-charcoal/50 rounded-lg p-4 border border-warm-stone/20 text-center">
                    <MapPin className="h-5 w-5 text-[#C9A962] mx-auto mb-2" />
                    <p className="text-xs text-warm-gray">Local Spots</p>
                    <p className="font-semibold text-pure-white">Included</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-bold text-rich-black mb-2">
                  Ready for Complete Support?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get personalized treatment plus ongoing nutrition coaching from our care team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/intake">
                    <Button className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                      Start Treatment Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => { setStep(1); setMealPlan(null); }}>
                    Create New Plan
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

export default MealPlanner;
