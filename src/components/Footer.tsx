import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: "Testosterone", href: "/treatments/testosterone" },
    { name: "Sermorelin", href: "/treatments/sermorelin" },
    { name: "Tesamorelin", href: "/treatments/tesamorelin" },
    { name: "NAD+", href: "/treatments/nad" },
  ];

  const company = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "HIPAA", href: "/hipaa" },
    { name: "Safety", href: "/safety" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-8 sm:py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <img src={logoIcon} alt="Elevare Health" className="h-8 w-auto sm:h-10" />
              <span className="font-display text-lg font-bold text-foreground sm:text-xl">
                Elevare<span className="text-primary">Health</span>
              </span>
            </Link>
            <p className="mb-4 max-w-sm text-sm text-muted-foreground sm:mb-6">
              Premium testosterone therapy and men's health optimization for Texas professionals.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:info@elevarehealth.com" className="flex items-center gap-2 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                info@elevarehealth.com
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                Austin • Houston • Dallas
              </div>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="mb-3 font-display font-semibold text-foreground sm:mb-4">Treatments</h4>
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
            <h4 className="mb-3 font-display font-semibold text-foreground sm:mb-4">Company</h4>
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
            <h4 className="mb-3 font-display font-semibold text-foreground sm:mb-4">Legal</h4>
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
        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t pt-6 text-center sm:mt-12 sm:pt-8 md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {currentYear} Elevare Health. All rights reserved.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-lg bg-muted/50 p-3 text-center text-[10px] text-muted-foreground sm:mt-8 sm:p-4 sm:text-xs">
          <p>
            Elevare Health MSO LLC does not practice medicine or dispense medications. All care provided by licensed physicians.
            Compounded medications are not FDA-approved. Texas residents only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
