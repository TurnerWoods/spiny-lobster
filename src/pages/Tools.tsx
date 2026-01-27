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
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const tools = [
  {
    id: "hormone-assessment",
    title: "Hormone Health Assessment",
    description: "AI-powered comprehensive evaluation of your hormonal health and symptoms.",
    icon: Brain,
    aiPowered: true,
    route: "/symptom-checker",
    color: "from-warm-stone to-deep-charcoal",
  },
  {
    id: "treatment-match",
    title: "Treatment Match Quiz",
    description: "Find your personalized treatment recommendation based on your health goals.",
    icon: Sparkles,
    aiPowered: true,
    route: "/tools/treatment-match",
    color: "from-warm-stone to-deep-charcoal",
  },
  {
    id: "tdee",
    title: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure for optimal nutrition planning.",
    icon: Flame,
    aiPowered: false,
    route: "/tools/tdee",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index with personalized health insights.",
    icon: Scale,
    aiPowered: false,
    route: "/tools/bmi",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "protein",
    title: "Protein Calculator",
    description: "Determine your optimal daily protein intake based on your goals.",
    icon: Dumbbell,
    aiPowered: false,
    route: "/tools/protein",
    color: "from-warm-stone/80 to-warm-stone",
  },
  {
    id: "calorie",
    title: "Calorie Calculator",
    description: "Get personalized calorie recommendations for your fitness journey.",
    icon: Calculator,
    aiPowered: false,
    route: "/tools/calories",
    color: "from-warm-stone/80 to-warm-stone",
  },
];

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-stone/10 border border-warm-stone/20 mb-6">
            <Activity className="h-4 w-4 text-warm-stone" />
            <span className="text-sm font-medium text-warm-stone">AI-Powered Health Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-rich-black mb-6">
            Health Tools & <span className="text-warm-stone">Calculators</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover personalized insights with our suite of AI-enhanced health tools. 
            Get actionable recommendations tailored to your unique health profile.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <Link to={tool.route}>
                <Card 
                  variant="glass" 
                  className="group h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-warm-stone/10"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-md`}>
                        <tool.icon className="h-6 w-6 text-pure-white" />
                      </div>
                      {tool.aiPowered && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warm-stone/10 border border-warm-stone/20">
                          <Sparkles className="h-3 w-3 text-warm-stone" />
                          <span className="text-xs font-medium text-warm-stone">AI-Powered</span>
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl font-display text-rich-black group-hover:text-warm-stone transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {tool.description}
                    </CardDescription>
                    <div className="flex items-center text-warm-stone font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
            <p className="text-warm-gray mb-6 max-w-xl">
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
