import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  title: string;
  level?: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

const TableOfContents = ({ items, className }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className={cn(
        "sticky top-20 md:top-24 h-fit rounded-xl border border-warm-stone/10 bg-pure-white/95 md:bg-pure-white/80 p-4 md:p-5 shadow-sm backdrop-blur-xl max-h-[calc(100vh-6rem)] overflow-y-auto",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <List className="h-4 w-4 text-warm-stone" />
        <h3 className="font-display text-sm font-semibold text-rich-black">On this page</h3>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "group flex w-full items-center gap-2 rounded-md px-3 py-2.5 md:py-2 min-h-[44px] text-left text-sm transition-all duration-200",
                item.level === 2 && "pl-6",
                activeId === item.id
                  ? "bg-warm-stone/10 text-warm-stone font-medium"
                  : "text-warm-gray/80 hover:bg-warm-stone/5 hover:text-rich-black"
              )}
            >
              <ChevronRight
                className={cn(
                  "h-3 w-3 flex-shrink-0 transition-transform duration-200",
                  activeId === item.id ? "text-warm-stone" : "text-warm-gray/80",
                  activeId === item.id && "translate-x-0.5"
                )}
              />
              <span className="line-clamp-2">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default TableOfContents;
