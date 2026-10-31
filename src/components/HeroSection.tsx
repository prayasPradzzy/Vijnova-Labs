"use client";

import { motion } from "framer-motion";
import { Lattice } from "./Lattice";

const line = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const headline = [
  "The future belongs not to",
  "organisations with the most AI,",
  "but to those that best combine",
  "human judgment with machine intelligence.",
];

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden pt-32 pb-16 md:pb-20">
      <Lattice className="absolute inset-0 w-full h-full opacity-40 md:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_30%_35%,rgba(7,8,12,0.88),transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-8 flex items-center gap-3 text-sm text-mist"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          Designing the next generation of organisational intelligence
        </motion.p>

        <h1 className="font-display text-[clamp(2.1rem,5.4vw,5.2rem)] font-light leading-[1.06] tracking-[-0.02em] text-bone max-w-[18ch] md:max-w-[22ch]">
          {headline.map((text, i) => (
            <span key={text} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                custom={i}
                variants={line}
                initial="hidden"
                animate="show"
                className={`block ${i > 1 ? "italic text-bone/80" : ""}`}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="mt-10 grid gap-10 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between"
        >
          <p className="text-lg leading-relaxed text-mist">
            Vijnova Labs builds evidence-based AI software for knowledge work. We study how
            professionals actually make decisions, then design tools that support that
            process - starting with career counselling.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:demo@vijnova.com?subject=Book%20a%20Demo"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ember px-7 py-3.5 text-base font-medium text-ink transition-transform active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Book a Demo</span>
            </a>
            <a
              href="#product"
              className="inline-flex items-center justify-center rounded-full border border-bone/20 px-7 py-3.5 text-base text-bone transition-colors hover:border-signal hover:text-signal"
            >
              See how Margastra works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
