import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestedLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/treatments/weight-loss", label: "Weight Loss", icon: Search },
    { to: "/how-it-works", label: "How It Works", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6"
            >
              <span className="font-display text-8xl font-bold tracking-tight text-warm-stone md:text-9xl">
                404
              </span>
            </motion.div>

            {/* Main Message */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 font-display text-3xl font-semibold tracking-tight text-rich-black md:text-4xl"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-lg text-warm-gray"
            >
              The page you are looking for does not exist or may have been moved.
              Let us help you find what you need.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <Link to="/">
                <Button size="lg" className="gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            {/* Suggested Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-warm-stone/10 bg-pure-white/80 p-6 shadow-sm backdrop-blur-sm"
            >
              <p className="mb-4 text-sm font-medium text-warm-stone">
                Popular pages you might be looking for:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {suggestedLinks.map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Contact Support */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-warm-gray"
            >
              Need help?{" "}
              <Link
                to="/contact"
                className="font-medium text-warm-stone underline-offset-4 hover:underline"
              >
                Contact our support team
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
