import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, X, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [showPromo, setShowPromo] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const dropdownVariants = prefersReducedMotion
    ? { hidden: {}, visible: {}, exit: {} }
    : {
        hidden: { opacity: 0, y: -4, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
        },
        exit: {
          opacity: 0,
          y: -4,
          scale: 0.98,
          transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
        },
      };

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, x: -6 },
        visible: (i: number) => ({
          opacity: 1,
          x: 0,
          transition: { delay: 0.03 * i, duration: 0.2, ease: "easeOut" as const },
        }),
      };

  const isActivePath = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // Handle scroll effect for sticky header with requestAnimationFrame for better mobile performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Eden-style navigation - individual treatments with medications/tools in dropdowns
  const weightLossDropdown = {
    title: "Weight Loss",
    href: "/treatments/weight-loss",
    treatments: [
      { name: "Tirzepatide", href: "/treatments/weight-loss#tirzepatide", rx: true, price: "$199/mo" },
      { name: "Semaglutide", href: "/treatments/weight-loss#semaglutide", rx: true, price: "$149/mo" },
      { name: "Lipotropic Injections", href: "/treatments/weight-loss#lipotropic", rx: true, price: "$99/mo" },
    ],
    tools: [
      { name: "BMI Calculator", href: "/tools/calculators/bmi" },
      { name: "TDEE Calculator", href: "/tools/calculators/tdee" },
      { name: "Calorie Calculator", href: "/tools/calculators/calorie" },
    ],
  };

  const testosteroneDropdown = {
    title: "Testosterone",
    href: "/treatments/hormones",
    treatments: [
      { name: "Testosterone Cypionate", href: "/treatments/hormones#cypionate", rx: true, price: "$149/mo" },
      { name: "Testosterone Enanthate", href: "/treatments/hormones#enanthate", rx: true, price: "$149/mo" },
      { name: "Gonadorelin", href: "/treatments/hormones#gonadorelin", rx: true, price: "$99/mo" },
    ],
    tools: [
      { name: "Hormone Quiz", href: "/tools/hormone-assessment" },
      { name: "Lab Interpreter", href: "/tools/lab-interpreter" },
    ],
  };

  const strengthDropdown = {
    title: "Strength",
    href: "/treatments/strength",
    treatments: [
      { name: "BPC-157", href: "/treatments/strength#bpc157", rx: true, price: "$149/mo" },
      { name: "Sermorelin", href: "/treatments/strength#sermorelin", rx: true, price: "$199/mo" },
      { name: "TB-500", href: "/treatments/strength#tb500", rx: true, price: "$149/mo" },
    ],
    tools: [
      { name: "Protein Calculator", href: "/tools/calculators/protein" },
      { name: "AI Workout Generator", href: "/tools/workout-generator" },
    ],
  };

  const antiAgingDropdown = {
    title: "Anti-Aging",
    href: "/treatments/anti-aging",
    treatments: [
      { name: "NAD+", href: "/treatments/anti-aging#nad", rx: true, price: "$199/mo" },
      { name: "Epitalon", href: "/treatments/anti-aging#epitalon", rx: true, price: "$179/mo" },
      { name: "GHK-Cu", href: "/treatments/anti-aging#ghkcu", rx: true, price: "$149/mo" },
    ],
    tools: [
      { name: "Lab Interpreter", href: "/tools/lab-interpreter" },
    ],
  };

  const hairDropdown = {
    title: "Hair Growth",
    href: "/treatments/hair",
    treatments: [
      { name: "Finasteride", href: "/treatments/hair#finasteride", rx: true, price: "$29/mo" },
      { name: "Minoxidil", href: "/treatments/hair#minoxidil", rx: false, price: "$39/mo" },
      { name: "Fin + Min Combo", href: "/treatments/hair#combo", rx: true, price: "$59/mo" },
    ],
    tools: [
      { name: "Treatment Match Quiz", href: "/tools/treatment-match-quiz" },
    ],
  };

  const moodDropdown = {
    title: "Mood",
    href: "/treatments/mood",
    treatments: [
      { name: "Semax", href: "/treatments/mood#semax", rx: true, price: "$129/mo" },
      { name: "Selank", href: "/treatments/mood#selank", rx: true, price: "$119/mo" },
      { name: "Methylene Blue", href: "/treatments/mood#methylene-blue", rx: true, price: "$79/mo" },
    ],
    tools: [
      { name: "Hormone Quiz", href: "/tools/hormone-assessment" },
    ],
  };

  const moreDropdown = {
    title: "More",
    items: [
      { name: "Testosterone", href: "/treatments/hormones" },
      { name: "Sexual Health", href: "/treatments/sexual-health" },
      { name: "Skin Care", href: "/treatments/skin" },
      { name: "All Tools", href: "/tools" },
      { name: "Pricing", href: "/pricing" },
      { name: "About Us", href: "/about" },
      { name: "FAQ", href: "/faq" },
    ],
  };

  // For mobile
  const allTreatments = [
    { name: "Weight Loss", href: "/treatments/weight-loss", price: "from $149/mo" },
    { name: "Testosterone", href: "/treatments/hormones", price: "from $149/mo" },
    { name: "Peptides", href: "/treatments/strength", price: "from $149/mo" },
    { name: "Hair Growth", href: "/treatments/hair", price: "from $29/mo" },
    { name: "Sexual Health", href: "/treatments/sexual-health", price: "from $49/mo" },
    { name: "Anti-Aging", href: "/treatments/anti-aging", price: "from $199/mo" },
    { name: "Mood & Focus", href: "/treatments/mood", price: "from $99/mo" },
  ];

  // Reusable dropdown component with premium styling
  const TreatmentDropdown = ({ dropdown }: { dropdown: typeof weightLossDropdown }) => (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="group relative text-[13px] font-medium tracking-wide text-rich-black/90 bg-transparent px-4 py-2 hover:bg-transparent hover:text-rich-black data-[state=open]:bg-transparent data-[state=open]:text-rich-black transition-colors duration-200">
        {dropdown.title}
        <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-warm-stone scale-x-0 group-hover:scale-x-100 group-data-[state=open]:scale-x-100 transition-transform duration-300 origin-left" />
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <motion.div
          className="w-[340px] p-5"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Treatments Section */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-stone/70 mb-3 pl-1">Treatments</p>
          <ul className="space-y-0.5 mb-5">
            {dropdown.treatments.map((item, i) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <NavigationMenuLink asChild>
                  <Link
                    to={item.href}
                    className="group/item flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200 hover:bg-soft-linen"
                  >
                    <span className="font-medium text-rich-black/90 group-hover/item:text-rich-black transition-colors">
                      {item.name}
                      {item.rx && <sup className="ml-1.5 text-[9px] font-semibold text-warm-stone/80 tracking-wide">Rx</sup>}
                    </span>
                    <span className="text-[11px] text-warm-stone/70 font-medium tracking-wide">{item.price}</span>
                  </Link>
                </NavigationMenuLink>
              </motion.li>
            ))}
          </ul>

          {/* Tools Section */}
          {dropdown.tools.length > 0 && (
            <>
              <div className="h-px bg-neutral-gray/40 mb-4" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-stone/70 mb-3 pl-1">Tools</p>
              <ul className="space-y-0.5">
                {dropdown.tools.map((tool, i) => (
                  <motion.li
                    key={tool.name}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={dropdown.treatments.length + i}
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        to={tool.href}
                        className="block rounded-lg px-3 py-2 text-[13px] text-rich-black/60 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black"
                      >
                        {tool.name}
                      </Link>
                    </NavigationMenuLink>
                  </motion.li>
                ))}
              </ul>
            </>
          )}

          {/* View All Link */}
          <Link
            to={dropdown.href}
            className="group/all mt-5 flex items-center justify-center gap-2 rounded-lg border border-warm-stone/20 px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.1em] text-warm-stone transition-all duration-300 hover:bg-warm-stone hover:text-pure-white hover:border-warm-stone"
          >
            View All {dropdown.title}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
          </Link>
        </motion.div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      {/* Promo Banner - Minimal & Elegant */}
      {showPromo && (
        <div className="relative bg-rich-black text-pure-white text-center py-2.5 px-10 sm:px-6">
          <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.05em]">
            <span className="hidden sm:inline">Limited time: </span>
            <span className="font-semibold">Save $50</span>
            <span className="mx-1.5 text-pure-white/40">|</span>
            GLP-1 Weight Loss
          </span>
          <Link
            to="/treatments/weight-loss"
            className="ml-2 sm:ml-3 inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium text-pure-white/90 hover:text-pure-white transition-colors duration-200 group"
          >
            Shop now
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 text-pure-white/50 hover:text-pure-white active:text-pure-white transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close promotional banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Header - Glassmorphism with scroll effect */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-pure-white/80 backdrop-blur-xl border-b border-neutral-gray/20 shadow-[0_1px_3px_0_rgb(0_0_0/0.04)]"
            : "bg-pure-white/95 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="container flex h-14 sm:h-16 md:h-[68px] items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo - Mobile-optimized sizing with proper touch target */}
          <Link to="/" className="flex items-center group min-h-[44px] min-w-[44px]">
            <img
              src="/elevar-logo.svg"
              alt="Elevar Health"
              loading="eager"
              className="h-7 sm:h-8 md:h-9 w-auto max-w-full transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation - Clean & Minimal */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <TreatmentDropdown dropdown={weightLossDropdown} />
              <TreatmentDropdown dropdown={strengthDropdown} />
              <TreatmentDropdown dropdown={antiAgingDropdown} />
              <TreatmentDropdown dropdown={hairDropdown} />
              <TreatmentDropdown dropdown={moodDropdown} />

              {/* More Dropdown - Refined */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group relative text-[13px] font-medium tracking-wide text-rich-black/90 bg-transparent px-4 py-2 hover:bg-transparent hover:text-rich-black data-[state=open]:bg-transparent data-[state=open]:text-rich-black transition-colors duration-200">
                  More
                  <span className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-warm-stone scale-x-0 group-hover:scale-x-100 group-data-[state=open]:scale-x-100 transition-transform duration-300 origin-left" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.ul
                    className="w-[200px] p-3"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {moreDropdown.items.map((item, i) => (
                      <motion.li
                        key={item.name}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                      >
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className="block rounded-lg px-3 py-2 text-[13px] text-rich-black/80 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black"
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons - Premium styling */}
          <div className="hidden items-center gap-3 lg:flex">
            {!isLoading && (
              <>
                {user ? (
                  <Link to="/dashboard">
                    <Button
                      size="sm"
                      className="h-9 px-5 bg-rich-black hover:bg-rich-black/90 text-pure-white text-[12px] font-medium tracking-wide rounded-full transition-all duration-300 hover:shadow-lg"
                    >
                      <User className="mr-2 h-3.5 w-3.5" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 px-4 text-[12px] font-medium tracking-wide text-rich-black/80 hover:text-rich-black hover:bg-transparent transition-colors duration-200"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/intake">
                      <Button
                        size="sm"
                        className="h-9 px-5 bg-rich-black hover:bg-deep-charcoal text-pure-white text-[12px] font-medium tracking-wide rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu - Premium slide-in */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="min-h-[44px] min-w-[44px] h-11 w-11 hover:bg-neutral-gray/10 active:bg-neutral-gray/20 transition-colors duration-200 rounded-full"
              >
                <Menu className="h-6 w-6 text-rich-black/80" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[380px] sm:max-w-[380px] p-0 border-l-0" id="mobile-menu">
              {/* Mobile Header - Compact with proper spacing for close button */}
              <SheetHeader className="border-b border-neutral-gray/15 bg-pure-white px-5 sm:px-6 py-4 pr-16">
                <SheetTitle className="flex items-center min-h-[44px]">
                  <img
                    src="/elevar-logo.svg"
                    alt="Elevar Health logo"
                    loading="eager"
                    className="h-7 sm:h-8 w-auto max-w-full"
                  />
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-76px)] sm:h-[calc(100vh-80px)]">
                <div className="flex flex-col px-4 sm:px-5 py-5 sm:py-6">
                  {/* Treatments Section */}
                  <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-stone/60">
                    Treatments
                  </p>
                  <nav className="flex flex-col gap-1 mb-6" role="navigation" aria-label="Treatment categories">
                    {allTreatments.map((item, index) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-4 min-h-[48px] py-3 transition-all duration-200 hover:bg-soft-linen active:bg-soft-linen/80 active:scale-[0.99]",
                          isActivePath(item.href) && "bg-warm-stone/10 border-l-2 border-warm-stone"
                        )}
                        aria-current={isActivePath(item.href) ? "page" : undefined}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <span className={cn(
                          "text-[15px] font-medium transition-colors",
                          isActivePath(item.href) ? "text-warm-stone" : "text-rich-black/90 group-hover:text-rich-black"
                        )}>
                          {item.name}
                        </span>
                        <span className="text-[11px] font-medium text-warm-stone/60 tracking-wide">
                          {item.price}
                        </span>
                      </Link>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="h-px bg-neutral-gray/20 mb-6" />

                  {/* Tools Section */}
                  <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-warm-stone/60">
                    Tools
                  </p>
                  <nav className="flex flex-col gap-1 mb-6" role="navigation" aria-label="Tools and calculators">
                    <Link
                      to="/tools/hormone-assessment"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      Hormone Quiz
                    </Link>
                    <Link
                      to="/tools/treatment-match-quiz"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      Treatment Match
                    </Link>
                    <Link
                      to="/tools"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      All Calculators
                    </Link>
                  </nav>

                  {/* Divider */}
                  <div className="h-px bg-neutral-gray/20 mb-6" />

                  {/* Other Links */}
                  <nav className="flex flex-col gap-1 mb-6" role="navigation" aria-label="Additional pages">
                    <Link
                      to="/pricing"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      Pricing
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/faq"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 min-h-[44px] py-3 flex items-center text-[14px] text-rich-black/70 transition-all duration-200 hover:bg-soft-linen hover:text-rich-black active:bg-soft-linen/80"
                    >
                      FAQ
                    </Link>
                  </nav>

                  {/* Auth Buttons - Touch-optimized with 48px minimum height */}
                  {!isLoading && (
                    <div className="flex flex-col gap-3 mt-4">
                      {user ? (
                        <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full min-h-[48px] h-12 bg-rich-black hover:bg-deep-charcoal active:bg-rich-black/80 text-[14px] font-medium tracking-wide rounded-xl transition-all duration-200">
                            <User className="mr-2 h-4.5 w-4.5" />
                            My Dashboard
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Link to="/intake" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="w-full min-h-[48px] h-12 bg-rich-black hover:bg-deep-charcoal active:bg-rich-black/80 text-[14px] font-medium tracking-wide rounded-xl transition-all duration-200">
                              Get Started
                              <ArrowRight className="ml-2 h-4.5 w-4.5" />
                            </Button>
                          </Link>
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                              variant="outline"
                              className="w-full min-h-[48px] h-12 text-[14px] font-medium tracking-wide rounded-xl border-neutral-gray/30 hover:bg-soft-linen hover:border-neutral-gray/50 active:bg-soft-linen/80 transition-all duration-200"
                            >
                              Sign In
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  )}

                  {/* Trust Banner - Minimal */}
                  <div className="mt-8 rounded-2xl bg-soft-linen/60 border border-neutral-gray/10 p-5">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5 text-[12px] text-rich-black/50">
                        <div className="h-1 w-1 rounded-full bg-warm-stone/40" />
                        <span>FSA/HSA Eligible</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px] text-rich-black/50">
                        <div className="h-1 w-1 rounded-full bg-warm-stone/40" />
                        <span>Free Discreet Shipping</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px] text-rich-black/50">
                        <div className="h-1 w-1 rounded-full bg-warm-stone/40" />
                        <span>100% Online Care</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default Header;
