"use client";

import { motion } from "framer-motion";

export function PartnerSection() {
  return (
    <section className="relative w-full py-28 md:py-44 px-6 overflow-hidden">
      {/* the path, finishing */}
      <svg aria-hidden viewBox="0 0 1200 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-10 h-48 w-full opacity-60">
        <motion.path
          d="M-20 250 C 200 250, 260 120, 460 150 S 760 260, 900 140 S 1120 40, 1220 60"
          fill="none" stroke="#f2b15c" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto">
        <blockquote className="font-display text-4xl md:text-6xl lg:text-7xl font-light italic leading-[1.08] tracking-[-0.02em] text-bone max-w-[22ch] pt-24">
          &ldquo;Technology alone has never transformed organisations. Better ways of working have.&rdquo;
        </blockquote>
        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,34rem)_auto] md:justify-between md:items-end">
          <p className="text-lg leading-relaxed text-mist">
            The organisations that thrive won&apos;t simply deploy the most AI. They&apos;ll learn to
            integrate human judgment and machine intelligence into workflows that are more adaptive,
            more trustworthy, and more effective than either could achieve alone.{" "}
            <span className="text-bone">That&apos;s the future Vijnova Labs is building.</span>
          </p>
        </div>

        <div className="mt-28 rounded-[2rem] border border-bone/10 bg-graphite p-8 md:p-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-bone">Partner with us</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              If you&apos;re a knowledge worker, organisation, or researcher interested in improving
              professional workflows through evidence-based AI, we&apos;d like to hear from you.
            </p>
            <p className="mt-6 text-base text-mist">
              Interested in research collaborations, pilot programmes, or institutional partnerships?{" "}
              <a href="mailto:hello@vijnova.com" className="text-ember underline underline-offset-4 decoration-ember/40 hover:decoration-ember">
                Get in touch.
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="mailto:demo@vijnova.com?subject=Book%20a%20Demo"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-ember px-8 py-4 text-base font-medium text-ink transition-transform active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative">Book a Demo</span>
            </a>
            <a
              href="mailto:hello@vijnova.com?subject=Discovery%20Call"
              className="inline-flex items-center justify-center rounded-full border border-bone/20 px-8 py-4 text-base text-bone transition-colors hover:border-signal hover:text-signal"
            >
              Schedule a Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
