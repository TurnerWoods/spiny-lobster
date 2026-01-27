import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents, { TOCItem } from "./TableOfContents";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tocItems: TOCItem[];
  children: ReactNode;
}

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
