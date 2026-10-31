"use client";

import { ArrowUpRight } from "lucide-react";

const disciplines = [
  "Industrial & Organisational Psychology",
  "Cognitive Science",
  "Human-Computer Interaction",
  "Organisational Design",
  "Behavioural Science",
  "Artificial Intelligence",
  "Knowledge Representation",
  "Decision Science",
];

export function ResearchSection() {
  return (
    <section id="research" className="relative w-full py-28 md:py-40 bg-graphite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] md:items-end">
        <h2 className="font-display text-5xl md:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-bone">
          Evidence over intuition.
        </h2>
        <div>
          <p className="text-lg leading-relaxed text-mist">
            As Vijnova grows, we intend to publish white papers, technical reports, and practical
            insights from our product development.
          </p>
          <a
            href="/HPWT-DISSERTATION.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ember/60 px-6 py-3 text-base text-ember transition-colors hover:bg-ember hover:text-ink"
          >
            Read My Dissertation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      <div className="mt-20 px-6 max-w-7xl mx-auto">
        <p className="font-display text-2xl italic text-bone/70">Our work draws on multiple disciplines</p>
      </div>
      <div
        className="marquee mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-label="Disciplines: Industrial and Organisational Psychology, Cognitive Science, Human-Computer Interaction, Organisational Design, Behavioural Science, Artificial Intelligence, Knowledge Representation, Decision Science"
      >
        <div className="marquee-track flex w-max gap-4" aria-hidden>
          {[...disciplines, ...disciplines].map((d, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-bone/12 bg-ink px-7 py-4 font-display text-2xl font-light text-bone/85 transition-colors hover:border-signal hover:text-signal"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
