import { Link, useLocation } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MobileBottomCTA = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Pages where we don't show the bottom CTA
  const hiddenPaths = ["/intake", "/dashboard", "/login", "/signup"];
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show after scrolling down 300px
      if (currentScrollY > 300) {
        // Hide when scrolling down quickly, show when scrolling up or slowly
        if (currentScrollY < lastScrollY || currentScrollY - lastScrollY < 10) {
          setIsVisible(true);
        } else if (currentScrollY - lastScrollY > 50) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (shouldHide) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md p-3 shadow-lg md:hidden"
        >
          <div className="flex items-center gap-2">
            <Link to="/intake" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary-dark" size="lg">
                Start Free Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="px-3">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            No payment required • 5-minute assessment • Physician reviewed
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomCTA;
