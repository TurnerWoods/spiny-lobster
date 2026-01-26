import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: "Testosterone Therapy", href: "/treatments/testosterone" },
    { name: "Sermorelin", href: "/treatments/sermorelin" },
    { name: "Tesamorelin", href: "/treatments/tesamorelin" },
    { name: "NAD+", href: "/treatments/nad" },
  ];

  const company = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "HIPAA Notice", href: "/hipaa" },
    { name: "Safety Information", href: "/safety" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logoIcon} alt="Elevare Health" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-foreground">
                Elevare<span className="text-primary">Health</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Premium testosterone therapy and men's health optimization, delivered discreetly to successful Texas professionals.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:info@elevarehealth.com" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                info@elevarehealth.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Serving Austin • Houston • Dallas
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Treatments</h4>
            <ul className="space-y-2">
              {treatments.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Elevare Health. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-center text-xs text-muted-foreground">
          <p className="mb-2">
            Elevare Health MSO LLC is a technology and administrative services company. It does not practice medicine or dispense medications.
            All medical decisions, diagnoses, and prescriptions are made exclusively by licensed physicians through Elevare Health Medical PLLC.
          </p>
          <p>
            Compounded medications are prepared by licensed U.S. pharmacies but are not FDA-approved.
            Services are currently available only to Texas residents. This is not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
