import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Brain,
  Calculator,
  Flame,
  Scale,
  Dumbbell,
  ArrowRight,
  Sparkles,
  FlaskConical,
  Utensils,
  Dumbbell as WorkoutIcon
} from "lucide-react";
import { motion } from "framer-motion";

// AI-Powered Tools (Featured)
const aiTools = [
  {
    id: "lab-interpreter",
    title: "Lab Results Interpreter",
    description: "AI explains your lab values in plain language, identifies patterns, and generates questions for your physician.",
    icon: FlaskConical,
    aiPowered: true,
    route: "/tools/lab-interpreter",
    color: "from-warm-stone to-deep-charcoal",
    featured: true,
  },
  {
    id: "hormone-assessment",
    title: "Hormone Health Assessment",
    description: "AI-powered comprehensive evaluation of your hormonal health symptoms and risk factors.",
    icon: Brain,
    aiPowered: true,
    route: "/tools/hormone-assessment",
    color: "from-warm-stone to-deep-charcoal",
    featured: true,
  },
  {
    id: "treatment-match",
    title: "Treatment Match Quiz",
    description: "Find your personalized treatment recommendation based on your health goals and lifestyle.",
    icon: Sparkles,
    aiPowered: true,
    route: "/tools/treatment-match-quiz",
    color: "from-warm-stone to-deep-charcoal",
    featured: true,
  },
  {
    id: "meal-planner",
    title: "AI Meal Planner",
    description: "Get treatment-specific nutrition plans with Texas restaurant recommendations and H-E-B shopping lists.",
    icon: Utensils,
    aiPowered: true,
    route: "/tools/meal-planner",
    color: "from-warm-stone to-deep-charcoal",
    featured: true,
  },
  {
    id: "workout-generator",
    title: "AI Workout Generator",
    description: "Treatment-optimized exercise programs for muscle building, fat loss, and recovery.",
    icon: WorkoutIcon,
    aiPowered: true,
    route: "/tools/workout-generator",
    color: "from-warm-stone to-deep-charcoal",
    featured: true,
  },
];

// Health Calculators
const calculatorTools = [
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure for optimal nutrition planning.",
    icon: Flame,
    aiPowered: false,
    route: "/tools/calculators/tdee",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index with personalized health insights.",
    icon: Scale,
    aiPowered: false,
    route: "/tools/calculators/bmi",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "bmr",
    title: "BMR Calculator",
    description: "Find your Basal Metabolic Rate - the calories you burn at rest.",
    icon: Activity,
    aiPowered: false,
    route: "/tools/calculators/bmr",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "protein",
    title: "Protein Calculator",
    description: "Determine your optimal daily protein intake based on your goals.",
    icon: Dumbbell,
    aiPowered: false,
    route: "/tools/calculators/protein",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "calorie",
    title: "Calorie Calculator",
    description: "Get personalized calorie recommendations for your fitness journey.",
    icon: Calculator,
    aiPowered: false,
    route: "/tools/calculators/calorie",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "carb",
    title: "Carb Calculator",
    description: "Calculate optimal carbohydrate intake for your diet type.",
    icon: Calculator,
    aiPowered: false,
    route: "/tools/calculators/carb",
    color: "from-warm-stone/80 to-warm-stone",
  },
];

// Combined for backward compatibility
const tools = [...aiTools, ...calculatorTools];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Tools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen to-light-cloud">
      <Header />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section with Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-stone/10 border border-warm-stone/20 mb-6">
                <Activity className="h-4 w-4 text-warm-stone" />
                <span className="text-sm font-medium text-warm-stone">AI-Powered Health Intelligence</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rich-black mb-6">
                Health Tools & <span className="text-warm-stone">Calculators</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Discover personalized insights with our suite of AI-enhanced health tools. 
                Get actionable recommendations tailored to your unique health profile.
              </p>
            </div>
            
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/lifestyle/mental-clarity.png" 
                  alt="Focus and mental clarity"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* AI-Powered Tools Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-warm-stone to-deep-charcoal">
              <Sparkles className="h-5 w-5 text-pure-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-rich-black">AI-Powered Tools</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aiTools.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <Link to={tool.route}>
                  <Card
                    variant="glass"
                    className={`group h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-warm-stone/20 ${tool.featured ? 'ring-1 ring-warm-stone/20' : ''}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-md group-hover:scale-110 transition-transform`}>
                          <tool.icon className="h-6 w-6 text-pure-white" />
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-warm-stone/10 border border-warm-stone/20">
                          <Sparkles className="h-3 w-3 text-warm-stone" />
                          <span className="text-xs font-semibold text-warm-stone">AI-Powered</span>
                        </span>
                      </div>
                      <CardTitle className="text-xl font-display text-rich-black group-hover:text-warm-stone transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {tool.description}
                      </CardDescription>
                      <div className="flex items-center text-warm-stone font-semibold text-sm group-hover:gap-2 transition-all">
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Health Calculators Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-warm-stone/20">
              <Calculator className="h-5 w-5 text-warm-stone" />
            </div>
            <h2 className="text-2xl font-display font-bold text-rich-black">Health Calculators</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {calculatorTools.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <Link to={tool.route}>
                  <Card
                    variant="glass"
                    className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-warm-stone/10"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${tool.color} shadow-sm group-hover:scale-105 transition-transform`}>
                          <tool.icon className="h-5 w-5 text-pure-white" />
                        </div>
                        <CardTitle className="text-lg font-display text-rich-black group-hover:text-warm-stone transition-colors pt-0.5">
                          {tool.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground text-sm mb-3">
                        {tool.description}
                      </CardDescription>
                      <div className="flex items-center text-warm-stone font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Calculate</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card variant="glassDark" className="inline-block p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-pure-white mb-4">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-pure-white/70 mb-6 max-w-xl">
              Complete your health assessment and get personalized treatment recommendations from our medical team.
            </p>
            <Link to="/intake">
              <Button size="lg" className="bg-warm-stone hover:bg-warm-stone/90 text-pure-white">
                Begin Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Tools;
