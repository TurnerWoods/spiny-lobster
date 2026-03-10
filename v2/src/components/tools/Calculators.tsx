import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

// ============================================
// SHARED TYPES & UTILITIES
// ============================================

interface FieldConfig {
  id: string;
  label: string;
  type: 'number' | 'select';
  placeholder?: string;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
}

interface CalculatorProps {
  title: string;
  description: string;
  icon: string;
  fields: FieldConfig[];
  calculate: (values: Record<string, any>) => any;
  renderResult: (result: any) => React.ReactNode;
}

// ============================================
// BASE CALCULATOR COMPONENT
// ============================================

const BaseCalculator: React.FC<CalculatorProps> = ({
  title,
  description,
  icon,
  fields,
  calculate,
  renderResult
}) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (id: string, value: string) => {
    setValues(prev => ({ ...prev, [id]: value }));
    setShowResult(false);
  };

  const isValid = () => {
    return fields.every(field => {
      const value = values[field.id];
      if (field.type === 'select') return value && value !== '';
      return value && !isNaN(Number(value)) && Number(value) >= (field.min || 0);
    });
  };

  const handleCalculate = () => {
    if (!isValid()) return;
    setResult(calculate(values));
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      <div className="max-w-[600px] mx-auto px-6 py-10">
        {/* Back Link */}
        <Link
          to="/tools"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Tools
        </Link>

        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-[72px] h-[72px] bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg">
            {icon}
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">{title}</h1>
          <p className="text-warm-stone">{description}</p>
        </header>

        {/* Form */}
        <div className="bg-white rounded-[20px] p-5 sm:p-9 shadow-lg border border-warm-stone/20 overflow-hidden">
          {/* Mobile-first: single column stacked, then 2-col on sm+ for number fields */}
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            {fields.map(field => (
              <div key={field.id} className={`flex flex-col gap-2 ${field.type === 'select' ? 'sm:col-span-2' : ''}`}>
                <label className="block text-sm font-semibold text-deep-charcoal">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="w-full h-12 sm:h-auto px-4 py-3.5 border-2 border-warm-stone/30 rounded-xl text-base bg-white focus:outline-none focus:border-warm-stone focus:ring-4 focus:ring-warm-stone/10 transition-all appearance-none"
                    value={values[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    inputMode="numeric"
                    className="w-full h-12 sm:h-auto px-4 py-3.5 border-2 border-warm-stone/30 rounded-xl text-base focus:outline-none focus:border-warm-stone focus:ring-4 focus:ring-warm-stone/10 transition-all"
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    value={values[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            className="w-full mt-7 py-4 h-14 sm:h-auto bg-gradient-to-br from-warm-stone to-deep-charcoal text-white rounded-[14px] text-lg font-semibold hover:translate-y-[-2px] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCalculate}
            disabled={!isValid()}
          >
            Calculate
          </button>
        </div>

        {/* Results */}
        {showResult && result && (
          <div className="mt-6 bg-white rounded-[20px] p-9 shadow-lg border-2 border-warm-stone animate-slideUp">
            {renderResult(result)}
            
            {/* CTA */}
            <div className="mt-8 p-7 bg-gradient-to-br from-deep-charcoal to-rich-black rounded-2xl text-center text-white">
              <p className="text-white/90 mb-4">Want personalized guidance on reaching your health goals?</p>
              <a href="/intake" className="inline-flex items-center gap-2 px-7 py-3.5 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 transition-all">
                Talk to a Physician →
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// ============================================
// TDEE CALCULATOR
// ============================================

export const TDEECalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'age', label: 'Age', type: 'number', placeholder: 'Years', min: 18, max: 100 },
    { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'height_feet', label: 'Height (ft)', type: 'number', placeholder: 'Feet', min: 4, max: 7 },
    { id: 'height_inches', label: 'Height (in)', type: 'number', placeholder: 'Inches', min: 0, max: 11 },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
        { value: 'light', label: 'Light (1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (3-5 days/week)' },
        { value: 'active', label: 'Active (6-7 days/week)' },
        { value: 'very_active', label: 'Very Active (2x per day)' }
      ]
    },
    {
      id: 'goal', label: 'Goal', type: 'select',
      options: [
        { value: 'lose', label: 'Lose Weight' },
        { value: 'maintain', label: 'Maintain Weight' },
        { value: 'gain', label: 'Build Muscle' }
      ]
    }
  ];

  const calculate = (v: Record<string, any>) => {
    const weightKg = v.weight * 0.453592;
    const heightCm = (v.height_feet * 12 + Number(v.height_inches)) * 2.54;
    const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * v.age + 5);
    
    const multipliers: Record<string, number> = {
      sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9
    };
    const tdee = Math.round(bmr * multipliers[v.activity]);
    let target = tdee;
    if (v.goal === 'lose') target = Math.round(tdee - 500);
    if (v.goal === 'gain') target = Math.round(tdee + 300);
    return { bmr, tdee, target, goal: v.goal };
  };

  const renderResult = (result: any) => (
    <div className="text-center">
      <div className="mb-6">
        <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Your Daily Calorie Target</span>
        <div className="text-6xl font-extrabold text-deep-charcoal leading-none mt-2">{result.target.toLocaleString()}</div>
        <span className="text-warm-stone">calories/day</span>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-warm-stone/20">
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">BMR</span>
          <span className="font-bold text-xl text-deep-charcoal">{result.bmr.toLocaleString()}</span>
        </div>
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Maintenance</span>
          <span className="font-bold text-xl text-deep-charcoal">{result.tdee.toLocaleString()}</span>
        </div>
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Adjustment</span>
          <span className="font-bold text-xl text-deep-charcoal">
            {result.goal === 'lose' ? '-500' : result.goal === 'gain' ? '+300' : '0'}
          </span>
        </div>
      </div>
    </div>
  );

  return <BaseCalculator title="TDEE Calculator" description="Calculate your Total Daily Energy Expenditure" icon="⚡" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// ============================================
// BMI CALCULATOR
// ============================================

export const BMICalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'height_feet', label: 'Height (ft)', type: 'number', placeholder: 'Feet', min: 4, max: 7 },
    { id: 'height_inches', label: 'Height (in)', type: 'number', placeholder: 'Inches', min: 0, max: 11 }
  ];

  const calculate = (v: Record<string, any>) => {
    const heightIn = v.height_feet * 12 + Number(v.height_inches);
    const bmi = (v.weight / (heightIn * heightIn)) * 703;
    let category = 'Normal';
    let color = '#C9A962'; // Accent gold for optimal/normal
    if (bmi < 18.5) { category = 'Underweight'; color = '#A89078'; } // Warm tan
    else if (bmi >= 25 && bmi < 30) { category = 'Overweight'; color = '#B8956A'; } // Warm amber-brown
    else if (bmi >= 30) { category = 'Obese'; color = '#A67563'; } // Warm terracotta-red
    return { bmi: bmi.toFixed(1), category, color };
  };

  const renderResult = (result: any) => (
    <div className="text-center">
      <div className="mb-6">
        <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Your Body Mass Index</span>
        <div className="text-6xl font-extrabold leading-none mt-2" style={{ color: result.color }}>{result.bmi}</div>
        <span style={{ color: result.color }} className="font-semibold">{result.category}</span>
      </div>
      <div className="mt-6">
        <div className="flex rounded-lg overflow-hidden text-white text-xs font-semibold">
          <div className="flex-1 py-2 bg-[#A89078]">{'<18.5'}</div>
          <div className="flex-1 py-2 bg-[#C9A962]">18.5-24.9</div>
          <div className="flex-1 py-2 bg-[#B8956A]">25-29.9</div>
          <div className="flex-1 py-2 bg-[#A67563]">30+</div>
        </div>
      </div>
    </div>
  );

  return <BaseCalculator title="BMI Calculator" description="Calculate your Body Mass Index" icon="⚖️" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// ============================================
// BMR CALCULATOR
// ============================================

export const BMRCalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'age', label: 'Age', type: 'number', placeholder: 'Years', min: 18, max: 100 },
    { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'height_feet', label: 'Height (ft)', type: 'number', placeholder: 'Feet', min: 4, max: 7 },
    { id: 'height_inches', label: 'Height (in)', type: 'number', placeholder: 'Inches', min: 0, max: 11 }
  ];

  const calculate = (v: Record<string, any>) => {
    const weightKg = v.weight * 0.453592;
    const heightCm = (v.height_feet * 12 + Number(v.height_inches)) * 2.54;
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * v.age + 5);
  };

  const renderResult = (result: number) => (
    <div className="text-center">
      <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Your Basal Metabolic Rate</span>
      <div className="text-6xl font-extrabold text-deep-charcoal leading-none mt-2">{result.toLocaleString()}</div>
      <span className="text-warm-stone">calories/day at rest</span>
      <p className="mt-6 p-4 bg-soft-linen rounded-xl text-sm text-warm-stone">
        This is the minimum calories your body needs to function. Never eat below this number.
      </p>
    </div>
  );

  return <BaseCalculator title="BMR Calculator" description="Find your Basal Metabolic Rate" icon="🫀" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// ============================================
// PROTEIN CALCULATOR
// ============================================

export const ProteinCalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    {
      id: 'goal', label: 'Goal', type: 'select',
      options: [
        { value: 'lose', label: 'Lose Fat / Cut' },
        { value: 'maintain', label: 'Maintain / Recomp' },
        { value: 'gain', label: 'Build Muscle / Bulk' }
      ]
    },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary' },
        { value: 'moderate', label: 'Moderate Exercise' },
        { value: 'active', label: 'Very Active / Athlete' }
      ]
    }
  ];

  const calculate = (v: Record<string, any>) => {
    const weightKg = v.weight * 0.453592;
    let multiplier = 1.6;
    if (v.goal === 'gain' && v.activity === 'active') multiplier = 2.2;
    else if (v.goal === 'gain') multiplier = 1.8;
    else if (v.goal === 'lose') multiplier = 2.0;
    else if (v.activity === 'active') multiplier = 1.8;
    return {
      protein: Math.round(weightKg * multiplier),
      min: Math.round(weightKg * 1.4),
      max: Math.round(weightKg * 2.2)
    };
  };

  const renderResult = (result: any) => (
    <div className="text-center">
      <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Recommended Daily Protein</span>
      <div className="text-6xl font-extrabold text-deep-charcoal leading-none mt-2">{result.protein}</div>
      <span className="text-warm-stone">grams/day</span>
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-warm-stone/20">
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Minimum</span>
          <span className="font-bold text-xl text-deep-charcoal">{result.min}g</span>
        </div>
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Maximum</span>
          <span className="font-bold text-xl text-deep-charcoal">{result.max}g</span>
        </div>
      </div>
    </div>
  );

  return <BaseCalculator title="Protein Calculator" description="Determine your optimal daily protein intake" icon="💪" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// ============================================
// CALORIE CALCULATOR
// ============================================

export const CalorieCalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'age', label: 'Age', type: 'number', placeholder: 'Years', min: 18, max: 100 },
    { id: 'weight', label: 'Current Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'target_weight', label: 'Target Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'height_feet', label: 'Height (ft)', type: 'number', placeholder: 'Feet', min: 4, max: 7 },
    { id: 'height_inches', label: 'Height (in)', type: 'number', placeholder: 'Inches', min: 0, max: 11 },
    {
      id: 'activity', label: 'Activity Level', type: 'select',
      options: [
        { value: 'sedentary', label: 'Sedentary' },
        { value: 'light', label: 'Light Activity' },
        { value: 'moderate', label: 'Moderate Activity' },
        { value: 'active', label: 'Very Active' }
      ]
    },
    {
      id: 'rate', label: 'Weight Loss Rate', type: 'select',
      options: [
        { value: 'slow', label: 'Slow (0.5 lb/week)' },
        { value: 'moderate', label: 'Moderate (1 lb/week)' },
        { value: 'aggressive', label: 'Aggressive (1.5 lb/week)' }
      ]
    }
  ];

  const calculate = (v: Record<string, any>) => {
    const weightKg = v.weight * 0.453592;
    const heightCm = (v.height_feet * 12 + Number(v.height_inches)) * 2.54;
    const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * v.age + 5);
    const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    const tdee = Math.round(bmr * multipliers[v.activity]);
    const deficits: Record<string, number> = { slow: 250, moderate: 500, aggressive: 750 };
    const deficit = deficits[v.rate] || 500;
    const weightToLose = v.weight - v.target_weight;
    const weeksToGoal = Math.round((weightToLose * 3500) / (deficit * 7));
    return { maintenance: tdee, target: tdee - deficit, deficit, weeksToGoal: Math.max(1, weeksToGoal), weightToLose };
  };

  const renderResult = (result: any) => (
    <div className="text-center">
      <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Daily Calorie Target</span>
      <div className="text-6xl font-extrabold text-deep-charcoal leading-none mt-2">{result.target.toLocaleString()}</div>
      <span className="text-warm-stone">calories/day</span>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-warm-stone/20">
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Maintenance</span>
          <span className="font-bold text-lg text-deep-charcoal">{result.maintenance.toLocaleString()}</span>
        </div>
        <div className="text-center p-4 bg-soft-linen rounded-xl">
          <span className="block text-xs text-warm-stone mb-1">Deficit</span>
          <span className="font-bold text-lg text-deep-charcoal">-{result.deficit}</span>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-xl text-white">
          <span className="block text-xs text-white/80 mb-1">Time to Goal</span>
          <span className="font-bold text-lg">{result.weeksToGoal} weeks</span>
        </div>
      </div>
    </div>
  );

  return <BaseCalculator title="Calorie Calculator" description="Calculate your calories for weight loss with timeline" icon="🔥" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// ============================================
// CARB CALCULATOR
// ============================================

export const CarbCalculator: React.FC = () => {
  const fields: FieldConfig[] = [
    { id: 'weight', label: 'Weight (lbs)', type: 'number', placeholder: 'lbs', min: 80, max: 500 },
    { id: 'calories', label: 'Daily Calories', type: 'number', placeholder: 'kcal', min: 1000, max: 5000 },
    {
      id: 'diet', label: 'Diet Type', type: 'select',
      options: [
        { value: 'low', label: 'Low Carb (20%)' },
        { value: 'moderate', label: 'Moderate (40%)' },
        { value: 'high', label: 'High Carb (50%)' }
      ]
    }
  ];

  const calculate = (v: Record<string, any>) => {
    const percentages: Record<string, number> = { low: 0.2, moderate: 0.4, high: 0.5 };
    const carbCalories = v.calories * percentages[v.diet];
    return { grams: Math.round(carbCalories / 4), calories: Math.round(carbCalories), percentage: percentages[v.diet] * 100 };
  };

  const renderResult = (result: any) => (
    <div className="text-center">
      <span className="text-xs font-semibold text-warm-stone uppercase tracking-wider">Daily Carbohydrate Target</span>
      <div className="text-6xl font-extrabold text-deep-charcoal leading-none mt-2">{result.grams}</div>
      <span className="text-warm-stone">grams/day ({result.percentage}% of calories)</span>
      <p className="mt-6 p-4 bg-soft-linen rounded-xl text-sm text-warm-stone">
        This equals approximately {result.calories} calories from carbohydrates.
      </p>
    </div>
  );

  return <BaseCalculator title="Daily Carb Calculator" description="Calculate optimal carbohydrate intake for your diet" icon="🍞" fields={fields} calculate={calculate} renderResult={renderResult} />;
};

// Default export all calculators
export default {
  TDEECalculator,
  BMICalculator,
  BMRCalculator,
  ProteinCalculator,
  CalorieCalculator,
  CarbCalculator
};
