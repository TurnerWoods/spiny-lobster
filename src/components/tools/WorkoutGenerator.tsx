import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Dumbbell,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Calendar,
  Target,
  Clock,
  Flame,
  RefreshCw,
  Youtube,
  AlertCircle,
  Trophy
} from 'lucide-react';

// Types
interface UserProfile {
  treatment: string;
  experience: string;
  equipment: string;
  daysPerWeek: number;
  goal: string;
  limitations: string[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  rpe: string;
  notes: string;
  youtubeSearch: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
  duration: string;
}

interface WorkoutProgram {
  overview: string;
  programType: string;
  weeklyStructure: string;
  workouts: WorkoutDay[];
  progressionScheme: string[];
  recoveryProtocols: string[];
  treatmentNotes: string[];
}

const treatmentOptions = [
  { value: 'trt', label: 'Testosterone Therapy (TRT)', description: 'Optimized for strength & hypertrophy gains' },
  { value: 'glp1', label: 'GLP-1 (Semaglutide/Tirzepatide)', description: 'Muscle preservation during weight loss' },
  { value: 'peptides', label: 'Peptide Therapy', description: 'Recovery-focused programming' },
  { value: 'general', label: 'General Health', description: 'Balanced fitness approach' },
];

const experienceLevels = [
  { value: 'beginner', label: 'Beginner', description: '0-1 year of training' },
  { value: 'intermediate', label: 'Intermediate', description: '1-3 years of training' },
  { value: 'advanced', label: 'Advanced', description: '3+ years of training' },
];

const equipmentOptions = [
  { value: 'full_gym', label: 'Full Gym', description: 'Full access to commercial gym' },
  { value: 'home_basic', label: 'Basic Home Gym', description: 'Dumbbells, bench, pull-up bar' },
  { value: 'home_full', label: 'Home Gym (Full)', description: 'Rack, barbell, dumbbells, cables' },
  { value: 'bodyweight', label: 'Bodyweight Only', description: 'No equipment needed' },
];

const goalOptions = [
  { value: 'strength', label: 'Build Strength', description: 'Increase 1RM on compound lifts' },
  { value: 'hypertrophy', label: 'Build Muscle', description: 'Maximize muscle growth' },
  { value: 'fat_loss', label: 'Fat Loss', description: 'Burn fat while preserving muscle' },
  { value: 'athletic', label: 'Athletic Performance', description: 'Speed, power, conditioning' },
];

const limitationOptions = [
  { value: 'none', label: 'No Limitations' },
  { value: 'lower_back', label: 'Lower Back Issues' },
  { value: 'shoulder', label: 'Shoulder Issues' },
  { value: 'knee', label: 'Knee Issues' },
  { value: 'wrist', label: 'Wrist/Elbow Issues' },
  { value: 'hip', label: 'Hip Issues' },
];

const WorkoutGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    treatment: '',
    experience: '',
    equipment: '',
    daysPerWeek: 4,
    goal: '',
    limitations: [],
  });
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [program, setProgram] = useState<WorkoutProgram | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeWorkout, setActiveWorkout] = useState(0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleProfileChange = (field: keyof UserProfile, value: string | number | string[]) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleLimitation = (value: string) => {
    if (value === 'none') {
      setProfile(prev => ({ ...prev, limitations: [] }));
      return;
    }
    setProfile(prev => ({
      ...prev,
      limitations: prev.limitations.includes(value)
        ? prev.limitations.filter(l => l !== value)
        : [...prev.limitations, value]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.treatment !== '' && profile.experience !== '';
      case 2: return profile.equipment !== '' && profile.goal !== '';
      case 3: return true;
      case 4: return email.includes('@');
      default: return false;
    }
  };

  const syncToHealthie = async (programData: WorkoutProgram) => {
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
          tool_type: 'workout_generator',
          tool_results: { profile, program: programData }
        })
      });
    } catch (error) {
      console.error('Error syncing to Healthie:', error);
    }
  };

  const generateProgram = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Service not configured');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/workout-generator`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profile })
      });

      if (!response.ok) {
        throw new Error('Failed to generate workout program');
      }

      const programData = await response.json();
      await syncToHealthie(programData);
      setProgram(programData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate program');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateProgram();
  };

  const resetForm = () => {
    setStep(1);
    setProfile({
      treatment: '',
      experience: '',
      equipment: '',
      daysPerWeek: 4,
      goal: '',
      limitations: [],
    });
    setEmail('');
    setProgram(null);
    setError(null);
    setActiveWorkout(0);
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
            <Trophy className="h-4 w-4" />
            <span>Coach Rivera</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-rich-black mb-3"
          >
            AI Workout Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-warm-stone max-w-2xl mx-auto"
          >
            Get a treatment-optimized exercise program designed to maximize
            your results while supporting your health protocol.
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
              <h2 className="font-display text-2xl font-semibold mb-3">Coach Rivera is Building Your Program</h2>
              <p className="text-warm-stone max-w-md mx-auto">
                Creating your personalized workout program with exercises, progression schemes, and recovery protocols...
              </p>
            </motion.div>
          )}

          {/* Results Display */}
          {program && !isGenerating && (
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
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-rich-black mb-1">
                      Your Training Program
                    </h2>
                    <p className="text-sm text-warm-stone mb-4">
                      By Coach Rivera • CSCS • {program.programType}
                    </p>
                    <p className="text-deep-charcoal leading-relaxed">{program.overview}</p>
                  </div>
                </div>

                {/* Program Structure */}
                <div className="mt-6 p-4 bg-soft-linen rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-warm-stone" />
                    <span className="font-semibold text-rich-black">Weekly Structure</span>
                  </div>
                  <p className="text-sm text-deep-charcoal">{program.weeklyStructure}</p>
                </div>
              </div>

              {/* Workout Day Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {program.workouts.map((workout, index) => (
                  <button
                    key={workout.day}
                    onClick={() => setActiveWorkout(index)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      activeWorkout === index
                        ? 'bg-warm-stone text-white'
                        : 'bg-white text-warm-stone hover:bg-warm-stone/10'
                    }`}
                  >
                    {workout.day}
                  </button>
                ))}
              </div>

              {/* Active Workout */}
              {program.workouts[activeWorkout] && (
                <div className="bg-white rounded-2xl shadow-lg border border-warm-stone/20 overflow-hidden">
                  {/* Workout Header */}
                  <div className="p-6 border-b border-warm-stone/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-display text-xl font-bold text-rich-black">
                          {program.workouts[activeWorkout].day}
                        </h3>
                        <p className="text-warm-stone">{program.workouts[activeWorkout].focus}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {program.workouts[activeWorkout].duration}
                      </div>
                    </div>
                  </div>

                  {/* Warmup */}
                  <div className="p-6 border-b border-warm-stone/10 bg-amber-50/50">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <Flame className="h-4 w-4" />
                      Warmup
                    </h4>
                    <ul className="text-sm text-amber-900 space-y-1">
                      {program.workouts[activeWorkout].warmup.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercises */}
                  <div className="p-6">
                    <h4 className="font-semibold text-rich-black mb-4 flex items-center gap-2">
                      <Target className="h-4 w-4 text-warm-stone" />
                      Main Workout
                    </h4>
                    <div className="space-y-4">
                      {program.workouts[activeWorkout].exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="p-4 bg-soft-linen rounded-xl"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3">
                              <span className="w-7 h-7 bg-warm-stone text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                {index + 1}
                              </span>
                              <div>
                                <h5 className="font-semibold text-rich-black">{exercise.name}</h5>
                                <p className="text-sm text-warm-stone">
                                  {exercise.sets} sets × {exercise.reps} • Rest {exercise.restSeconds}s
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-warm-stone/10 rounded text-xs font-semibold text-warm-stone">
                              RPE {exercise.rpe}
                            </span>
                          </div>
                          {exercise.notes && (
                            <p className="text-sm text-muted-foreground mt-2 pl-10">
                              💡 {exercise.notes}
                            </p>
                          )}
                          {exercise.youtubeSearch && (
                            <a
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.youtubeSearch)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 mt-2 pl-10"
                            >
                              <Youtube className="h-3.5 w-3.5" />
                              Watch demonstration
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cooldown */}
                  <div className="p-6 bg-blue-50/50 border-t border-warm-stone/10">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Cooldown
                    </h4>
                    <ul className="text-sm text-blue-900 space-y-1">
                      {program.workouts[activeWorkout].cooldown.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Progression & Recovery */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Progression Scheme */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-warm-stone" />
                    Progression Scheme
                  </h3>
                  <ul className="space-y-2">
                    {program.progressionScheme.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-deep-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recovery Protocols */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-stone/20">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-warm-stone" />
                    Recovery Protocols
                  </h3>
                  <ul className="space-y-2">
                    {program.recoveryProtocols.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-deep-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Treatment Notes */}
              {program.treatmentNotes.length > 0 && (
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2 text-amber-800">
                    <AlertCircle className="h-5 w-5" />
                    Treatment-Specific Notes
                  </h3>
                  <ul className="space-y-2">
                    {program.treatmentNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-amber-900">
                        <span>•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-deep-charcoal to-rich-black rounded-2xl p-8 sm:p-12 text-center text-white">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  Ready to Optimize Your Training?
                </h2>
                <p className="text-white/80 mb-8 max-w-lg mx-auto">
                  Schedule a consultation to discuss your program with our physicians.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a href="/intake" className="px-8 py-4 bg-warm-stone text-white rounded-xl font-semibold hover:bg-warm-stone/90 transition-all">
                    Start Free Assessment
                  </a>
                  <button onClick={resetForm} className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-semibold hover:border-white hover:bg-white/10 transition-all">
                    Generate New Program
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step Form */}
          {!isGenerating && !program && (
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
                {/* Step 1: Treatment & Experience */}
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">Treatment & Experience</h2>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">What treatment are you on?</h3>
                      <div className="space-y-3">
                        {treatmentOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleProfileChange('treatment', option.value)}
                            className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                              profile.treatment === option.value
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              profile.treatment === option.value ? 'border-white bg-deep-charcoal' : 'border-warm-stone/30'
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

                    <div>
                      <h3 className="font-semibold mb-3">Training Experience</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {experienceLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => handleProfileChange('experience', level.value)}
                            className={`p-3 rounded-xl border-2 text-center transition-all ${
                              profile.experience === level.value
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            <p className="font-semibold text-sm">{level.label}</p>
                            <p className={`text-xs ${profile.experience === level.value ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {level.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Equipment & Goals */}
                {step === 2 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">Equipment & Goals</h2>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Available Equipment</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {equipmentOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleProfileChange('equipment', option.value)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              profile.equipment === option.value
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            <p className="font-semibold text-sm">{option.label}</p>
                            <p className={`text-xs ${profile.equipment === option.value ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {option.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
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

                    <div>
                      <h3 className="font-semibold mb-3">Training Days Per Week</h3>
                      <div className="flex gap-2">
                        {[3, 4, 5, 6].map((days) => (
                          <button
                            key={days}
                            onClick={() => handleProfileChange('daysPerWeek', days)}
                            className={`flex-1 py-3 rounded-xl border-2 text-center font-semibold transition-all ${
                              profile.daysPerWeek === days
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone'
                            }`}
                          >
                            {days} days
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Limitations */}
                {step === 3 && (
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">Any Limitations?</h2>
                    <p className="text-muted-foreground mb-6">
                      Select any injuries or limitations so we can modify exercises accordingly (optional).
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {limitationOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleLimitation(option.value)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                            option.value === 'none'
                              ? profile.limitations.length === 0
                                ? 'bg-warm-stone border-warm-stone text-white'
                                : 'bg-soft-linen border-transparent hover:border-warm-stone text-deep-charcoal'
                              : profile.limitations.includes(option.value)
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
                      <Dumbbell className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold mb-2">Your Program Is Ready!</h2>
                    <p className="text-muted-foreground mb-6">Enter your email to generate your personalized workout program.</p>
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
                        Generate My Program
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

export default WorkoutGenerator;
