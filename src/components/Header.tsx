import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Treatments", href: "#treatments" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="Pure Nova Health" className="h-10 w-auto" />
          <span className="hidden font-display text-xl font-bold text-foreground sm:inline-block">
            Pure<span className="text-primary">Nova</span>Health
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a 
            href="tel:+18001234567" 
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">(800) 123-4567</span>
          </a>
          <Button variant="outline" size="sm" asChild>
            <a href="#pricing">View Pricing</a>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-dark">
            Start Free Consultation
          </Button>
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
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="my-2" />
            <a 
              href="tel:+18001234567" 
              className="flex items-center gap-2 text-base font-medium text-muted-foreground"
            >
              <Phone className="h-4 w-4" />
              (800) 123-4567
            </a>
            <Button className="w-full bg-primary hover:bg-primary-dark">
              Start Free Consultation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;