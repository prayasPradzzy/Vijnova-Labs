"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "./ui/spotlight-card";

const inView = { once: true, margin: "-80px" } as const;

function NlpVisual() {
  const words = ["I", "want", "more", "autonomy", "but", "fear", "instability"];
  const hot = new Set([3, 5]);
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-mist">
      {words.map((w, i) => (
        <motion.span
          key={w + i}
          initial={{ backgroundColor: "rgba(124,156,255,0)" }}
          whileInView={hot.has(i) ? { backgroundColor: "rgba(124,156,255,0.28)", color: "#ece9e2" } : {}}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
          className="rounded px-1"
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}

function LlmVisual() {
  return (
    <div className="space-y-2.5">
      {[92, 100, 78, 56].map((w, i) => (
        <motion.div
          key={i}
          initial={{ width: 0 }}
          whileInView={{ width: `${w}%` }}
          viewport={inView}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.25, ease: "easeOut" }}
          className="h-1.5 rounded-full bg-bone/20"
        />
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="inline-block h-4 w-[2px] bg-signal"
      />
    </div>
  );
}

function GraphVisual() {
  const n = [[50, 50], [18, 24], [82, 26], [24, 78], [78, 76]];
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-full text-signal" aria-hidden>
      {n.slice(1).map(([x, y], i) => (
        <motion.line
          key={i} x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={inView}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
        />
      ))}
      {n.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 6 : 3.5} fill="currentColor" fillOpacity={i === 0 ? 1 : 0.55} />
      ))}
    </svg>
  );
}

function RulesVisual() {
  return (
    <div className="space-y-2 text-sm">
      {[["Prefers structure", "Operations roles"], ["Enjoys persuasion", "Advisory roles"]].map(([a, b], i) => (
        <motion.div
          key={a}
          initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={inView}
          transition={{ delay: 0.3 + i * 0.25 }}
          className="flex items-center gap-2 text-mist"
        >
          <span className="rounded bg-bone/[0.06] px-2 py-0.5">{a}</span>
          <span className="h-px w-5 bg-signal" />
          <span className="rounded bg-signal/15 px-2 py-0.5 text-bone">{b}</span>
        </motion.div>
      ))}
    </div>
  );
}

function LoopVisual() {
  return (
    <div className="flex items-center gap-3 text-sm text-mist">
      <span>Draft</span>
      <span className="h-px flex-1 bg-bone/20" />
      <motion.span
        initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} viewport={inView}
        transition={{ type: "spring", delay: 0.6 }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-ember text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={inView} transition={{ delay: 0.9, duration: 0.5 }} />
        </svg>
      </motion.span>
      <span className="h-px flex-1 bg-bone/20" />
      <span className="text-bone">Approved</span>
    </div>
  );
}

const tech = [
  { title: "Natural Language Processing", desc: "Interview transcription and structured insight extraction.", span: "lg:col-span-3", Visual: NlpVisual, edge: "rgba(124,156,255,0.7)" },
  { title: "Large Language Models", desc: "Drafting reports and summarising complex information.", span: "lg:col-span-3", Visual: LlmVisual, edge: "rgba(124,156,255,0.7)" },
  { title: "Knowledge Graphs", desc: "Organising occupational intelligence and skill relationships.", span: "lg:col-span-2", Visual: GraphVisual, edge: "rgba(124,156,255,0.7)" },
  { title: "Rule-Based Systems", desc: "Transparent, explainable matching without black-box logic.", span: "lg:col-span-2", Visual: RulesVisual, edge: "rgba(124,156,255,0.7)" },
  { title: "Human-in-the-Loop", desc: "Professional oversight at every critical step of the workflow.", span: "lg:col-span-2", Visual: LoopVisual, edge: "rgba(242,177,92,0.8)", human: true },
];

export function TechnologySection() {
  return (
    <section className="relative w-full py-28 md:py-40 px-6 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] md:items-end mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
            An ensemble of intelligence.
          </h2>
          <p className="text-lg leading-relaxed text-mist">
            Our platforms combine several AI technologies, each solving a specific problem within a
            professional&apos;s workflow, rather than relying on a single model to do everything.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {tech.map(({ title, desc, span, Visual, edge, human }) => (
            <SpotlightCard
              key={title}
              edgeColor={edge}
              glowColor={human ? "rgba(242,177,92,0.09)" : undefined}
              className={`${span} flex min-h-[260px] flex-col justify-between rounded-3xl bg-ink p-7 ${human ? "md:col-span-2" : ""}`}
            >
              <div className="min-h-[96px] pb-8">
                <Visual />
              </div>
              <div>
                <h3 className="font-display text-2xl font-light text-bone">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-mist">{desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
