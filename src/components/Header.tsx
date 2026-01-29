import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/logo-icon.png";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const Header = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Treatments", href: "/#treatments" },
    { name: "Tools", href: "/tools" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/#faq" },
  ];

  // Check if a nav link is active
  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      // Hash links - active only on homepage with matching hash
      return location.pathname === "/" && location.hash === href.replace("/", "");
    }
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="" className="h-10 w-auto" aria-hidden="true" />
          <span className="hidden font-display text-xl font-bold text-foreground sm:inline-block">
            Elevare<span className="text-primary">Health</span>
          </span>
          <span className="sr-only">Elevare Health - Home</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isLinkActive(link.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              )}
              aria-current={isLinkActive(link.href) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {!isLoading && (
            <>
              {user ? (
                <Link to="/dashboard">
                  <Button size="sm" className="bg-primary hover:bg-primary-dark">
                    <User className="mr-2 h-4 w-4" aria-hidden="true" />
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/intake">
                    <Button size="sm" className="bg-primary hover:bg-primary-dark">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(300px,85vw)] p-0"
            id="mobile-menu"
            aria-label="Mobile navigation menu"
          >
            <SheetHeader className="border-b border-warm-stone/20 bg-soft-linen/50 p-4">
              <SheetTitle className="flex items-center gap-2">
                <img src={logoIcon} alt="" className="h-8 w-auto" aria-hidden="true" />
                <span className="font-display text-lg font-bold text-rich-black">
                  Elevare<span className="text-warm-stone">Health</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)] h-[calc(100dvh-80px)]">
              <div className="flex flex-col p-4">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-warm-stone/10 hover:text-warm-stone",
                        isLinkActive(link.href)
                          ? "bg-warm-stone/10 text-warm-stone font-semibold"
                          : "text-rich-black"
                      )}
                      aria-current={isLinkActive(link.href) ? "page" : undefined}
                    >
                      {link.name}
                      <ChevronRight className="h-4 w-4 text-warm-stone/60" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-4 h-px bg-warm-stone/20" role="separator" />

                {/* Auth Buttons */}
                {!isLoading && (
                  <div className="flex flex-col gap-3">
                    {user ? (
                      <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary-dark">
                          <User className="mr-2 h-4 w-4" aria-hidden="true" />
                          My Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/intake" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full bg-primary hover:bg-primary-dark">
                            Get Started
                          </Button>
                        </Link>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                )}

                {/* Additional Info */}
                <div className="mt-6 rounded-xl border border-warm-stone/20 bg-soft-linen/60 backdrop-blur-sm p-4">
                  <p className="text-sm font-medium text-rich-black">Need help?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our team is available 24/7 to answer your questions.
                  </p>
                  <Link to="/contact" className="mt-3 block" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-warm-stone/30 hover:bg-warm-stone/10">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
