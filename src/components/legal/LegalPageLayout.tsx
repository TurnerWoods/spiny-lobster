import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon, List, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents, { TOCItem } from "./TableOfContents";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

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
              {/* Header Section */}
              <div className="mb-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-warm-stone/10 ring-2 ring-warm-stone/20">
                  <Icon className="h-7 w-7 text-warm-stone" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-rich-black sm:text-4xl">
                    {title}
                  </h1>
                  <p className="text-warm-gray">{subtitle}</p>
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
                <div className="min-w-0 flex-1 space-y-6">{children}</div>
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
