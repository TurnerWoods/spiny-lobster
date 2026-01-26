import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoIcon from "@/assets/logo-icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();

  const navLinks = [
    { name: "Treatments", href: "/#treatments" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-4 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-2" />
            {!isLoading && (
              <>
                {user ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary-dark">
                      <User className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/intake" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary-dark">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
