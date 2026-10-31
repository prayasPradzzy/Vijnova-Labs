"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2, BookOpen, Briefcase, Blocks } from "lucide-react";

const reasons = [
  {
    title: "Workflow-first, not model-first",
    desc: "We design around how professionals actually work, not around what a model can technically do. Meaningful productivity gains come from removing unnecessary effort, not from adding another assistant.",
    icon: Settings2,
  },
  {
    title: "Evidence-based design",
    desc: "Our products draw on established research in psychology and organisational behaviour, not intuition.",
    icon: BookOpen,
  },
  {
    title: "Industry-specific, not generic",
    desc: "Every profession has different requirements. We build for specific workflows rather than a one-size-fits-all assistant.",
    icon: Briefcase,
  },
  {
    title: "Modular by design",
    desc: "New capabilities can be added as an organisation's needs change, without rebuilding the platform.",
    icon: Blocks,
  },
];

export function WhyVijnovaSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative w-full py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-24">
        <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
          Built differently.
        </h2>

        <ul>
          {reasons.map((r, i) => {
            const on = open === i;
            const Icon = r.icon;
            return (
              <li key={r.title} className="border-t border-bone/10 last:border-b">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(i)}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  className="group flex w-full items-start gap-5 py-7 text-left"
                >
                  <Icon className={`mt-2 h-5 w-5 shrink-0 transition-colors duration-300 ${on ? "text-ember" : "text-mist"}`} />
                  <span className="flex-1">
                    <span
                      className={`block font-display text-3xl md:text-4xl font-light tracking-tight transition-all duration-500 ${
                        on ? "translate-x-2 text-bone" : "text-mist"
                      }`}
                    >
                      {r.title}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block max-w-xl pt-4 pl-2 text-lg leading-relaxed text-mist">{r.desc}</span>
                    </motion.span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
