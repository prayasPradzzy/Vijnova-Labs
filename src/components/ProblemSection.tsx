"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  ["Designed around model capabilities", "Designed around human decisions & workflow"],
  ["Fragmented and duplicated workflows", "Integrated, end-to-end process automation"],
  ["Opaque recommendations & black-box logic", "Transparent, evidence-based oversight"],
  ["One-size-fits-all generic interface", "Domain & industry-specific customisation"],
  ["Assumption-driven automation", "Cognitive mapping & human-validated control"],
];

export function ProblemSection() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="relative w-full py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
            AI adoption is broken.
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-mist max-w-[34rem]">
            <p>
              Artificial intelligence has become widely accessible, yet meaningful adoption remains
              difficult. Many organisations invest in multiple AI tools expecting dramatic
              improvements, only to end up with fragmented workflows, duplicated effort, and
              inconsistent outputs.
            </p>
            <p>
              The issue is rarely the quality of the underlying AI models. It&apos;s that{" "}
              <span className="text-bone">
                most tools are designed around what the technology can do, not around how the work
                actually gets done.
              </span>
            </p>
            <p>
              Knowledge workers don&apos;t need another generic AI assistant. They need tools that
              understand how they make decisions, collaborate with colleagues, and serve their
              clients.
            </p>
          </div>
        </div>

        <div className="self-center">
          <div className="grid grid-cols-2 gap-x-6 pb-4 text-sm">
            <span className="text-mist">Generic AI assistants</span>
            <span className="text-ember">The Vijnova approach</span>
          </div>
          <ul onMouseLeave={() => setHover(null)}>
            {rows.map(([bad, good], i) => {
              const on = hover === i;
              return (
                <motion.li
                  key={bad}
                  onMouseEnter={() => setHover(i)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative grid grid-cols-2 gap-x-6 border-t border-bone/10 py-6"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 top-[-1px] h-px origin-left bg-ember"
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="flex gap-3 text-mist/80">
                    <X className="mt-1 h-4 w-4 shrink-0 text-mist/50" />
                    <span className={`transition-opacity duration-300 ${on ? "opacity-40" : ""}`}>{bad}</span>
                  </span>
                  <span className={`flex gap-3 transition-colors duration-300 ${on ? "text-bone" : "text-bone/80"}`}>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-ember" />
                    {good}
                  </span>
                </motion.li>
              );
            })}
          </ul>
          <div className="border-t border-bone/10" />
        </div>
      </div>
    </section>
  );
}
