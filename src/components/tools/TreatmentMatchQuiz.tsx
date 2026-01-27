import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
interface Option {
  value: string;
  label: string;
  icon: string;
  treatments?: string[];
}

interface Question {
  id: string;
  question: string;
  type: 'single' | 'multi';
  condition?: (answers: Record<string, any>) => boolean;
  options: Option[];
}

interface Treatment {
  name: string;
  shortName: string;
  icon: string;
  description: string;
  benefits: string[];
  price: string;
  timeline: string;
  ideal: string;
}

interface Recommendation extends Treatment {
  key: string;
  matchScore: number;
}

interface Results {
  recommendations: Recommendation[];
  answers: Record<string, any>;
  insights: string[];
}

const TreatmentMatchQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const questions: Question[] = [
    {
      id: 'primary_goal',
      question: 'What is your primary health goal?',
      type: 'single',
      options: [
        { value: 'energy', label: 'Increase energy & vitality', icon: '⚡', treatments: ['trt', 'peptides', 'nad'] },
        { value: 'weight', label: 'Lose weight & improve body composition', icon: '⚖️', treatments: ['glp1', 'trt', 'peptides'] },
        { value: 'muscle', label: 'Build muscle & strength', icon: '💪', treatments: ['trt', 'peptides'] },
        { value: 'mental', label: 'Improve focus & mental clarity', icon: '🧠', treatments: ['trt', 'nad', 'peptides'] },
        { value: 'libido', label: 'Enhance sexual health & libido', icon: '❤️', treatments: ['trt', 'pt141'] },
        { value: 'aging', label: 'Anti-aging & longevity', icon: '✨', treatments: ['peptides', 'nad', 'trt'] },
        { value: 'hair', label: 'Prevent/reverse hair loss', icon: '💇', treatments: ['hair'] }
      ]
    },
    {
      id: 'secondary_goals',
      question: 'Select any additional goals (optional)',
      type: 'multi',
      options: [
        { value: 'sleep', label: 'Better sleep quality', icon: '😴', treatments: ['peptides', 'trt'] },
        { value: 'recovery', label: 'Faster workout recovery', icon: '🔄', treatments: ['peptides', 'trt'] },
        { value: 'mood', label: 'Stabilize mood', icon: '😊', treatments: ['trt', 'nad'] },
        { value: 'stress', label: 'Reduce stress/anxiety', icon: '🧘', treatments: ['nad', 'peptides'] },
        { value: 'endurance', label: 'Improve endurance', icon: '🏃', treatments: ['peptides', 'trt'] }
      ]
    },
    {
      id: 'weight_goal',
      question: 'How much weight would you like to lose?',
      type: 'single',
      condition: (answers) => answers.primary_goal === 'weight',
      options: [
        { value: 'none', label: 'Not focused on weight loss', icon: '✓' },
        { value: 'mild', label: '10-20 lbs', icon: '📉' },
        { value: 'moderate', label: '20-40 lbs', icon: '📉' },
        { value: 'significant', label: '40+ lbs', icon: '📉' }
      ]
    },
    {
      id: 'age_range',
      question: 'What is your age range?',
      type: 'single',
      options: [
        { value: '25-34', label: '25-34', icon: '👤' },
        { value: '35-44', label: '35-44', icon: '👤' },
        { value: '45-54', label: '45-54', icon: '👤' },
        { value: '55-64', label: '55-64', icon: '👤' },
        { value: '65+', label: '65+', icon: '👤' }
      ]
    },
    {
      id: 'activity_level',
      question: 'How would you describe your activity level?',
      type: 'single',
      options: [
        { value: 'sedentary', label: 'Sedentary - Little to no exercise', icon: '🪑' },
        { value: 'light', label: 'Light - 1-2 days per week', icon: '🚶' },
        { value: 'moderate', label: 'Moderate - 3-4 days per week', icon: '🏋️' },
        { value: 'active', label: 'Very Active - 5+ days per week', icon: '💪' }
      ]
    },
    {
      id: 'previous_treatments',
      question: 'Have you tried any of these before?',
      type: 'multi',
      options: [
        { value: 'none', label: 'None of these', icon: '✗' },
        { value: 'trt', label: 'Testosterone therapy', icon: '💉' },
        { value: 'weight_loss_meds', label: 'Weight loss medications', icon: '💊' },
        { value: 'peptides', label: 'Peptide therapy', icon: '🧬' },
        { value: 'supplements', label: 'Hormone supplements (OTC)', icon: '🥤' }
      ]
    },
    {
      id: 'timeline',
      question: 'How soon are you looking to start treatment?',
      type: 'single',
      options: [
        { value: 'asap', label: 'As soon as possible', icon: '🚀' },
        { value: 'month', label: 'Within the next month', icon: '📅' },
        { value: 'exploring', label: 'Just exploring options', icon: '🔍' }
      ]
    },
    {
      id: 'budget',
      question: 'What is your monthly budget for treatment?',
      type: 'single',
      options: [
        { value: 'flexible', label: '$300+ - Flexible budget', icon: '💎' },
        { value: 'moderate', label: '$150-300 per month', icon: '💰' },
        { value: 'budget', label: 'Under $150 per month', icon: '💵' }
      ]
    }
  ];

  const treatments: Record<string, Treatment> = {
    trt: {
      name: 'Testosterone Replacement Therapy',
      shortName: 'TRT',
      icon: '💉',
      description: 'Restore optimal testosterone levels to improve energy, strength, mood, and sexual health.',
      benefits: ['Increased energy', 'Better mood', 'Improved libido', 'Muscle growth', 'Fat loss'],
      price: '$149-199/month',
      timeline: 'Results in 4-6 weeks',
      ideal: 'Men with low T symptoms'
    },
    glp1: {
      name: 'GLP-1 Weight Loss (Semaglutide/Tirzepatide)',
      shortName: 'GLP-1',
      icon: '💊',
      description: 'FDA-approved medications that reduce appetite and help you lose significant weight safely.',
      benefits: ['15-20% body weight loss', 'Reduced appetite', 'Better blood sugar', 'Cardiovascular benefits'],
      price: '$299-449/month',
      timeline: 'Noticeable results in 4-8 weeks',
      ideal: 'Men looking to lose 20+ lbs'
    },
    peptides: {
      name: 'Peptide Therapy',
      shortName: 'Peptides',
      icon: '🧬',
      description: 'Targeted peptides for growth hormone optimization, recovery, healing, and anti-aging.',
      benefits: ['Better sleep', 'Faster recovery', 'Increased GH', 'Anti-aging', 'Tissue repair'],
      price: '$199-349/month',
      timeline: 'Results in 4-12 weeks',
      ideal: 'Men focused on optimization & longevity'
    },
    nad: {
      name: 'NAD+ Therapy',
      shortName: 'NAD+',
      icon: '⚡',
      description: 'Cellular energy optimization for mental clarity, energy, and longevity.',
      benefits: ['Mental clarity', 'Sustained energy', 'Anti-aging', 'Cellular repair'],
      price: '$199-299/month',
      timeline: 'Effects felt within 1-2 weeks',
      ideal: 'Men seeking cognitive enhancement'
    },
    hair: {
      name: 'Hair Restoration Protocol',
      shortName: 'Hair Growth',
      icon: '💇',
      description: 'Comprehensive approach to stop hair loss and promote regrowth.',
      benefits: ['Stop hair loss', 'Regrow thinning areas', 'Strengthen existing hair'],
      price: '$79-149/month',
      timeline: 'Visible results in 3-6 months',
      ideal: 'Men experiencing hair thinning/loss'
    },
    pt141: {
      name: 'PT-141 (Bremelanotide)',
      shortName: 'PT-141',
      icon: '❤️',
      description: 'Peptide therapy specifically for enhancing sexual desire and performance.',
      benefits: ['Increased libido', 'Enhanced arousal', 'Improved performance'],
      price: '$149-199/month',
      timeline: 'Effects within hours of use',
      ideal: 'Men seeking libido enhancement'
    }
  };

  const activeQuestions = questions.filter(q => {
    if (!q.condition) return true;
    return q.condition(answers);
  });

  const totalSteps = activeQuestions.length;
  const currentQuestion = activeQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleSingleSelect = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setShowEmailCapture(true);
      }
    }, 300);
  };

  const handleMultiSelect = (value: string) => {
    setAnswers(prev => {
      const current = prev[currentQuestion.id] || [];
      if (value === 'none') {
        return { ...prev, [currentQuestion.id]: ['none'] };
      }
      const filtered = current.filter((v: string) => v !== 'none');
      if (filtered.includes(value)) {
        return { ...prev, [currentQuestion.id]: filtered.filter((v: string) => v !== value) };
      }
      return { ...prev, [currentQuestion.id]: [...filtered, value] };
    });
  };

  const handleMultiContinue = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowEmailCapture(true);
    }
  };

  const syncToHealthie = async (resultsData: Results) => {
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
            tool_type: 'treatment_match',
            tool_results: {
              primary_goal: answers.primary_goal,
              age_range: answers.age_range,
              activity_level: answers.activity_level,
              budget: answers.budget,
              recommendations: resultsData.recommendations.map(r => ({
                name: r.name,
                matchScore: r.matchScore
              })),
              insights: resultsData.insights
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
    setIsSyncing(true);
    await analyzeResults();
  };

  const analyzeResults = async () => {
    const treatmentScores: Record<string, number> = {};
    Object.keys(treatments).forEach(t => treatmentScores[t] = 0);

    const primaryGoal = answers.primary_goal;
    const primaryOption = questions[0].options.find(o => o.value === primaryGoal);
    if (primaryOption?.treatments) {
      primaryOption.treatments.forEach((t, i) => {
        treatmentScores[t] += (3 - i) * 10;
      });
    }

    const secondaryGoals = answers.secondary_goals || [];
    secondaryGoals.forEach((goal: string) => {
      const option = questions[1].options.find(o => o.value === goal);
      if (option?.treatments) {
        option.treatments.forEach((t, i) => {
          treatmentScores[t] += (2 - i) * 3;
        });
      }
    });

    if (answers.weight_goal === 'significant') {
      treatmentScores.glp1 += 25;
    } else if (answers.weight_goal === 'moderate') {
      treatmentScores.glp1 += 15;
    }

    if (answers.budget === 'budget') {
      treatmentScores.hair += 5;
      treatmentScores.glp1 -= 10;
    }

    const sortedTreatments: Recommendation[] = Object.entries(treatmentScores)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .slice(0, 3)
      .map(([key, score]) => ({
        ...treatments[key],
        key,
        matchScore: Math.min(98, 70 + Math.floor(score / 3))
      }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    const resultsData: Results = {
      recommendations: sortedTreatments,
      answers,
      insights: generateInsights(answers)
    };

    // Sync to Healthie
    await syncToHealthie(resultsData);

    setResults(resultsData);
    setIsAnalyzing(false);
    setIsSyncing(false);
  };

  const generateInsights = (answers: Record<string, any>): string[] => {
    const insights: string[] = [];
    
    if (answers.primary_goal === 'weight' && answers.weight_goal !== 'none') {
      insights.push('GLP-1 medications like Semaglutide can help you achieve sustainable weight loss of 15-20% of body weight.');
    }
    
    if (answers.primary_goal === 'energy' || answers.secondary_goals?.includes('sleep')) {
      insights.push('Optimizing testosterone and sleep quality work synergistically to dramatically improve daily energy levels.');
    }
    
    if (answers.activity_level === 'active') {
      insights.push('Your active lifestyle means you\'ll likely see faster and more pronounced results from hormone optimization.');
    }
    
    if (answers.age_range === '45-54' || answers.age_range === '55-64') {
      insights.push('Men in your age group often see the most dramatic improvements from hormone optimization therapy.');
    }

    return insights;
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setIsAnalyzing(false);
    setEmail('');
    setShowEmailCapture(false);
    setIsSyncing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      <div className="max-w-[800px] mx-auto px-6 py-10">
        
        {/* Email Capture */}
        {showEmailCapture && !isAnalyzing && !results && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-warm-stone/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🎯
            </div>
            <h2 className="font-display text-3xl font-bold text-rich-black mb-3">
              Your Matches Are Ready
            </h2>
            <p className="text-warm-stone mb-8">
              Enter your email to receive your personalized treatment recommendations.
            </p>
            <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto space-y-4">
              <input
                type="email"
                className="w-full px-5 py-4 border-2 border-warm-stone/30 rounded-xl text-base focus:outline-none focus:border-warm-stone focus:ring-4 focus:ring-warm-stone/10 transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-br from-warm-stone to-deep-charcoal text-white rounded-xl font-semibold hover:translate-y-[-2px] hover:shadow-xl transition-all"
              >
                Get My Recommendations →
              </button>
            </form>
            <p className="text-xs text-warm-stone mt-4">
              🔒 Your information is secure and HIPAA-compliant. We never share your data.
            </p>
          </div>
        )}

        {!showEmailCapture && !isAnalyzing && !results && (
          <>
            {/* Header */}
            <header className="text-center mb-12">
              <div className="w-[72px] h-[72px] bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg">
                🎯
              </div>
              <h1 className="font-display text-4xl font-bold mb-3">Find Your Treatment Match</h1>
              <p className="text-lg text-warm-stone">Answer a few questions and we'll recommend the best treatments for your goals.</p>
            </header>

            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between text-sm text-warm-stone mb-3">
                <span>Question {currentStep + 1} of {totalSteps}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-1.5 bg-warm-stone/20 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-warm-stone to-deep-charcoal rounded-full transition-all duration-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-[20px] p-12 shadow-lg border border-warm-stone/20">
              <h2 className="font-display text-2xl font-semibold mb-9 text-center">{currentQuestion.question}</h2>
              
              <div className={`grid gap-4 ${currentQuestion.options.length <= 4 ? 'max-w-[500px] mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {currentQuestion.options.map((option) => {
                  const isSelected = currentQuestion.type === 'multi'
                    ? (answers[currentQuestion.id] || []).includes(option.value)
                    : answers[currentQuestion.id] === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      className={`flex items-center gap-4 p-5 rounded-[14px] border-2 transition-all text-left ${
                        isSelected
                          ? 'bg-deep-charcoal border-deep-charcoal text-white'
                          : 'bg-soft-linen border-transparent hover:border-warm-stone hover:translate-y-[-2px] hover:shadow-lg'
                      }`}
                      onClick={() => currentQuestion.type === 'multi' 
                        ? handleMultiSelect(option.value)
                        : handleSingleSelect(option.value)
                      }
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                        isSelected ? 'bg-white/15' : 'bg-warm-stone/10'
                      }`}>
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.label}</span>
                      {currentQuestion.type === 'multi' && (
                        <div className={`ml-auto w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected ? 'bg-warm-stone border-warm-stone text-white' : 'border-warm-stone/30'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {currentQuestion.type === 'multi' && (
                <button
                  className="block w-full max-w-[300px] mx-auto mt-8 py-4 bg-gradient-to-br from-warm-stone to-deep-charcoal text-white rounded-xl font-semibold hover:translate-y-[-2px] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleMultiContinue}
                  disabled={!answers[currentQuestion.id]?.length}
                >
                  Continue →
                </button>
              )}
            </div>

            <button
              className="flex items-center gap-2 mt-6 px-5 py-3 border-2 border-warm-stone/30 rounded-xl text-sm font-medium text-warm-stone hover:border-warm-stone transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
            >
              ← Back
            </button>
          </>
        )}

        {/* Analyzing */}
        {isAnalyzing && (
          <div className="text-center py-24">
            <div className="w-20 h-20 border-[5px] border-warm-stone/30 border-t-warm-stone rounded-full animate-spin mx-auto mb-8" />
            <h2 className="font-display text-3xl font-semibold mb-3">Finding Your Perfect Match</h2>
            <p className="text-warm-stone">Analyzing your goals and preferences...</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="animate-fadeIn">
            <header className="text-center mb-10">
              <h1 className="font-display text-3xl font-bold mb-3">Your Personalized Recommendations</h1>
              <p className="text-lg text-warm-stone">Based on your goals, here are the treatments we recommend:</p>
            </header>

            {/* Recommendation Cards */}
            <div className="space-y-5">
              {results.recommendations.map((rec, index) => (
                <div
                  key={rec.key}
                  className={`bg-white rounded-[20px] p-8 shadow-lg border relative overflow-hidden ${
                    index === 0 ? 'border-2 border-warm-stone' : 'border-warm-stone/20'
                  }`}
                >
                  <div className={`absolute top-5 right-5 px-4 py-2 rounded-full text-xs font-bold text-white ${
                    index === 0 ? 'bg-green-500' : 'bg-gradient-to-r from-warm-stone to-deep-charcoal'
                  }`}>
                    {rec.matchScore}% Match
                  </div>
                  
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-16 h-16 bg-soft-linen rounded-2xl flex items-center justify-center text-3xl">
                      {rec.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">{rec.name}</h3>
                      <p className="text-warm-stone font-medium">{rec.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-warm-stone mb-5 leading-relaxed">{rec.description}</p>
                  
                  <div className="flex flex-wrap gap-2.5 mb-5">
                    {rec.benefits.map((benefit, i) => (
                      <span key={i} className="flex items-center gap-1.5 px-3.5 py-2 bg-soft-linen rounded-full text-sm font-medium">
                        <span className="text-green-500 font-bold">✓</span>
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-6 pt-5 border-t border-warm-stone/20 text-sm text-warm-stone">
                    <span className="flex items-center gap-1.5">⏱️ {rec.timeline}</span>
                    <span className="flex items-center gap-1.5">👤 {rec.ideal}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insights */}
            {results.insights.length > 0 && (
              <div className="bg-soft-linen rounded-2xl p-7 mt-8">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2.5">
                  💡 Personalized Insights
                </h3>
                <div className="space-y-3">
                  {results.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 py-3 border-b border-warm-stone/20 last:border-0">
                      <div className="w-6 h-6 bg-warm-stone text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-deep-charcoal leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-deep-charcoal to-rich-black rounded-[20px] p-12 text-center text-white mt-8">
              <h2 className="font-display text-3xl font-bold mb-3">Ready to Get Started?</h2>
              <p className="text-white/85 mb-7 leading-relaxed">
                Schedule a free consultation with one of our Texas-licensed physicians to discuss your personalized treatment plan.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="/intake" className="px-9 py-4 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 hover:translate-y-[-2px] transition-all">
                  Start Free Consultation
                </a>
                <button onClick={resetQuiz} className="px-9 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white transition-all">
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TreatmentMatchQuiz;
