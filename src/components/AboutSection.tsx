"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "./ui/spotlight-card";

const values = [
  { title: "Evidence before assumption", desc: "Every product should be informed by research and measurable outcomes, not intuition alone." },
  { title: "Human agency before automation", desc: "Technology should expand what professionals can do, not diminish their responsibility or judgment." },
  { title: "Systems thinking", desc: "We design for the workflow an individual task sits inside, not the task in isolation." },
  { title: "Trust through transparency", desc: "Professionals should understand how a recommendation was generated and retain real oversight over important decisions." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative w-full py-28 md:py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-bone">Why we started</h2>
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-mist">
              Many professionals still struggle to find AI tools that genuinely improve how they work
              - they&apos;re often asked to adapt their workflow to the technology, rather than the
              other way around. We started Vijnova Labs to build software the other way: understand
              how professionals think and decide, then design AI that fits into that process.
            </p>
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-ember">Our mission</h2>
            <p className="mt-8 font-display text-2xl md:text-[1.9rem] font-light leading-[1.3] text-bone">
              To turn advances in AI into evidence-based, domain-specific software that helps
              knowledge workers make better decisions and work more effectively - without replacing
              the judgment, accountability, and empathy only they can provide.
            </p>
          </div>
        </div>

        <h2 className="mt-32 mb-10 font-display text-4xl md:text-5xl font-light tracking-tight text-bone">Our values</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-3xl bg-graphite p-8" edgeColor="rgba(242,177,92,0.7)" glowColor="rgba(242,177,92,0.07)">
                <h3 className="font-display text-2xl md:text-3xl font-light text-bone">{v.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-mist">{v.desc}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 grid gap-6 border-t border-bone/10 pt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-24">
          <h2 className="font-display text-3xl font-light text-bone">Looking ahead</h2>
          <p className="max-w-[34rem] text-lg leading-relaxed text-mist">
            Margastra is our first product, focused on career counselling. As we learn more about
            how professionals in other fields work, we plan to bring the same approach to other
            knowledge-intensive professions.
          </p>
        </div>
      </div>
    </section>
  );
}
