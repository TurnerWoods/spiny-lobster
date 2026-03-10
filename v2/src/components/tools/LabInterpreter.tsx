import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  FlaskConical,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Stethoscope,
  Mail,
  Loader2,
  Info,
  HelpCircle
} from 'lucide-react';

// Types
interface LabMarker {
  id: string;
  name: string;
  fullName: string;
  unit: string;
  category: string;
  referenceRange: { min: number; max: number };
  optimalRange: { min: number; max: number };
  description: string;
  placeholder: string;
}

interface MarkerResult {
  marker: string;
  value: number;
  unit: string;
  status: 'low' | 'optimal' | 'high' | 'reference';
  interpretation: string;
  optimizationTips: string[];
}

interface AIAnalysis {
  summary: string;
  markers: MarkerResult[];
  patterns: string[];
  questionsForDoctor: string[];
  nextSteps: string[];
}

// Lab markers configuration
const labMarkers: LabMarker[] = [
  // Hormones
  {
    id: 'total_t',
    name: 'Total Testosterone',
    fullName: 'Total Testosterone',
    unit: 'ng/dL',
    category: 'Hormones',
    referenceRange: { min: 264, max: 916 },
    optimalRange: { min: 500, max: 800 },
    description: 'Primary male sex hormone affecting energy, mood, and muscle',
    placeholder: '300-900'
  },
  {
    id: 'free_t',
    name: 'Free Testosterone',
    fullName: 'Free Testosterone',
    unit: 'pg/mL',
    category: 'Hormones',
    referenceRange: { min: 9.3, max: 26.5 },
    optimalRange: { min: 15, max: 25 },
    description: 'Bioavailable testosterone not bound to proteins',
    placeholder: '9-27'
  },
  {
    id: 'shbg',
    name: 'SHBG',
    fullName: 'Sex Hormone Binding Globulin',
    unit: 'nmol/L',
    category: 'Hormones',
    referenceRange: { min: 16.5, max: 55.9 },
    optimalRange: { min: 20, max: 45 },
    description: 'Protein that binds to testosterone',
    placeholder: '15-60'
  },
  {
    id: 'estradiol',
    name: 'Estradiol (E2)',
    fullName: 'Estradiol',
    unit: 'pg/mL',
    category: 'Hormones',
    referenceRange: { min: 8, max: 35 },
    optimalRange: { min: 20, max: 30 },
    description: 'Primary estrogen - balance is key for men',
    placeholder: '10-40'
  },
  // Metabolic
  {
    id: 'glucose',
    name: 'Fasting Glucose',
    fullName: 'Fasting Blood Glucose',
    unit: 'mg/dL',
    category: 'Metabolic',
    referenceRange: { min: 70, max: 99 },
    optimalRange: { min: 70, max: 90 },
    description: 'Blood sugar level after fasting',
    placeholder: '70-100'
  },
  {
    id: 'hba1c',
    name: 'HbA1c',
    fullName: 'Hemoglobin A1c',
    unit: '%',
    category: 'Metabolic',
    referenceRange: { min: 4.0, max: 5.6 },
    optimalRange: { min: 4.5, max: 5.2 },
    description: '3-month average blood sugar indicator',
    placeholder: '4.0-6.0'
  },
  {
    id: 'insulin',
    name: 'Fasting Insulin',
    fullName: 'Fasting Insulin',
    unit: 'uIU/mL',
    category: 'Metabolic',
    referenceRange: { min: 2.6, max: 24.9 },
    optimalRange: { min: 2.5, max: 8 },
    description: 'Hormone that regulates blood sugar',
    placeholder: '2-25'
  },
  // Lipids
  {
    id: 'total_chol',
    name: 'Total Cholesterol',
    fullName: 'Total Cholesterol',
    unit: 'mg/dL',
    category: 'Lipids',
    referenceRange: { min: 0, max: 200 },
    optimalRange: { min: 150, max: 200 },
    description: 'Total blood cholesterol level',
    placeholder: '100-250'
  },
  {
    id: 'ldl',
    name: 'LDL',
    fullName: 'Low-Density Lipoprotein',
    unit: 'mg/dL',
    category: 'Lipids',
    referenceRange: { min: 0, max: 100 },
    optimalRange: { min: 50, max: 80 },
    description: '"Bad" cholesterol - lower is generally better',
    placeholder: '50-130'
  },
  {
    id: 'hdl',
    name: 'HDL',
    fullName: 'High-Density Lipoprotein',
    unit: 'mg/dL',
    category: 'Lipids',
    referenceRange: { min: 40, max: 999 },
    optimalRange: { min: 50, max: 80 },
    description: '"Good" cholesterol - higher is better',
    placeholder: '40-80'
  },
  {
    id: 'triglycerides',
    name: 'Triglycerides',
    fullName: 'Triglycerides',
    unit: 'mg/dL',
    category: 'Lipids',
    referenceRange: { min: 0, max: 150 },
    optimalRange: { min: 50, max: 100 },
    description: 'Fat in the blood - affected by diet',
    placeholder: '50-200'
  },
  // Thyroid
  {
    id: 'tsh',
    name: 'TSH',
    fullName: 'Thyroid Stimulating Hormone',
    unit: 'mIU/L',
    category: 'Thyroid',
    referenceRange: { min: 0.4, max: 4.0 },
    optimalRange: { min: 1.0, max: 2.5 },
    description: 'Controls thyroid function and metabolism',
    placeholder: '0.5-4.5'
  },
  // Inflammation
  {
    id: 'hscrp',
    name: 'hs-CRP',
    fullName: 'High-Sensitivity C-Reactive Protein',
    unit: 'mg/L',
    category: 'Inflammation',
    referenceRange: { min: 0, max: 3.0 },
    optimalRange: { min: 0, max: 1.0 },
    description: 'Marker of systemic inflammation',
    placeholder: '0-3'
  },
  // Nutrients
  {
    id: 'vitamin_d',
    name: 'Vitamin D',
    fullName: '25-Hydroxy Vitamin D',
    unit: 'ng/mL',
    category: 'Nutrients',
    referenceRange: { min: 30, max: 100 },
    optimalRange: { min: 50, max: 80 },
    description: 'Essential for hormone production and immunity',
    placeholder: '20-80'
  },
  {
    id: 'b12',
    name: 'Vitamin B12',
    fullName: 'Vitamin B12',
    unit: 'pg/mL',
    category: 'Nutrients',
    referenceRange: { min: 211, max: 946 },
    optimalRange: { min: 500, max: 800 },
    description: 'Essential for energy and nerve function',
    placeholder: '200-1000'
  },
  // Blood Health
  {
    id: 'hematocrit',
    name: 'Hematocrit',
    fullName: 'Hematocrit',
    unit: '%',
    category: 'Blood Health',
    referenceRange: { min: 38.3, max: 48.6 },
    optimalRange: { min: 42, max: 48 },
    description: 'Percentage of red blood cells - important for TRT monitoring',
    placeholder: '38-50'
  },
  {
    id: 'psa',
    name: 'PSA',
    fullName: 'Prostate Specific Antigen',
    unit: 'ng/mL',
    category: 'Blood Health',
    referenceRange: { min: 0, max: 4.0 },
    optimalRange: { min: 0, max: 2.0 },
    description: 'Prostate health marker - important baseline for TRT',
    placeholder: '0-4'
  }
];

// Group markers by category
const categorizedMarkers = labMarkers.reduce((acc, marker) => {
  if (!acc[marker.category]) {
    acc[marker.category] = [];
  }
  acc[marker.category].push(marker);
  return acc;
}, {} as Record<string, LabMarker[]>);

const categoryOrder = ['Hormones', 'Metabolic', 'Lipids', 'Thyroid', 'Inflammation', 'Nutrients', 'Blood Health'];

const LabInterpreter: React.FC = () => {
  const [labValues, setLabValues] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string>('Hormones');

  const handleValueChange = (markerId: string, value: string) => {
    // Allow only numbers and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setLabValues(prev => ({
        ...prev,
        [markerId]: value
      }));
    }
  };

  const getFilledMarkersCount = () => {
    return Object.values(labValues).filter(v => v !== '' && v !== undefined).length;
  };

  const handleSubmit = () => {
    const filledCount = getFilledMarkersCount();
    if (filledCount < 2) {
      setError('Please enter at least 2 lab values for analysis.');
      return;
    }
    setError(null);
    setShowEmailCapture(true);
  };

  const syncToHealthie = async (analysisData: AIAnalysis) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables not configured');
        return;
      }

      const response = await fetch(
        `${supabaseUrl}/functions/v1/healthie-sync`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            tool_type: 'lab_interpreter',
            tool_results: {
              lab_values: labValues,
              analysis: analysisData
            }
          })
        }
      );

      if (!response.ok) {
        console.error('Failed to sync to Healthie:', await response.text());
      }
    } catch (error) {
      console.error('Error syncing to Healthie:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call the Claude API edge function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Service not configured');
      }

      // Prepare lab values with full context
      const formattedValues = Object.entries(labValues)
        .filter(([_, value]) => value !== '' && value !== undefined)
        .map(([id, value]) => {
          const marker = labMarkers.find(m => m.id === id);
          return {
            name: marker?.fullName || id,
            value: parseFloat(value),
            unit: marker?.unit || '',
            referenceRange: marker?.referenceRange,
            optimalRange: marker?.optimalRange
          };
        });

      const response = await fetch(
        `${supabaseUrl}/functions/v1/lab-interpreter`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            labValues: formattedValues
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to analyze lab results');
      }

      const analysisResult = await response.json();

      // Sync to Healthie
      await syncToHealthie(analysisResult);

      setAnalysis(analysisResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze results. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low':
        return <TrendingDown className="h-5 w-5 text-amber-500" />;
      case 'high':
        return <TrendingUp className="h-5 w-5 text-red-500" />;
      case 'optimal':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'optimal':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const resetForm = () => {
    setLabValues({});
    setEmail('');
    setShowEmailCapture(false);
    setAnalysis(null);
    setError(null);
    setExpandedCategory('Hormones');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <header className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-warm-stone/10 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-warm-stone mb-5"
          >
            <FlaskConical className="h-4 w-4" />
            <span>AI Lab Interpreter</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-rich-black mb-3"
          >
            Understand Your Lab Results
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-warm-stone max-w-2xl mx-auto"
          >
            Enter your lab values and our AI will provide personalized interpretations,
            identify patterns, and generate questions to ask your physician.
          </motion.p>
        </header>

        {/* Email Capture */}
        <AnimatePresence mode="wait">
          {showEmailCapture && !isAnalyzing && !analysis && (
            <motion.div
              key="email-capture"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-warm-stone/20 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
                <FlaskConical className="h-10 w-10 text-white" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-rich-black mb-3">
                Your Analysis Is Ready
              </h2>
              <p className="text-warm-stone mb-8 max-w-md mx-auto">
                Enter your email to receive your personalized lab interpretation from Dr. Chen, our AI health advisor.
              </p>
              <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-stone/50" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-5 py-4 border-2 border-warm-stone/30 rounded-xl text-base focus:outline-none focus:border-warm-stone focus:ring-4 focus:ring-warm-stone/10 transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-br from-warm-stone to-deep-charcoal text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all"
                >
                  Get My Interpretation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <button
                onClick={() => setShowEmailCapture(false)}
                className="mt-4 text-sm text-warm-stone hover:text-deep-charcoal transition-colors"
              >
                ← Go back and edit values
              </button>
              <p className="text-xs text-warm-stone/70 mt-6">
                🔒 Your information is secure and HIPAA-compliant. We never share your data.
              </p>
            </motion.div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Loader2 className="h-16 w-16 text-warm-stone animate-spin mx-auto mb-8" />
              <h2 className="font-display text-2xl font-semibold mb-3">Dr. Chen is Analyzing Your Results</h2>
              <p className="text-warm-stone max-w-md mx-auto">
                Our AI is reviewing your lab values, identifying patterns, and preparing personalized recommendations...
              </p>
            </motion.div>
          )}

          {/* Results Display */}
          {analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Advisor Header */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-rich-black mb-1">
                      Dr. Chen's Analysis
                    </h2>
                    <p className="text-sm text-warm-stone mb-4">AI Health Advisor • Hormone Optimization Specialist</p>
                    <p className="text-deep-charcoal leading-relaxed">{analysis.summary}</p>
                  </div>
                </div>
              </div>

              {/* Marker Analysis */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-warm-stone" />
                  Marker-by-Marker Analysis
                </h3>
                <div className="space-y-4">
                  {analysis.markers.map((marker, index) => (
                    <motion.div
                      key={marker.marker}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border-2 ${getStatusColor(marker.status)}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(marker.status)}
                          <div>
                            <h4 className="font-semibold">{marker.marker}</h4>
                            <p className="text-sm opacity-80">
                              {marker.value} {marker.unit}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          marker.status === 'optimal' ? 'bg-green-100 text-green-700' :
                          marker.status === 'low' ? 'bg-amber-100 text-amber-700' :
                          marker.status === 'high' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {marker.status}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{marker.interpretation}</p>
                      {marker.optimizationTips.length > 0 && (
                        <div className="pt-3 border-t border-current/10">
                          <p className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-70">
                            Optimization Tips
                          </p>
                          <ul className="text-sm space-y-1">
                            {marker.optimizationTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 mt-0.5">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Patterns Identified */}
              {analysis.patterns.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Patterns Identified
                  </h3>
                  <div className="space-y-3">
                    {analysis.patterns.map((pattern, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200"
                      >
                        <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-amber-900">{pattern}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions for Your Doctor */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-warm-stone" />
                  Questions for Your Doctor
                </h3>
                <ul className="space-y-3">
                  {analysis.questionsForDoctor.map((question, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-4 bg-soft-linen rounded-xl"
                    >
                      <span className="w-6 h-6 bg-warm-stone text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-deep-charcoal">{question}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                <h3 className="font-display text-lg font-semibold mb-4">Recommended Next Steps</h3>
                <div className="space-y-3">
                  {analysis.nextSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-green-900">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-warm-stone/10 rounded-xl p-6 text-center">
                <p className="text-sm text-warm-stone">
                  <strong>Disclaimer:</strong> This AI-generated interpretation is for educational purposes only
                  and should not replace professional medical advice. Always consult with your healthcare provider
                  about your lab results and treatment options.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-deep-charcoal to-rich-black rounded-2xl p-8 sm:p-12 text-center text-white">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  Ready to Optimize Your Health?
                </h2>
                <p className="text-white/80 mb-8 max-w-lg mx-auto">
                  Schedule a consultation with one of our Texas-licensed physicians
                  to discuss your results and explore personalized treatment options.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a
                    href="/intake"
                    className="px-8 py-4 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 transition-all"
                  >
                    Start Free Assessment
                  </a>
                  <button
                    onClick={resetForm}
                    className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all"
                  >
                    Analyze New Labs
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Lab Value Input Form */}
          {!showEmailCapture && !isAnalyzing && !analysis && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Instructions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warm-stone/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Info className="h-6 w-6 text-warm-stone" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rich-black mb-1">How to Use This Tool</h3>
                    <p className="text-sm text-warm-stone">
                      Enter your lab values from a recent blood test. You don't need to fill in every field —
                      just add the values you have. We recommend at least 2-3 markers for a meaningful analysis.
                      Click on each category to expand and enter values.
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Accordion */}
              <div className="space-y-4">
                {categoryOrder.map((category) => {
                  const markers = categorizedMarkers[category];
                  if (!markers) return null;

                  const filledInCategory = markers.filter(m => labValues[m.id] && labValues[m.id] !== '').length;
                  const isExpanded = expandedCategory === category;

                  return (
                    <div
                      key={category}
                      className="bg-white rounded-2xl shadow-lg border border-warm-stone/20 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? '' : category)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-soft-linen/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <h3 className="font-display font-semibold text-rich-black">{category}</h3>
                          {filledInCategory > 0 && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              {filledInCategory} filled
                            </span>
                          )}
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-5 w-5 text-warm-stone rotate-90" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 space-y-4 border-t border-warm-stone/10 pt-4">
                              {markers.map((marker) => (
                                <div key={marker.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                                  <div>
                                    <label
                                      htmlFor={marker.id}
                                      className="block text-sm font-semibold text-rich-black mb-1"
                                    >
                                      {marker.name}
                                    </label>
                                    <p className="text-xs text-warm-stone">
                                      {marker.description}
                                    </p>
                                    <p className="text-xs text-warm-stone/70 mt-1">
                                      Reference: {marker.referenceRange.min}-{marker.referenceRange.max} {marker.unit}
                                    </p>
                                  </div>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      id={marker.id}
                                      value={labValues[marker.id] || ''}
                                      onChange={(e) => handleValueChange(marker.id, e.target.value)}
                                      placeholder={marker.placeholder}
                                      className="w-full px-4 py-3 pr-16 border-2 border-warm-stone/20 rounded-xl text-base focus:outline-none focus:border-warm-stone focus:ring-4 focus:ring-warm-stone/10 transition-all"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-warm-stone/60">
                                      {marker.unit}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-3"
                >
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20">
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-rich-black">
                    {getFilledMarkersCount()} of {labMarkers.length} markers entered
                  </p>
                  <p className="text-sm text-warm-stone">
                    Minimum 2 markers required for analysis
                  </p>
                </div>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={getFilledMarkersCount() < 2}
                  className="bg-gradient-to-br from-warm-stone to-deep-charcoal text-white px-8 disabled:opacity-50"
                >
                  Analyze My Labs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default LabInterpreter;
