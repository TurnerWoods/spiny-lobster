import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: "Weight Loss", href: "/treatments/weight-loss" },
    { name: "Hormones", href: "/treatments/hormones" },
    { name: "Strength", href: "/treatments/strength" },
    { name: "Anti-Aging", href: "/treatments/anti-aging" },
    { name: "Hair", href: "/treatments/hair" },
    { name: "Skin", href: "/treatments/skin" },
  ];

  const company = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Tools", href: "/tools" },
    { name: "Brand Kit", href: "/brand-kit" },
  ];

  const legal = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "HIPAA", href: "/hipaa" },
    { name: "Safety", href: "/safety" },
  ];

  return (
    <footer className="relative border-t border-warm-gray/30 bg-gradient-to-b from-soft-linen to-pure-white" role="contentinfo">
      {/* Subtle glass overlay */}
      <div className="absolute inset-0 bg-pure-white/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="container relative z-10 px-4 py-8 sm:py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2" aria-label="Elevare Health - Home">
              <img src={logoIcon} alt="" className="h-8 w-auto sm:h-10" aria-hidden="true" />
              <span className="font-display text-lg font-bold text-rich-black sm:text-xl">
                Elevare<span className="text-warm-stone">Health</span>
              </span>
            </Link>
            <p className="mb-4 max-w-sm text-sm text-muted-foreground sm:mb-6">
              Premium testosterone therapy and men's health optimization. Serving 30+ states with a primary hub in Austin, Texas.
            </p>
            <address className="space-y-2.5 text-sm text-muted-foreground not-italic">
              <a
                href="tel:512-270-8701"
                className="flex items-center gap-2 transition-colors hover:text-warm-stone hover:underline underline-offset-2"
                aria-label="Call us at 512-270-8701"
              >
                <Phone className="h-4 w-4 text-warm-stone" aria-hidden="true" />
                512-270-8701
              </a>
              <a
                href="mailto:info@elevarehealth.com"
                className="flex items-center gap-2 transition-colors hover:text-warm-stone hover:underline underline-offset-2"
                aria-label="Email us at info@elevarehealth.com"
              >
                <Mail className="h-4 w-4 text-warm-stone" aria-hidden="true" />
                info@elevarehealth.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-warm-stone" aria-hidden="true" />
                <span>1401 Lavaca St, Austin, TX</span>
              </div>
            </address>
          </div>

          {/* Treatments */}
          <nav aria-labelledby="footer-treatments-heading">
            <h4 id="footer-treatments-heading" className="mb-3 font-display font-semibold text-rich-black sm:mb-4">Treatments</h4>
            <ul className="space-y-2" role="list">
              {treatments.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-warm-stone hover:underline underline-offset-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company-heading">
            <h4 id="footer-company-heading" className="mb-3 font-display font-semibold text-rich-black sm:mb-4">Company</h4>
            <ul className="space-y-2" role="list">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-warm-stone hover:underline underline-offset-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-labelledby="footer-legal-heading">
            <h4 id="footer-legal-heading" className="mb-3 font-display font-semibold text-rich-black sm:mb-4">Legal</h4>
            <ul className="space-y-2" role="list">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-warm-stone hover:underline underline-offset-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-warm-gray/30 pt-6 text-center sm:mt-12 sm:pt-8 md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm">
            &copy; {currentYear} Elevare Health. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Dr. Paul Myers, DO &bull; Medical Director
          </p>
        </div>

        {/* Disclaimer - Glassmorphic - Fixed text size for accessibility */}
        <div className="mt-6 rounded-xl border border-neutral-gray/40 bg-pure-white/60 p-3 text-center text-xs text-muted-foreground backdrop-blur-sm sm:mt-8 sm:p-4 sm:text-sm">
          <p>
            Elevare Health MSO LLC does not practice medicine or dispense medications. All care provided by licensed physicians.
            Compounded medications are not FDA-approved. Telehealth services available in 30+ states.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
