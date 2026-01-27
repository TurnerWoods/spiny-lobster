import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Types
interface Question {
  id: string;
  category: string;
  question: string;
  type: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
  score?: number;
}

interface CategoryScores {
  [key: string]: number;
}

interface Results {
  totalScore: number;
  percentage: number;
  riskLevel: string;
  recommendation: string;
  treatments: string[];
  categoryScores: CategoryScores;
  age: string;
}

const HormoneAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const questions: Question[] = [
    {
      id: 'age',
      category: 'Demographics',
      question: 'What is your age?',
      type: 'select',
      options: [
        { value: '25-34', label: '25-34' },
        { value: '35-44', label: '35-44' },
        { value: '45-54', label: '45-54' },
        { value: '55-64', label: '55-64' },
        { value: '65+', label: '65+' }
      ]
    },
    {
      id: 'energy',
      category: 'Energy & Vitality',
      question: 'How would you describe your energy levels throughout the day?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - energized all day', score: 0 },
        { value: 'good', label: 'Good - occasional afternoon slump', score: 1 },
        { value: 'fair', label: 'Fair - frequently tired', score: 2 },
        { value: 'poor', label: 'Poor - exhausted most of the time', score: 3 }
      ]
    },
    {
      id: 'sleep',
      category: 'Energy & Vitality',
      question: 'How is your sleep quality?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - 7-8 hours, wake refreshed', score: 0 },
        { value: 'good', label: 'Good - occasional restlessness', score: 1 },
        { value: 'fair', label: 'Fair - trouble falling/staying asleep', score: 2 },
        { value: 'poor', label: 'Poor - chronic sleep issues', score: 3 }
      ]
    },
    {
      id: 'motivation',
      category: 'Mental Clarity',
      question: 'How would you rate your motivation and drive?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - highly motivated daily', score: 0 },
        { value: 'good', label: 'Good - generally motivated', score: 1 },
        { value: 'fair', label: 'Fair - struggle to stay motivated', score: 2 },
        { value: 'poor', label: 'Poor - lost interest in things I enjoyed', score: 3 }
      ]
    },
    {
      id: 'focus',
      category: 'Mental Clarity',
      question: 'How is your mental focus and concentration?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - sharp and clear', score: 0 },
        { value: 'good', label: 'Good - occasional brain fog', score: 1 },
        { value: 'fair', label: 'Fair - frequently unfocused', score: 2 },
        { value: 'poor', label: 'Poor - constant brain fog', score: 3 }
      ]
    },
    {
      id: 'mood',
      category: 'Mental Clarity',
      question: 'How would you describe your mood stability?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - stable and positive', score: 0 },
        { value: 'good', label: 'Good - occasional irritability', score: 1 },
        { value: 'fair', label: 'Fair - frequent mood swings', score: 2 },
        { value: 'poor', label: 'Poor - depression or anxiety', score: 3 }
      ]
    },
    {
      id: 'libido',
      category: 'Sexual Health',
      question: 'How would you rate your sex drive?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - strong and consistent', score: 0 },
        { value: 'good', label: 'Good - slightly decreased', score: 1 },
        { value: 'fair', label: 'Fair - noticeably reduced', score: 2 },
        { value: 'poor', label: 'Poor - little to no interest', score: 3 }
      ]
    },
    {
      id: 'erections',
      category: 'Sexual Health',
      question: 'How would you describe your morning erections?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - frequent and strong', score: 0 },
        { value: 'good', label: 'Good - regular but less firm', score: 1 },
        { value: 'fair', label: 'Fair - infrequent', score: 2 },
        { value: 'poor', label: 'Poor - rare or absent', score: 3 }
      ]
    },
    {
      id: 'muscle',
      category: 'Physical Performance',
      question: 'Have you noticed changes in muscle mass or strength?',
      type: 'select',
      options: [
        { value: 'no_change', label: 'No change - maintaining well', score: 0 },
        { value: 'slight', label: 'Slight decrease despite exercise', score: 1 },
        { value: 'moderate', label: 'Moderate loss - harder to build', score: 2 },
        { value: 'significant', label: 'Significant loss - noticeably weaker', score: 3 }
      ]
    },
    {
      id: 'bodyfat',
      category: 'Physical Performance',
      question: 'Have you experienced changes in body composition?',
      type: 'select',
      options: [
        { value: 'stable', label: 'Stable - no significant changes', score: 0 },
        { value: 'slight', label: 'Slight increase in belly fat', score: 1 },
        { value: 'moderate', label: 'Moderate increase despite diet/exercise', score: 2 },
        { value: 'significant', label: 'Significant weight gain, especially midsection', score: 3 }
      ]
    },
    {
      id: 'recovery',
      category: 'Physical Performance',
      question: 'How is your recovery after exercise?',
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent - bounce back quickly', score: 0 },
        { value: 'good', label: 'Good - recover within a day or two', score: 1 },
        { value: 'fair', label: 'Fair - prolonged soreness', score: 2 },
        { value: 'poor', label: 'Poor - takes many days to recover', score: 3 }
      ]
    },
    {
      id: 'hair',
      category: 'Other Symptoms',
      question: 'Have you noticed changes in hair growth?',
      type: 'select',
      options: [
        { value: 'no_change', label: 'No change', score: 0 },
        { value: 'thinning', label: 'Some thinning on head', score: 1 },
        { value: 'loss_body', label: 'Loss of body/facial hair', score: 2 },
        { value: 'both', label: 'Both head and body hair changes', score: 2 }
      ]
    },
    {
      id: 'hot_flashes',
      category: 'Other Symptoms',
      question: 'Do you experience night sweats or hot flashes?',
      type: 'select',
      options: [
        { value: 'never', label: 'Never', score: 0 },
        { value: 'rarely', label: 'Rarely', score: 1 },
        { value: 'sometimes', label: 'Sometimes', score: 2 },
        { value: 'frequently', label: 'Frequently', score: 3 }
      ]
    }
  ];

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
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
            tool_type: 'hormone_assessment',
            tool_results: {
              ...resultsData,
              answers
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
    await analyzeWithAI();
  };

  const analyzeWithAI = async () => {
    let totalScore = 0;
    const categoryScores: CategoryScores = {
      'Energy & Vitality': 0,
      'Mental Clarity': 0,
      'Sexual Health': 0,
      'Physical Performance': 0,
      'Other Symptoms': 0
    };

    questions.forEach(q => {
      if (answers[q.id] && q.options) {
        const selectedOption = q.options.find(opt => opt.value === answers[q.id]);
        if (selectedOption?.score !== undefined) {
          totalScore += selectedOption.score;
          if (categoryScores[q.category] !== undefined) {
            categoryScores[q.category] += selectedOption.score;
          }
        }
      }
    });

    const maxPossibleScore = 36;
    const percentage = (totalScore / maxPossibleScore) * 100;
    
    let riskLevel: string, recommendation: string, treatments: string[];
    
    if (percentage < 25) {
      riskLevel = 'low';
      recommendation = 'Your symptoms suggest your hormone levels may be within normal range. However, baseline testing can confirm this and establish your personal optimal levels for future reference.';
      treatments = ['Baseline Lab Panel', 'Lifestyle Optimization'];
    } else if (percentage < 50) {
      riskLevel = 'moderate';
      recommendation = 'Your responses indicate some symptoms commonly associated with hormonal imbalance. A comprehensive hormone panel would help identify any deficiencies and guide appropriate treatment.';
      treatments = ['Comprehensive Hormone Panel', 'TRT Evaluation', 'Lifestyle Optimization'];
    } else if (percentage < 75) {
      riskLevel = 'elevated';
      recommendation = 'Your symptom profile suggests a higher likelihood of hormonal imbalance, particularly testosterone deficiency. We strongly recommend a comprehensive evaluation with one of our physicians.';
      treatments = ['Testosterone Replacement Therapy', 'Comprehensive Hormone Panel', 'Peptide Therapy'];
    } else {
      riskLevel = 'high';
      recommendation = 'Your responses indicate significant symptoms that are strongly associated with hormone deficiency. Prompt evaluation and treatment could substantially improve your quality of life.';
      treatments = ['Testosterone Replacement Therapy', 'Full Metabolic Panel', 'Personalized Treatment Protocol'];
    }

    await new Promise(resolve => setTimeout(resolve, 2500));

    const resultsData: Results = {
      totalScore,
      percentage,
      riskLevel,
      recommendation,
      treatments,
      categoryScores,
      age: answers.age
    };

    // Sync to Healthie
    await syncToHealthie(resultsData);

    setResults(resultsData);
    setIsAnalyzing(false);
    setIsSyncing(false);
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Demographics': '👤',
      'Energy & Vitality': '⚡',
      'Mental Clarity': '🧠',
      'Sexual Health': '❤️',
      'Physical Performance': '💪',
      'Other Symptoms': '📋'
    };
    return icons[category] || '📋';
  };

  const getRiskColor = (level: string): string => {
    const colors: Record<string, string> = {
      low: '#14B870',
      moderate: '#F59E0B',
      elevated: '#F97316',
      high: '#EF4444'
    };
    return colors[level] || '#726658';
  };

  const resetAssessment = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setEmail('');
    setShowEmailCapture(false);
    setIsAnalyzing(false);
    setIsSyncing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      <div className="max-w-[720px] mx-auto px-6 py-10">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-warm-stone/10 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase text-warm-stone mb-5">
            <span>🧬</span>
            <span>AI-Powered Assessment</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-rich-black mb-3">
            Hormone Health Assessment
          </h1>
          <p className="text-lg text-warm-stone">
            Answer a few questions to understand if your symptoms may be related to hormonal imbalance. Takes about 3 minutes.
          </p>
        </header>

        {/* Email Capture */}
        {showEmailCapture && !isAnalyzing && !results && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-warm-stone/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🔬
            </div>
            <h2 className="font-display text-3xl font-bold text-rich-black mb-3">
              Your Results Are Ready
            </h2>
            <p className="text-warm-stone mb-8">
              Enter your email to receive your personalized hormone health analysis and treatment recommendations.
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
                Get My Results →
              </button>
            </form>
            <p className="text-xs text-warm-stone mt-4">
              🔒 Your information is secure and HIPAA-compliant. We never share your data.
            </p>
          </div>
        )}

        {/* Analyzing State */}
        {isAnalyzing && (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-warm-stone/30 border-t-warm-stone rounded-full animate-spin mx-auto mb-8" />
            <h2 className="font-display text-2xl font-semibold mb-3">Analyzing Your Responses</h2>
            <p className="text-warm-stone">Our AI is evaluating your symptoms and preparing personalized recommendations...</p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6 animate-fadeIn">
            {/* Results Header */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-warm-stone/20 text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase mb-5"
                style={{
                  background: `${getRiskColor(results.riskLevel)}15`,
                  color: getRiskColor(results.riskLevel)
                }}
              >
                <span>●</span>
                <span>
                  {results.riskLevel === 'low' ? 'Low' : results.riskLevel === 'moderate' ? 'Moderate' : results.riskLevel === 'elevated' ? 'Elevated' : 'High'} Likelihood
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Your Assessment Results</h2>
              <p className="text-lg text-warm-stone max-w-xl mx-auto">{results.recommendation}</p>
            </div>

            {/* Category Scores */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-warm-stone/20">
              <h3 className="font-display text-lg font-semibold mb-6">Symptom Breakdown by Category</h3>
              <div className="space-y-4">
                {Object.entries(results.categoryScores).map(([category, score]) => {
                  const maxScore = category === 'Energy & Vitality' ? 6 :
                                   category === 'Mental Clarity' ? 9 :
                                   category === 'Sexual Health' ? 6 :
                                   category === 'Physical Performance' ? 9 : 6;
                  const percentage = (score / maxScore) * 100;
                  return (
                    <div key={category} className="flex items-center gap-4 py-4 border-b border-warm-stone/10 last:border-0">
                      <div className="w-11 h-11 bg-soft-linen rounded-xl flex items-center justify-center text-xl">
                        {getCategoryIcon(category)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-rich-black mb-1">{category}</div>
                        <div className="h-1.5 bg-warm-stone/20 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                              background: percentage > 66 ? '#EF4444' : percentage > 33 ? '#F59E0B' : '#14B870'
                            }}
                          />
                        </div>
                      </div>
                      <div className="font-semibold text-warm-stone min-w-[50px] text-right">
                        {Math.round(percentage)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Treatments */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-warm-stone/20">
              <h3 className="font-display text-lg font-semibold mb-5">Recommended Next Steps</h3>
              <div className="space-y-3">
                {results.treatments.map((treatment, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-soft-linen rounded-xl">
                    <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <span className="font-semibold">{treatment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-deep-charcoal to-rich-black rounded-2xl p-12 text-center text-white">
              <h2 className="font-display text-3xl font-bold mb-3">Ready to Optimize Your Health?</h2>
              <p className="text-white/80 mb-8">
                Schedule a free consultation with one of our Texas-licensed physicians to discuss your results and treatment options.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/intake"
                  className="px-9 py-4 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 hover:translate-y-[-2px] transition-all"
                >
                  Start Free Consultation
                </a>
                <button
                  onClick={resetAssessment}
                  className="px-9 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions */}
        {!showEmailCapture && !isAnalyzing && !results && (
          <>
            {/* Progress */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-warm-stone">
                  Question {currentStep + 1} of {totalSteps}
                </span>
                <span className="flex items-center gap-2 text-sm text-deep-charcoal">
                  <span>{getCategoryIcon(currentQuestion.category)}</span>
                  <span>{currentQuestion.category}</span>
                </span>
              </div>
              <div className="h-1.5 bg-warm-stone/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-warm-stone to-deep-charcoal rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl p-10 shadow-lg border border-warm-stone/20">
              <h2 className="font-display text-2xl font-semibold mb-8">{currentQuestion.question}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                      answers[currentQuestion.id] === option.value
                        ? 'bg-deep-charcoal border-deep-charcoal text-white'
                        : 'bg-soft-linen border-transparent hover:border-warm-stone hover:translate-x-1'
                    }`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-white bg-warm-stone'
                        : 'border-warm-stone/30'
                    }`}>
                      {answers[currentQuestion.id] === option.value && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8">
              <button
                className="flex items-center gap-2 px-5 py-3 border-2 border-warm-stone/30 rounded-xl text-sm font-medium text-warm-stone hover:border-warm-stone hover:bg-soft-linen transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 0}
              >
                ← Back
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HormoneAssessment;
