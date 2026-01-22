import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: "Weight Loss", href: "#" },
    { name: "Peptide Therapy", href: "#" },
    { name: "Hormone Therapy", href: "#" },
    { name: "Muscle & Recovery", href: "#" },
    { name: "Mental Wellness", href: "#" },
    { name: "Hair Growth", href: "#" },
  ];

  const company = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "HIPAA Notice", href: "#" },
    { name: "Consent Forms", href: "#" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logoIcon} alt="Pure Nova Health" className="h-10 w-auto" />
              <span className="font-display text-xl font-bold text-foreground">
                Pure<span className="text-primary">Nova</span>Health
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-muted-foreground">
              Modern telehealth care delivering clinically proven treatments directly to your door. 
              Licensed providers, transparent pricing, real results.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+18001234567" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Phone className="h-4 w-4" />
                (800) 123-4567
              </a>
              <a href="mailto:support@purenovahealth.com" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                support@purenovahealth.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Serving patients in all 50 states
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">Treatments</h4>
            <ul className="space-y-2">
              {treatments.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </a>
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
                  <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </a>
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
                  <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} PureNovaHealth. All rights reserved.
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
          <p>
            Compounded medications are prepared for specific patient needs and are not reviewed or approved by the FDA. 
            Prescription required. Results may vary. You must be at least 18 years old to use our services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;