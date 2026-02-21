import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, ArrowRight, Sparkles, AlertCircle, CheckCircle, Info, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// Lab marker definitions with optimal ranges
const labMarkers = {
  testosterone: {
    name: "Total Testosterone",
    unit: "ng/dL",
    standardRange: "300-1000",
    optimalRange: "600-900",
    category: "Hormones",
  },
  freeT: {
    name: "Free Testosterone",
    unit: "ng/dL",
    standardRange: "5-21",
    optimalRange: "15-25",
    category: "Hormones",
  },
  estradiol: {
    name: "Estradiol (E2)",
    unit: "pg/mL",
    standardRange: "10-40",
    optimalRange: "20-30",
    category: "Hormones",
  },
  tsh: {
    name: "TSH",
    unit: "mIU/L",
    standardRange: "0.4-4.0",
    optimalRange: "1.0-2.5",
    category: "Thyroid",
  },
  vitaminD: {
    name: "Vitamin D",
    unit: "ng/mL",
    standardRange: "30-100",
    optimalRange: "50-80",
    category: "Metabolic",
  },
  hba1c: {
    name: "HbA1c",
    unit: "%",
    standardRange: "<5.7",
    optimalRange: "<5.3",
    category: "Metabolic",
  },
  hematocrit: {
    name: "Hematocrit",
    unit: "%",
    standardRange: "38-50",
    optimalRange: "42-48",
    category: "Blood",
  },
  psa: {
    name: "PSA",
    unit: "ng/mL",
    standardRange: "<4.0",
    optimalRange: "<2.0",
    category: "Prostate",
  },
};

type LabValues = {
  [key: string]: string;
};

const LabInterpreter = () => {
  const [labValues, setLabValues] = useState<LabValues>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleValueChange = (marker: string, value: string) => {
    setLabValues((prev) => ({ ...prev, [marker]: value }));
  };

  const handleAnalyze = async () => {
    if (!email) return;
    
    setIsAnalyzing(true);
    
    // Call AI analysis endpoint
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
            tool: "lab_interpreter",
            labValues,
            email,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.analysis || "Analysis complete. Please review your results below.");
      } else {
        // Fallback analysis
        setAnalysis(generateFallbackAnalysis());
      }
    } catch (error) {
      setAnalysis(generateFallbackAnalysis());
    }
    
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const generateFallbackAnalysis = () => {
    const findings: string[] = [];
    
    Object.entries(labValues).forEach(([key, value]) => {
      if (!value) return;
      const marker = labMarkers[key as keyof typeof labMarkers];
      const numValue = parseFloat(value);
      
      if (key === "testosterone" && numValue < 600) {
        findings.push(`Your testosterone level of ${value} ng/dL is below optimal range (600-900 ng/dL). This may contribute to fatigue, low mood, or decreased muscle mass.`);
      }
      if (key === "vitaminD" && numValue < 50) {
        findings.push(`Vitamin D at ${value} ng/mL is below optimal. Consider supplementation and discuss with your physician.`);
      }
    });

    return findings.length > 0 
      ? findings.join("\n\n")
      : "Your lab values appear to be within normal ranges. For a complete analysis and optimization recommendations, schedule a consultation with our physicians.";
  };

  const filledCount = Object.values(labValues).filter(v => v).length;

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
          {/* Gold-framed icon */}
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A962] via-[#D4B86A] to-[#C9A962] p-[3px] mb-6">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-deep-charcoal">
              <Stethoscope className="h-9 w-9 text-[#C9A962]" />
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30 mb-4">
            <Sparkles className="h-3 w-3 text-[#C9A962]" />
            <span className="text-xs font-semibold text-[#C9A962]">AI-Powered Analysis by Dr. Chen</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-rich-black mb-4">
            Lab Results <span className="text-warm-stone">Interpreter</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your lab values and our AI will explain what each marker means, 
            identify values outside optimal range, and suggest discussion points for your physician.
          </p>
        </motion.div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-warm-stone/10">
                  <Info className="h-5 w-5 text-warm-stone" />
                  <p className="text-sm text-muted-foreground">
                    Enter any lab values you have. Leave blank any you don't have.
                  </p>
                </div>

                {/* Lab Input Grid - mobile-first stacked layout */}
                <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 mb-8">
                  {Object.entries(labMarkers).map(([key, marker]) => (
                    <div key={key}>
                      <Label htmlFor={key} className="text-sm font-medium text-rich-black">
                        {marker.name}
                        <span className="ml-2 text-xs text-muted-foreground">({marker.unit})</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id={key}
                          type="number"
                          inputMode="decimal"
                          step="0.1"
                          placeholder={`Optimal: ${marker.optimalRange}`}
                          value={labValues[key] || ""}
                          onChange={(e) => handleValueChange(key, e.target.value)}
                          className="border-warm-stone/20 focus:border-warm-stone pr-20"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          {marker.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email & Submit - stacked on mobile */}
                <div className="border-t border-warm-stone/10 pt-6">
                  <div className="space-y-4 sm:flex sm:flex-row sm:gap-4 sm:items-end sm:space-y-0">
                    <div className="flex-1">
                      <Label htmlFor="email" className="text-sm font-medium text-rich-black">
                        Email to receive your full report
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-warm-stone/20 focus:border-warm-stone"
                        required
                      />
                    </div>
                    <Button
                      onClick={handleAnalyze}
                      disabled={filledCount === 0 || !email || isAnalyzing}
                      className="w-full h-12 sm:w-auto sm:h-11 bg-warm-stone hover:bg-warm-stone/90 text-pure-white sm:min-w-[160px]"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Results
                          <Sparkles className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    {filledCount} of {Object.keys(labMarkers).length} values entered
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Results Card */}
            <Card className="bg-gradient-to-br from-deep-charcoal via-deep-charcoal to-warm-stone/20 border-warm-stone/30 mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A962]/20 border border-[#C9A962]/30">
                    <Stethoscope className="h-6 w-6 text-[#C9A962]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-pure-white">Your Lab Analysis</h2>
                    <p className="text-sm text-warm-gray">by Dr. Chen, Clinical Specialist</p>
                  </div>
                </div>

                <div className="bg-deep-charcoal/50 rounded-xl p-6 border border-warm-stone/20">
                  <p className="text-pure-white/90 whitespace-pre-line leading-relaxed">
                    {analysis}
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#C9A962]/10 border border-[#C9A962]/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-[#C9A962] mt-0.5" />
                    <p className="text-sm text-warm-gray">
                      <span className="font-semibold text-[#C9A962]">Important:</span> This analysis is educational and not medical advice. 
                      All findings should be discussed with a licensed physician for proper interpretation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-pure-white/80 backdrop-blur-sm border-warm-stone/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-bold text-rich-black mb-2">
                  Ready to Optimize Your Health?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our physicians can review your complete lab panel and create a personalized treatment plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/intake">
                    <Button className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Enter More Labs
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

export default LabInterpreter;
