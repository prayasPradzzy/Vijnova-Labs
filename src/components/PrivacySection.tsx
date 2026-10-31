"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server } from "lucide-react";
import { SpotlightCard } from "./ui/spotlight-card";

const items = [
  { icon: Lock, title: "End-to-end encryption", desc: "Data is encrypted at rest and in transit." },
  { icon: Server, title: "Isolated environments", desc: "Your data is never mixed with public training data." },
  { icon: Shield, title: "Strict access controls", desc: "Only authorized professionals can view sensitive insights." },
];

export function PrivacySection() {
  return (
    <section className="relative w-full py-28 md:py-40 px-6 bg-graphite overflow-hidden">
      <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24 lg:items-center">
        <div>
          <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
            Security by design.
          </h2>
          <p className="mt-10 max-w-[34rem] text-lg leading-relaxed text-mist">
            Margastra handles psychometric assessment results and interview transcripts - sensitive
            personal data. We treat this data with the highest level of security and respect.
          </p>
        </div>

        <div className="grid gap-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <SpotlightCard className="flex items-center gap-6 rounded-2xl bg-ink p-6">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal">
                  <Icon className="h-5 w-5" />
                  <span className="absolute inset-0 rounded-full border border-signal/40 animate-ping [animation-duration:3.6s] [animation-delay:var(--d)]" style={{ "--d": `${i * 1.2}s` } as React.CSSProperties} />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-light text-bone">{title}</h3>
                  <p className="mt-1 text-base text-mist">{desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
