import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Utensils,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  ShoppingCart,
  Calendar,
  Coffee,
  Salad,
  Moon,
  Apple,
  MapPin,
  Store,
  ChefHat
} from 'lucide-react';

// Types
interface UserProfile {
  treatment: string;
  activityLevel: string;
  goal: string;
  dietaryRestrictions: string[];
  mealsPerDay: number;
}

interface MealPlanDay {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: string[];
}

interface Meal {
  name: string;
  description: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Recipe {
  name: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  macrosPerServing: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface RestaurantOption {
  restaurant: string;
  order: string;
  modifications: string;
  macros: string;
}

interface ShoppingListCategory {
  category: string;
  items: string[];
}

interface MealPlanResponse {
  overview: string;
  dailyTargets: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  weeklyPlan: MealPlanDay[];
  recipes: Recipe[];
  restaurantGuide: RestaurantOption[];
  shoppingList: ShoppingListCategory[];
  tips: string[];
}

const treatmentOptions = [
  { value: 'trt', label: 'Testosterone Therapy (TRT)', description: 'Higher protein, strategic carb timing' },
  { value: 'glp1', label: 'GLP-1 (Semaglutide/Tirzepatide)', description: 'Lower calorie density, high satiety' },
  { value: 'peptides', label: 'Peptide Therapy', description: 'Recovery-focused, anti-inflammatory' },
  { value: 'general', label: 'General Health Optimization', description: 'Balanced nutrition for wellness' },
];

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', description: 'Desk job, little exercise' },
  { value: 'light', label: 'Lightly Active', description: '1-3 workouts per week' },
  { value: 'moderate', label: 'Moderately Active', description: '3-5 workouts per week' },
  { value: 'very_active', label: 'Very Active', description: '6-7 workouts per week' },
];

const goalOptions = [
  { value: 'fat_loss', label: 'Fat Loss', description: 'Caloric deficit for weight loss' },
  { value: 'muscle_gain', label: 'Muscle Gain', description: 'Caloric surplus for building muscle' },
  { value: 'maintenance', label: 'Maintenance', description: 'Maintain current weight' },
  { value: 'recomposition', label: 'Body Recomposition', description: 'Lose fat while building muscle' },
];

const dietaryOptions = [
  { value: 'none', label: 'No Restrictions' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'dairy_free', label: 'Dairy-Free' },
  { value: 'keto', label: 'Keto/Low-Carb' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'no_pork', label: 'No Pork' },
  { value: 'no_shellfish', label: 'No Shellfish' },
];

const MealPlanner: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    treatment: '',
    activityLevel: '',
    goal: '',
    dietaryRestrictions: [],
    mealsPerDay: 3,
  });
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState<'plan' | 'recipes' | 'restaurants' | 'shopping'>('plan');

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleProfileChange = (field: keyof UserProfile, value: string | string[] | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleDietaryRestriction = (value: string) => {
    if (value === 'none') {
      setProfile(prev => ({ ...prev, dietaryRestrictions: [] }));
      return;
    }
    setProfile(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(value)
        ? prev.dietaryRestrictions.filter(r => r !== value)
        : [...prev.dietaryRestrictions, value]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.treatment !== '';
      case 2: return profile.activityLevel !== '' && profile.goal !== '';
      case 3: return true; // Dietary restrictions are optional
      case 4: return email.includes('@');
      default: return false;
    }
  };

  const syncToHealthie = async (planData: MealPlanResponse) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) return;

      await fetch(`${supabaseUrl}/functions/v1/healthie-sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          tool_type: 'meal_planner',
          tool_results: { profile, plan: planData }
        })
      });
    } catch (error) {
      console.error('Error syncing to Healthie:', error);
    }
  };

  const generateMealPlan = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Service not configured');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/meal-planner`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile })
      });

      if (!response.ok) {
        throw new Error('Failed to generate meal plan');
      }

      const planData = await response.json();
      await syncToHealthie(planData);
      setMealPlan(planData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate meal plan');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateMealPlan();
  };

  const resetForm = () => {
    setStep(1);
    setProfile({
      treatment: '',
      activityLevel: '',
      goal: '',
      dietaryRestrictions: [],
      mealsPerDay: 3,
    });
    setEmail('');
    setMealPlan(null);
    setError(null);
    setActiveDay(0);
    setActiveTab('plan');
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return <Coffee className="h-5 w-5" />;
      case 'lunch': return <Salad className="h-5 w-5" />;
      case 'dinner': return <Moon className="h-5 w-5" />;
      default: return <Apple className="h-5 w-5" />;
    }
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
            <ChefHat className="h-4 w-4" />
            <span>Chef Marcus</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-rich-black mb-3"
          >
            AI Meal Planner
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-warm-stone max-w-2xl mx-auto"
          >
            Get a personalized nutrition plan optimized for your treatment protocol,
            complete with Texas restaurant options and H-E-B shopping lists.
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {/* Generating State */}
          {isGenerating && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <Loader2 className="h-16 w-16 text-warm-stone animate-spin mx-auto mb-8" />
              <h2 className="font-display text-2xl font-semibold mb-3">Chef Marcus is Preparing Your Plan</h2>
              <p className="text-warm-stone max-w-md mx-auto">
                Creating your personalized meal plan with recipes, restaurant options, and shopping lists...
              </p>
            </motion.div>
          )}

          {/* Results Display */}
          {mealPlan && !isGenerating && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                    <ChefHat className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-rich-black mb-1">
                      Your Personalized Plan
                    </h2>
                    <p className="text-sm text-warm-stone mb-4">By Chef Marcus • Sports Nutritionist</p>
                    <p className="text-deep-charcoal leading-relaxed">{mealPlan.overview}</p>
                  </div>
                </div>

                {/* Daily Targets */}
                <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-soft-linen rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rich-black">{mealPlan.dailyTargets.calories}</p>
                    <p className="text-xs text-warm-stone">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{mealPlan.dailyTargets.protein}g</p>
                    <p className="text-xs text-warm-stone">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600">{mealPlan.dailyTargets.carbs}g</p>
                    <p className="text-xs text-warm-stone">Carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{mealPlan.dailyTargets.fat}g</p>
                    <p className="text-xs text-warm-stone">Fat</p>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { id: 'plan', label: 'Weekly Plan', icon: Calendar },
                  { id: 'recipes', label: 'Recipes', icon: Utensils },
                  { id: 'restaurants', label: 'Texas Restaurants', icon: MapPin },
                  { id: 'shopping', label: 'Shopping List', icon: Store },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-warm-stone text-white'
                        : 'bg-white text-warm-stone hover:bg-warm-stone/10'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* Weekly Plan Tab */}
                {activeTab === 'plan' && (
                  <motion.div
                    key="plan-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-2xl shadow-lg border border-warm-stone/20 overflow-hidden"
                  >
                    {/* Day Selector */}
                    <div className="flex overflow-x-auto border-b border-warm-stone/10">
                      {mealPlan.weeklyPlan.map((day, index) => (
                        <button
                          key={day.day}
                          onClick={() => setActiveDay(index)}
                          className={`flex-1 min-w-[80px] py-3 px-4 text-sm font-medium transition-colors ${
                            activeDay === index
                              ? 'bg-warm-stone/10 text-warm-stone border-b-2 border-warm-stone'
                              : 'text-muted-foreground hover:bg-soft-linen'
                          }`}
                        >
                          {day.day}
                        </button>
                      ))}
                    </div>

                    {/* Day Meals */}
                    <div className="p-6 space-y-4">
                      {mealPlan.weeklyPlan[activeDay] && (
                        <>
                          {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                            const meal = mealPlan.weeklyPlan[activeDay][mealType as keyof MealPlanDay] as Meal;
                            if (!meal || typeof meal === 'string') return null;
                            return (
                              <div key={mealType} className="flex gap-4 p-4 bg-soft-linen rounded-xl">
                                <div className="w-10 h-10 bg-warm-stone/20 rounded-lg flex items-center justify-center flex-shrink-0 text-warm-stone">
                                  {getMealIcon(mealType)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <p className="text-xs font-semibold uppercase text-warm-stone mb-1">{mealType}</p>
                                      <h4 className="font-semibold text-rich-black">{meal.name}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{meal.description}</p>
                                    </div>
                                    <div className="text-right text-xs">
                                      <p className="font-semibold">{meal.macros.calories} cal</p>
                                      <p className="text-muted-foreground">{meal.macros.protein}p / {meal.macros.carbs}c / {meal.macros.fat}f</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {mealPlan.weeklyPlan[activeDay].snacks.length > 0 && (
                            <div className="flex gap-4 p-4 bg-soft-linen rounded-xl">
                              <div className="w-10 h-10 bg-warm-stone/20 rounded-lg flex items-center justify-center flex-shrink-0 text-warm-stone">
                                <Apple className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold uppercase text-warm-stone mb-1">Snacks</p>
                                <ul className="text-sm text-deep-charcoal space-y-1">
                                  {mealPlan.weeklyPlan[activeDay].snacks.map((snack, i) => (
                                    <li key={i}>• {snack}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Recipes Tab */}
                {activeTab === 'recipes' && (
                  <motion.div
                    key="recipes-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {mealPlan.recipes.map((recipe, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-display text-xl font-bold text-rich-black">{recipe.name}</h3>
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            <span>Prep: {recipe.prepTime}</span>
                            <span>Cook: {recipe.cookTime}</span>
                            <span>Serves: {recipe.servings}</span>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-warm-stone mb-2">Ingredients</h4>
                            <ul className="text-sm space-y-1">
                              {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-warm-stone">•</span>
                                  {ing}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-warm-stone mb-2">Instructions</h4>
                            <ol className="text-sm space-y-2">
                              {recipe.instructions.map((step, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="w-5 h-5 bg-warm-stone text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                    {i + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-4 pt-4 border-t border-warm-stone/10 text-sm">
                          <span className="font-medium">Per Serving:</span>
                          <span>{recipe.macrosPerServing.calories} cal</span>
                          <span className="text-green-600">{recipe.macrosPerServing.protein}g protein</span>
                          <span className="text-amber-600">{recipe.macrosPerServing.carbs}g carbs</span>
                          <span className="text-blue-600">{recipe.macrosPerServing.fat}g fat</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Restaurants Tab */}
                {activeTab === 'restaurants' && (
                  <motion.div
                    key="restaurants-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20"
                  >
                    <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-warm-stone" />
                      Texas Restaurant Guide
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Treatment-compatible options at popular Texas restaurants
                    </p>
                    <div className="space-y-4">
                      {mealPlan.restaurantGuide.map((option, index) => (
                        <div key={index} className="p-4 bg-soft-linen rounded-xl">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-rich-black">{option.restaurant}</h4>
                            <span className="text-xs text-warm-stone">{option.macros}</span>
                          </div>
                          <p className="text-sm text-deep-charcoal mb-2">
                            <span className="font-medium">Order:</span> {option.order}
                          </p>
                          {option.modifications && (
                            <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block">
                              Modification: {option.modifications}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Shopping List Tab */}
                {activeTab === 'shopping' && (
                  <motion.div
                    key="shopping-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20"
                  >
                    <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-warm-stone" />
                      H-E-B Shopping List
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Organized by store section for efficient shopping
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {mealPlan.shoppingList.map((category, index) => (
                        <div key={index}>
                          <h4 className="font-semibold text-warm-stone mb-2">{category.category}</h4>
                          <ul className="text-sm space-y-1">
                            {category.items.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <input type="checkbox" className="rounded border-warm-stone/30" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tips */}
              {mealPlan.tips.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20">
                  <h3 className="font-display text-lg font-semibold mb-4">Tips for Success</h3>
                  <ul className="space-y-2">
                    {mealPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-deep-charcoal">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-deep-charcoal to-rich-black rounded-2xl p-8 sm:p-12 text-center text-white">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  Ready to Start Your Health Journey?
                </h2>
                <p className="text-white/80 mb-8 max-w-lg mx-auto">
                  Schedule a consultation to discuss your nutrition plan with our physicians.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a href="/intake" className="px-8 py-4 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 transition-all">
                    Start Free Assessment
                  </a>
                  <button onClick={resetForm} className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all">
                    Create New Plan
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step Form */}
          {!isGenerating && !mealPlan && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-warm-stone">
                    Step {step} of {totalSteps}
                  </span>
                </div>
                <div className="h-1.5 bg-warm-stone/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-warm-stone to-deep-charcoal rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-warm-stone/20">
                {/* Step 1: Treatment Type */}
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">What treatment are you on?</h2>
                    <p className="text-muted-foreground mb-6">Your nutrition plan will be optimized for your specific protocol.</p>
                    <div className="space-y-3">
                      {treatmentOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleProfileChange('treatment', option.value)}
                          className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                            profile.treatment === option.value
                              ? 'bg-deep-charcoal border-deep-charcoal text-white'
                              : 'bg-soft-linen border-transparent hover:border-warm-stone'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            profile.treatment === option.value ? 'border-white bg-warm-stone' : 'border-warm-stone/30'
                          }`}>
                            {profile.treatment === option.value && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className="font-semibold">{option.label}</p>
                            <p className={`text-sm ${profile.treatment === option.value ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {option.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Activity & Goals */}
                {step === 2 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">Activity Level & Goals</h2>
                    <p className="text-muted-foreground mb-6">Help us calculate your optimal calorie and macro targets.</p>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Activity Level</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {activityLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleProfileChange('activityLevel', level.value)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              profile.activityLevel === level.value
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            <p className="font-semibold text-sm">{level.label}</p>
                            <p className={`text-xs ${profile.activityLevel === level.value ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {level.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Primary Goal</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {goalOptions.map((goal) => (
                          <button
                            key={goal.value}
                            onClick={() => handleProfileChange('goal', goal.value)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              profile.goal === goal.value
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            <p className="font-semibold text-sm">{goal.label}</p>
                            <p className={`text-xs ${profile.goal === goal.value ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {goal.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Dietary Restrictions */}
                {step === 3 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">Dietary Preferences</h2>
                    <p className="text-muted-foreground mb-6">Select any dietary restrictions or preferences (optional).</p>
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleDietaryRestriction(option.value)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                            option.value === 'none'
                              ? profile.dietaryRestrictions.length === 0
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone text-deep-charcoal'
                              : profile.dietaryRestrictions.includes(option.value)
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone text-deep-charcoal'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Email */}
                {step === 4 && (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-warm-stone to-deep-charcoal rounded-full flex items-center justify-center mx-auto mb-6">
                      <Utensils className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold mb-2">Your Meal Plan Is Ready!</h2>
                    <p className="text-muted-foreground mb-6">Enter your email to generate your personalized nutrition plan.</p>
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
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
                        className="w-full bg-gradient-to-br from-warm-stone to-deep-charcoal text-white"
                      >
                        Generate My Meal Plan
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                    <p className="text-xs text-warm-stone/70 mt-4">
                      🔒 Your information is secure and HIPAA-compliant.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                    {error}
                  </div>
                )}
              </div>

              {/* Navigation */}
              {step < 4 && (
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(prev => prev - 1)}
                    disabled={step === 1}
                    className="flex items-center gap-2 px-5 py-3 border-2 border-warm-stone/30 rounded-xl text-sm font-medium text-warm-stone hover:border-warm-stone hover:bg-soft-linen transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <Button
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={!canProceed()}
                    className="bg-warm-stone text-white"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default MealPlanner;
