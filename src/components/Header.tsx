import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/logo-icon.png";
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

  const navLinks = [
    { name: "Treatments", href: "/#treatments" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="Elevare Health" className="h-10 w-auto" />
          <span className="hidden font-display text-xl font-bold text-foreground sm:inline-block">
            Elevare<span className="text-primary">Health</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
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
                    <User className="mr-2 h-4 w-4" />
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
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="flex items-center gap-2">
                <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto" />
                <span className="font-display text-lg font-bold">
                  Elevare<span className="text-primary">Health</span>
                </span>
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="flex flex-col p-4">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      {link.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-4 h-px bg-border" />

                {/* Auth Buttons */}
                {!isLoading && (
                  <div className="flex flex-col gap-3">
                    {user ? (
                      <Link to="/dashboard">
                        <Button className="w-full bg-primary hover:bg-primary-dark">
                          <User className="mr-2 h-4 w-4" />
                          My Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/intake">
                          <Button className="w-full bg-primary hover:bg-primary-dark">
                            Get Started
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                )}

                {/* Additional Info */}
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground">Need help?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our team is available 24/7 to answer your questions.
                  </p>
                  <Link to="/contact" className="mt-3 block">
                    <Button variant="outline" size="sm" className="w-full">
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
