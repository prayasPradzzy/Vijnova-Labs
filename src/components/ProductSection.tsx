"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Mic,
  FileText,
  Database,
  Network,
  Route,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const features = [
  {
    id: "psychometric",
    title: "Psychometric Assessment",
    description: "Administer validated assessments and generate structured psychological profiles as the foundation of career guidance.",
    icon: ClipboardList,
  },
  {
    id: "interviews",
    title: "AI-Assisted Interviews",
    description: "Generate interview guides informed by psychometric results. Session transcripts can be analysed to surface themes, strengths, concerns, and aspirations.",
    icon: Mic,
  },
  {
    id: "reports",
    title: "Evidence-Based Reports",
    description: "An LLM integrates psychometric findings with interview insights to draft a career report. Reviewed, edited, and approved by the counsellor.",
    icon: FileText,
  },
  {
    id: "database",
    title: "Occupational Intelligence",
    description: "A structured database of roles, competencies, skills, educational pathways, and progression routes across industries.",
    icon: Database,
  },
  {
    id: "matching",
    title: "Rule-Based Matching",
    description: "Match a person's psychological profile, interests, and competencies to suitable occupations using transparent, rule-based logic.",
    icon: Network,
  },
  {
    id: "roadmapping",
    title: "Career Roadmapping",
    description: "Build long-term career plans incorporating education, certifications, and milestones. Progress tracking is planned for a future release.",
    icon: Route,
  },
];

function PsychometricVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-72 h-72 md:w-80 md:h-80 text-signal">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <motion.polygon
          points="50,15 75,32 78,62 50,82 22,62 25,32"
          fill="currentColor"
          fillOpacity={0.15}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
        <line x1="90" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
        <line x1="90" y1="70" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50" y1="90" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function InterviewVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: ["20%", `${30 + ((i * 37) % 60)}%`, "20%"] }}
          transition={{ repeat: Infinity, duration: 1.4, delay: i * 0.08, ease: "easeInOut" }}
          className="w-1 bg-signal rounded-full"
        />
      ))}
    </div>
  );
}

function ReportsVisual() {
  const lines = [90, 70, 95, 40];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none px-16">
      {lines.map((w, i) => (
        <motion.div
          key={i}
          initial={{ width: "0%" }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: "easeOut" }}
          className="h-2 rounded-full bg-signal/30"
        />
      ))}
    </div>
  );
}

function DatabaseVisual() {
  const nodes = [
    { x: 50, y: 20 }, { x: 20, y: 45 }, { x: 80, y: 45 },
    { x: 30, y: 78 }, { x: 70, y: 78 }, { x: 50, y: 55 },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-72 h-72 md:w-80 md:h-80 text-signal">
        {nodes.slice(1).map((n, i) => (
          <line key={i} x1={nodes[5].x} y1={nodes[5].y} x2={n.x} y2={n.y} stroke="currentColor" strokeWidth="0.5" />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={i === 5 ? 4 : 2.5}
            fill="currentColor"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.25, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

function MatchingVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-72 h-72 md:w-80 md:h-80 text-signal">
        <circle cx="25" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="55" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="80" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="80" cy="30" r="6" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth="1" />
        <circle cx="80" cy="55" r="6" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth="1" />
        <circle cx="80" cy="80" r="6" fill="currentColor" fillOpacity={0.2} stroke="currentColor" strokeWidth="1" />
        {[[30, 55], [55, 55], [80, 30]].map(([sy, ey], i) => (
          <motion.line
            key={i}
            x1="31" y1={sy} x2="74" y2={ey}
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

function RoadmapVisual() {
  const steps = [15, 38, 62, 85];
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-10">
      <div className="relative w-full h-[2px] bg-signal/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-signal/60 origin-left"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-signal shadow-[0_0_10px_rgba(124,156,255,0.8)]"
            style={{ left: `${s}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.ReactElement> = {
  psychometric: PsychometricVisual,
  interviews: InterviewVisual,
  reports: ReportsVisual,
  database: DatabaseVisual,
  matching: MatchingVisual,
  roadmapping: RoadmapVisual,
};

export function ProductSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const ActiveVisual = visuals[activeFeature];

  const current = features.find((f) => f.id === activeFeature)!;

  return (
    <section id="product" className="relative w-full py-28 md:py-40 px-6 bg-graphite">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] md:items-end mb-20">
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
            Meet Margastra
          </h2>
          <p className="text-lg leading-relaxed text-mist">
            An integrated platform that helps career counsellors deliver more structured,
            evidence-based, and personalised guidance - while keeping professional judgment at the
            centre of every decision.
          </p>
        </div>

        <Tabs
          value={activeFeature}
          onValueChange={(value) => setActiveFeature(value as string)}
          orientation="vertical"
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch"
        >
          <TabsList variant="line" className="w-full lg:w-[44%] flex-col items-stretch gap-0 h-auto bg-transparent p-0">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              const Icon = feature.icon;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="group/t relative w-full h-auto justify-start text-left rounded-none border-0 border-t border-bone/10 px-0 py-5 whitespace-normal data-active:bg-transparent last:border-b after:hidden"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFeatureIndicator"
                      className="absolute -top-px left-0 h-px w-full bg-ember"
                      transition={{ type: "spring", stiffness: 420, damping: 38 }}
                    />
                  )}
                  <div className="flex items-start gap-5 w-full">
                    <Icon className={`mt-1 h-5 w-5 shrink-0 transition-colors duration-300 ${isActive ? "text-ember" : "text-mist group-hover/t:text-bone"}`} />
                    <div className="flex flex-col items-start">
                      <h3 className={`font-display text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300 ${isActive ? "text-bone" : "text-mist group-hover/t:text-bone"}`}>
                        {feature.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="pt-3 max-w-md text-base leading-relaxed text-mist"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="relative w-full lg:w-[56%] min-h-[420px] lg:min-h-[560px] rounded-[1.75rem] border border-bone/10 bg-ink overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(124,156,255,0.12),transparent_65%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,233,226,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(236,233,226,0.035)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {ActiveVisual && <ActiveVisual />}
              </motion.div>
            </AnimatePresence>
            <p className="absolute bottom-6 left-7 font-display text-xl italic text-bone/70">{current.title}</p>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
