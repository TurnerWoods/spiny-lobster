import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Shield, Award, CheckCircle2, Truck, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const treatments = [
    { name: "Weight Loss", href: "/treatments/weight-loss" },
    { name: "Hormone Therapy", href: "/treatments/hormones" },
    { name: "Strength & Performance", href: "/treatments/strength" },
    { name: "Anti-Aging", href: "/treatments/anti-aging" },
    { name: "Hair Restoration", href: "/treatments/hair" },
    { name: "Skin Health", href: "/treatments/skin" },
    { name: "Sexual Health", href: "/treatments/sexual-health" },
    { name: "Mood & Wellness", href: "/treatments/mood" },
  ];

  const company = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const resources = [
    { name: "Health Tools", href: "/tools" },
    { name: "Symptom Checker", href: "/symptom-checker" },
    { name: "BMI Calculator", href: "/tools/bmi" },
    { name: "Lab Interpreter", href: "/tools/lab-interpreter" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
    { name: "HIPAA Notice", href: "/hipaa" },
    { name: "Safety Information", href: "/safety" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/elevarehealth" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/elevarehealth" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/elevarehealth" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/elevarehealth" },
  ];

  const trustBadges = [
    { icon: Award, label: "US-Licensed Physicians" },
    { icon: CheckCircle2, label: "FDA-Registered Pharmacy Partners" },
    { icon: Shield, label: "HIPAA Compliant" },
    { icon: Truck, label: "Discreet Shipping" },
  ];

  return (
    <footer className="relative border-t border-warm-gray/20 bg-gradient-to-b from-soft-linen via-soft-linen/50 to-pure-white">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-warm-stone/[0.02] to-transparent" />

      <div className="container relative z-10 px-5 py-10 sm:px-6 sm:py-16 lg:py-20">
        {/* Trust Badges Section - Stacks vertically on mobile */}
        <div className="mb-10 flex flex-col items-center gap-4 border-b border-warm-gray/20 pb-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:mb-16 lg:gap-10 lg:pb-12">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 text-warm-stone">
              <badge.icon className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide text-rich-black/80 sm:text-base">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Footer Grid - Single column on mobile for better readability */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-8">
          {/* Brand Column - Full width on mobile */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 lg:pr-8">
            <Link
              to="/"
              className="mb-5 inline-flex min-h-[44px] items-center py-1 transition-opacity hover:opacity-80 active:opacity-70"
            >
              <img
                src="/elevar-logo.svg"
                alt="Elevare Health - Hormone & Peptide Therapy for Men & Women"
                loading="lazy"
                className="h-8 w-auto max-w-full sm:h-10 md:h-12"
              />
            </Link>
            <p className="mb-6 max-w-sm text-[15px] leading-relaxed text-rich-black/90 sm:text-base">
              Premium hormone and peptide therapy for men and women. Physician-led care, delivered to your door.
            </p>

            {/* Contact Info - Improved touch targets (min 48px height) */}
            <div className="mb-6 -mx-2 space-y-1 text-sm text-rich-black/90">
              <a
                href="tel:512-270-8701"
                className="group flex min-h-[48px] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-warm-stone/10 hover:text-deep-charcoal active:bg-warm-stone/15"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/15">
                  <Phone className="h-4 w-4 text-warm-stone" />
                </span>
                <span className="font-medium text-[15px]">(512) 270-8701</span>
              </a>
              <a
                href="mailto:info@elevarehealth.com"
                className="group flex min-h-[48px] items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-warm-stone/10 hover:text-deep-charcoal active:bg-warm-stone/15"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10 transition-colors group-hover:bg-warm-stone/15">
                  <Mail className="h-4 w-4 text-warm-stone" />
                </span>
                <span className="font-medium text-[15px] break-all sm:break-normal">info@elevarehealth.com</span>
              </a>
              <div className="flex min-h-[48px] items-center gap-3 rounded-xl px-2 py-2">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-warm-stone/10">
                  <MapPin className="h-4 w-4 text-warm-stone" />
                </span>
                <span className="text-[15px]">1401 Lavaca St, Austin, TX 78701</span>
              </div>
            </div>

            {/* Social Links - 44px minimum touch targets for accessibility */}
            <div className="flex items-center gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-gray/40 bg-pure-white text-deep-charcoal/85 transition-all hover:border-warm-stone hover:bg-warm-stone/10 hover:text-rich-black active:scale-95 active:bg-warm-stone/15 sm:h-10 sm:w-10"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-5 w-5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Treatments - Full width on mobile with proper tap targets */}
          <div className="col-span-1">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-rich-black/95 sm:mb-4">
              Treatments
            </h4>
            <ul className="-mx-2 space-y-0.5 sm:mx-0 sm:space-y-1">
              {treatments.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block min-h-[44px] rounded-lg px-2 py-2.5 text-[15px] text-deep-charcoal/90 transition-colors hover:bg-warm-stone/10 hover:text-rich-black hover:underline active:bg-warm-stone/15 sm:min-h-0 sm:px-0 sm:py-1 sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - Full width on mobile with proper tap targets */}
          <div className="col-span-1">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-rich-black/95 sm:mb-4">
              Company
            </h4>
            <ul className="-mx-2 space-y-0.5 sm:mx-0 sm:space-y-1">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block min-h-[44px] rounded-lg px-2 py-2.5 text-[15px] text-deep-charcoal/90 transition-colors hover:bg-warm-stone/10 hover:text-rich-black hover:underline active:bg-warm-stone/15 sm:min-h-0 sm:px-0 sm:py-1 sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Full width on mobile with proper tap targets */}
          <div className="col-span-1">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-rich-black/95 sm:mb-4">
              Resources
            </h4>
            <ul className="-mx-2 space-y-0.5 sm:mx-0 sm:space-y-1">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block min-h-[44px] rounded-lg px-2 py-2.5 text-[15px] text-deep-charcoal/90 transition-colors hover:bg-warm-stone/10 hover:text-rich-black hover:underline active:bg-warm-stone/15 sm:min-h-0 sm:px-0 sm:py-1 sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Full width on mobile with proper tap targets */}
          <div className="col-span-1">
            <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-rich-black/95 sm:mb-4">
              Legal
            </h4>
            <ul className="-mx-2 space-y-0.5 sm:mx-0 sm:space-y-1">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block min-h-[44px] rounded-lg px-2 py-2.5 text-[15px] text-deep-charcoal/90 transition-colors hover:bg-warm-stone/10 hover:text-rich-black hover:underline active:bg-warm-stone/15 sm:min-h-0 sm:px-0 sm:py-1 sm:text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Improved mobile spacing and readability */}
        <div className="mt-10 border-t border-warm-gray/20 pt-6 sm:mt-12 sm:pt-8 lg:mt-16">
          <div className="flex flex-col items-center gap-5 text-center sm:gap-4 md:flex-row md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-1.5 md:items-start">
              <p className="text-[15px] text-deep-charcoal/85 sm:text-sm">
                {currentYear} Elevare Health. All rights reserved.
              </p>
              <p className="text-sm text-deep-charcoal/80 sm:text-xs">
                Serving patients in 30+ states across the United States.
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 md:items-end">
              <p className="text-[15px] font-medium text-rich-black/95 sm:text-sm">
                Medical Director: Paul Myers, DO
              </p>
              <p className="text-sm text-deep-charcoal/85 sm:text-xs">
                Board Certified Physician
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer - Better mobile padding and text sizing */}
        <div className="mt-6 rounded-2xl border border-warm-gray/30 bg-gradient-to-br from-pure-white/80 to-soft-linen/40 p-4 backdrop-blur-sm sm:mt-8 sm:p-6">
          <p className="text-center text-xs leading-relaxed text-deep-charcoal/85 sm:text-sm sm:leading-relaxed">
            <span className="font-semibold text-rich-black/95">Important Notice:</span>{" "}
            Elevare Health MSO LLC does not practice medicine or dispense medications. All medical care is provided by
            independently licensed physicians. Compounded medications are prepared by licensed pharmacies and are not
            FDA-approved. Individual results may vary. Telehealth services are available where permitted by state law.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
