import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, List, ChevronDown, ArrowLeft, Home, Shield, FileText, AlertTriangle, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents, { TOCItem } from "./TableOfContents";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const legalPages = [
  { title: "Privacy Policy", href: "/privacy", icon: Shield, description: "How we collect and use your data" },
  { title: "Terms of Use", href: "/terms", icon: FileText, description: "Our service agreement" },
  { title: "HIPAA Notice", href: "/hipaa", icon: Lock, description: "Your health information rights" },
  { title: "Safety Information", href: "/safety", icon: AlertTriangle, description: "Important medication safety" },
];

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tocItems: TOCItem[];
  children: ReactNode;
}

const MobileTableOfContents = ({ items }: { items: TOCItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="lg:hidden mb-6">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-warm-stone/10 bg-pure-white/80 p-4 shadow-sm backdrop-blur-xl transition-colors hover:bg-pure-white">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-warm-stone" />
          <span className="font-display text-sm font-semibold text-rich-black">
            On this page
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-warm-stone transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="mt-2 rounded-xl border border-warm-stone/10 bg-pure-white/80 p-3 shadow-sm backdrop-blur-xl">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                    item.level === 2 && "pl-6",
                    "text-warm-gray hover:bg-warm-stone/5 hover:text-rich-black"
                  )}
                >
                  <span className="line-clamp-2">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const RelatedLegalPages = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const otherPages = legalPages.filter(page => page.href !== currentPath);

  return (
    <Card variant="glass" className="mt-8">
      <CardContent className="p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-rich-black">
          Related Legal Documents
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {otherPages.map((page) => {
            const PageIcon = page.icon;
            return (
              <Link
                key={page.href}
                to={page.href}
                className="group flex items-start gap-3 rounded-lg border border-warm-stone/10 bg-pure-white/50 p-4 transition-all hover:bg-warm-stone/5 hover:border-warm-stone/20"
              >
                <PageIcon className="h-5 w-5 text-warm-stone mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="block font-medium text-rich-black group-hover:text-warm-stone transition-colors">
                    {page.title}
                  </span>
                  <span className="text-sm text-warm-gray">
                    {page.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const LegalPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  tocItems,
  children,
}: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Header />
      <main className="py-12 sm:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Navigation */}
              <nav aria-label="Breadcrumb" className="mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-warm-gray hover:text-warm-stone transition-colors min-h-[44px] py-2 group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </nav>

              {/* Header Section */}
              <div className="mb-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10 ring-2 ring-warm-stone/20">
                  <Icon className="h-7 w-7 text-warm-stone" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-rich-black sm:text-4xl">
                    {title}
                  </h1>
                  <p className="text-warm-gray text-base">{subtitle}</p>
                </div>
              </div>

              {/* Mobile Table of Contents */}
              <MobileTableOfContents items={tocItems} />

              {/* Content with TOC Sidebar */}
              <div className="flex gap-8">
                {/* Table of Contents - Desktop Only */}
                <aside className="hidden w-64 shrink-0 lg:block">
                  <TableOfContents items={tocItems} />
                </aside>

                {/* Main Content */}
                <div className="min-w-0 flex-1 space-y-6">
                  {children}

                  {/* Related Legal Documents */}
                  <RelatedLegalPages />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPageLayout;
