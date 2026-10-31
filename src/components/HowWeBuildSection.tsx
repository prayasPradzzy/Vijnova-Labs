"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Search, BrainCircuit, Lightbulb, PenTool, UserCheck, RefreshCw } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Workflow Research",
    kind: "human" as "human" | "machine" | "both",
    desc: "Interview professionals and observe how information moves through their daily work.",
    icon: Search
  },
  {
    id: 2,
    title: "Cognitive Mapping",
    kind: "human" as "human" | "machine" | "both",
    desc: "Identify the decisions they make, the information they need, and the repetitive tasks consuming their attention.",
    icon: BrainCircuit
  },
  {
    id: 3,
    title: "AI Opportunity Analysis",
    kind: "machine" as "human" | "machine" | "both",
    desc: "Evaluate where AI can reduce effort without compromising judgment or accountability.",
    icon: Lightbulb
  },
  {
    id: 4,
    title: "Platform Design",
    kind: "machine" as "human" | "machine" | "both",
    desc: "Build an integrated workflow, not an isolated tool.",
    icon: PenTool
  },
  {
    id: 5,
    title: "Human Validation",
    kind: "human" as "human" | "machine" | "both",
    desc: "Professionals review, refine, and approve every AI-assisted output.",
    icon: UserCheck
  },
  {
    id: 6,
    title: "Continuous Learning",
    kind: "both" as "human" | "machine" | "both",
    desc: "Every deployment feeds back into the product through user feedback and new research.",
    icon: RefreshCw
  }
];

const kindColor = { human: "#f2b15c", machine: "#7c9cff", both: "#ece9e2" };

function Step({ step, index, progress }: { step: (typeof steps)[number]; index: number; progress: ReturnType<typeof useSpring> }) {
  const [lit, setLit] = useState(false);
  const threshold = (index + 0.35) / steps.length;
  useMotionValueEvent(progress, "change", (v) => setLit(v >= threshold));
  const Icon = step.icon;
  const color = kindColor[step.kind];

  return (
    <li className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 pb-16 last:pb-0 md:grid-cols-[4rem_minmax(0,1fr)]">
      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-ink transition-all duration-500 md:h-16 md:w-16"
        style={{
          borderColor: lit ? color : "rgba(236,233,226,0.14)",
          boxShadow: lit ? `0 0 32px -4px ${color}66` : "none",
          color: lit ? color : "#8a90a2",
        }}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className={`pt-1 transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-40"}`}>
        <h3 className="font-display text-3xl md:text-4xl font-light tracking-tight text-bone">{step.title}</h3>
        <p className="mt-3 max-w-lg text-lg leading-relaxed text-mist">{step.desc}</p>
      </div>
    </li>
  );
}

export function HowWeBuildSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-we-build" className="relative w-full py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
            Understand the work before automating it.
          </h2>
          <p className="mt-10 max-w-[34rem] text-lg leading-relaxed text-mist">
            Instead of asking &quot;where can AI be added?&quot;, we start by studying how the work already
            happens: where professionals spend their time, where bottlenecks form, and where their
            judgment is doing something a model can&apos;t replicate.
          </p>
          <div className="mt-10 flex gap-6 text-sm text-mist">
            <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-ember" />Led by people</span>
            <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-signal" />Assisted by machines</span>
          </div>
        </div>

        <ol ref={ref} className="relative">
          <div aria-hidden className="absolute left-7 md:left-8 top-8 bottom-8 w-px -translate-x-1/2 bg-bone/10">
            <motion.div style={{ height }} className="w-full bg-gradient-to-b from-ember via-ember to-signal shadow-[0_0_12px_rgba(242,177,92,0.7)]" />
          </div>
          {steps.map((step, i) => (
            <Step key={step.id} step={step} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
