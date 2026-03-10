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
  TrendingUp,
  Stethoscope
} from "lucide-react";
import { motion } from "framer-motion";

// AI-Powered Premium Tools
const aiTools = [
  {
    id: "hormone-assessment",
    title: "Hormone Health Assessment",
    description: "AI-powered symptom analysis to identify patterns consistent with hormonal imbalance. Get personalized risk assessment and next steps.",
    icon: Brain,
    persona: "Dr. Marcus",
    personaRole: "Hormone Specialist",
    route: "/tools/hormone-assessment",
    duration: "3 min",
    featured: true,
  },
  {
    id: "treatment-match",
    title: "Treatment Match Quiz",
    description: "Interactive AI that matches your goals with TRT, GLP-1, Peptides, or combinations. See pricing and expected outcomes.",
    icon: Sparkles,
    persona: "Sarah",
    personaRole: "Health Concierge",
    route: "/tools/treatment-match-quiz",
    duration: "5 min",
    featured: true,
  },
  {
    id: "lab-interpreter",
    title: "Lab Results Interpreter",
    description: "Upload your lab values and get plain-language explanations of what each marker means. Identify values outside optimal range.",
    icon: Stethoscope,
    persona: "Dr. Chen",
    personaRole: "Lab Specialist",
    route: "/tools/lab-interpreter",
    duration: "2 min",
    featured: true,
  },
  {
    id: "meal-planner",
    title: "AI Meal Planner",
    description: "Personalized nutrition plans based on your treatment protocol. Weekly meals, grocery lists, and Texas restaurant recommendations.",
    icon: Utensils,
    persona: "Chef Antonio",
    personaRole: "Nutrition Expert",
    route: "/tools/meal-planner",
    duration: "3 min",
    featured: false,
  },
  {
    id: "workout-generator",
    title: "AI Workout Generator",
    description: "Custom workout programs that complement your treatment. TRT-optimized strength training or GLP-1 muscle preservation.",
    icon: Dumbbell,
    persona: "Coach Ryan",
    personaRole: "Fitness Specialist",
    route: "/tools/workout-generator",
    duration: "3 min",
    featured: false,
  },
  {
    id: "progress-predictor",
    title: "Progress Predictor",
    description: "See your expected timeline based on patients like you. Weight loss projections, energy curves, and strength estimates.",
    icon: TrendingUp,
    persona: "Elevare AI",
    personaRole: "Forecaster",
    route: "/tools/progress-predictor",
    duration: "2 min",
    featured: false,
  },
];

// Standard Calculators with AI Enhancement
const calculators = [
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Total Daily Energy Expenditure with AI-powered meal timing recommendations.",
    icon: Flame,
    route: "/tools/calculators/tdee",
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Body Mass Index with context on how treatments affect body composition.",
    icon: Scale,
    route: "/tools/calculators/bmi",
  },
  {
    id: "bmr",
    title: "BMR Calculator",
    description: "Basal Metabolic Rate - understand your baseline calorie needs.",
    icon: Activity,
    route: "/tools/calculators/bmr",
  },
  {
    id: "protein",
    title: "Protein Calculator",
    description: "Optimal protein intake with timing and source recommendations.",
    icon: Dumbbell,
    route: "/tools/calculators/protein",
  },
  {
    id: "calorie",
    title: "Calorie Calculator",
    description: "Personalized targets based on your goals and treatment protocol.",
    icon: Calculator,
    route: "/tools/calculators/calorie",
  },
  {
    id: "carb",
    title: "Carb Calculator",
    description: "Optimal carbohydrate intake for your diet and activity level.",
    icon: FlaskConical,
    route: "/tools/calculators/carb",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

// Gold-framed tool card component
const AIToolCard = ({ tool }: { tool: typeof aiTools[0] }) => (
  <Link to={tool.route}>
    <Card 
      className={`group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
        tool.featured 
          ? 'bg-gradient-to-br from-deep-charcoal via-deep-charcoal to-warm-stone/20 border-warm-stone/30 hover:border-warm-stone/50' 
          : 'bg-pure-white/80 backdrop-blur-sm border-warm-stone/20 hover:border-warm-stone/40'
      }`}
    >
      <CardContent className="p-6">
        {/* Gold-framed Icon */}
        <div className="mb-5 flex items-start justify-between">
          <div className="relative">
            {/* Gold ring frame */}
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
              tool.featured 
                ? 'bg-gradient-to-br from-[#C9A962] via-[#D4B86A] to-[#C9A962] p-[2px]' 
                : 'bg-gradient-to-br from-warm-stone via-warm-stone/80 to-warm-stone p-[2px]'
            }`}>
              <div className={`flex h-full w-full items-center justify-center rounded-full ${
                tool.featured ? 'bg-deep-charcoal' : 'bg-soft-linen'
              }`}>
                <tool.icon className={`h-7 w-7 ${tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'}`} />
              </div>
            </div>
          </div>
          
          {/* AI Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            tool.featured 
              ? 'bg-[#C9A962]/20 border border-[#C9A962]/30' 
              : 'bg-warm-stone/10 border border-warm-stone/20'
          }`}>
            <Sparkles className={`h-3 w-3 ${tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'}`} />
            <span className={`text-xs font-semibold ${tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'}`}>AI</span>
          </div>
        </div>

        {/* Content */}
        <h3 className={`mb-2 font-display text-xl font-bold ${
          tool.featured ? 'text-pure-white' : 'text-rich-black'
        } group-hover:${tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'} transition-colors`}>
          {tool.title}
        </h3>
        
        <p className={`mb-4 text-sm leading-relaxed ${tool.featured ? 'text-warm-gray' : 'text-muted-foreground'}`}>
          {tool.description}
        </p>

        {/* Persona & Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full ${
              tool.featured 
                ? 'bg-gradient-to-br from-[#C9A962]/30 to-[#C9A962]/10 border border-[#C9A962]/30' 
                : 'bg-warm-stone/10 border border-warm-stone/20'
            } flex items-center justify-center`}>
              <span className={`text-xs font-bold ${tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'}`}>
                {tool.persona.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className={`text-xs font-semibold ${tool.featured ? 'text-pure-white/80' : 'text-rich-black'}`}>{tool.persona}</p>
              <p className={`text-xs ${tool.featured ? 'text-warm-gray' : 'text-muted-foreground'}`}>{tool.personaRole}</p>
            </div>
          </div>
          <span className={`text-xs font-medium ${tool.featured ? 'text-warm-gray' : 'text-muted-foreground'}`}>
            {tool.duration}
          </span>
        </div>

        {/* CTA */}
        <div className={`mt-4 flex items-center font-medium text-sm ${
          tool.featured ? 'text-[#C9A962]' : 'text-warm-stone'
        } group-hover:gap-2 transition-all`}>
          <span>Start Assessment</span>
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

// Calculator card component
const CalculatorCard = ({ calc }: { calc: typeof calculators[0] }) => (
  <Link to={calc.route}>
    <Card 
      className="group h-full bg-pure-white/60 backdrop-blur-sm border-neutral-gray/50 hover:border-warm-stone/30 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <CardContent className="p-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-warm-stone/10 to-warm-stone/5 border border-warm-stone/20">
          <calc.icon className="h-5 w-5 text-warm-stone" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base font-bold text-rich-black group-hover:text-warm-stone transition-colors">
            {calc.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{calc.description}</p>
        </div>
        <ArrowRight className="h-4 w-4 text-warm-stone/40 group-hover:text-warm-stone group-hover:translate-x-1 transition-all shrink-0 mt-1" />
      </CardContent>
    </Card>
  </Link>
);

const Tools = () => {
  const featuredTools = aiTools.filter(t => t.featured);
  const otherAITools = aiTools.filter(t => !t.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C9A962]/20 to-warm-stone/20 border border-[#C9A962]/30 mb-6">
            <Sparkles className="h-4 w-4 text-[#C9A962]" />
            <span className="text-sm font-semibold text-[#C9A962]">AI-Powered Health Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rich-black mb-6">
            Health Tools & <span className="bg-gradient-to-r from-warm-stone to-[#C9A962] bg-clip-text text-transparent">AI Assessments</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Go beyond basic calculators. Our AI specialists analyze your unique profile 
            and provide personalized insights you won't find anywhere else.
          </p>
        </motion.div>

        {/* Featured AI Tools (3 columns) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A962]/30 to-transparent" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#C9A962]">Featured AI Assessments</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C9A962]/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <AIToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other AI Tools */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-warm-stone/30 to-transparent" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-warm-stone">More AI Tools</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-warm-stone/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherAITools.map((tool) => (
              <motion.div key={tool.id} variants={itemVariants}>
                <AIToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Calculators Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-gray/50 to-transparent" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">AI-Enhanced Calculators</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-gray/50 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculators.map((calc) => (
              <motion.div key={calc.id} variants={itemVariants}>
                <CalculatorCard calc={calc} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="inline-block p-8 md:p-12 bg-gradient-to-br from-deep-charcoal via-deep-charcoal to-warm-stone/20 border-warm-stone/30">
            <div className="flex h-16 w-16 mx-auto mb-6 items-center justify-center rounded-full bg-gradient-to-br from-[#C9A962] via-[#D4B86A] to-[#C9A962] p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-deep-charcoal">
                <Sparkles className="h-7 w-7 text-[#C9A962]" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-pure-white mb-4">
              Ready for Expert Care?
            </h2>
            <p className="text-warm-gray mb-6 max-w-xl">
              Complete your health assessment and get personalized treatment recommendations from our Texas-licensed physicians.
            </p>
            <Link to="/intake">
              <Button size="lg" className="bg-[#C9A962] hover:bg-[#C9A962]/90 text-deep-charcoal font-semibold">
                Start Free Assessment
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
