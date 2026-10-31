"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

const links = [
  { href: "#product", id: "product", label: "Product" },
  { href: "#how-we-build", id: "how-we-build", label: "How We Build" },
  { href: "#research", id: "research", label: "Research" },
  { href: "#about", id: "about", label: "About" },
];

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" stroke="currentColor" strokeOpacity="0.2" />
      <path d="M6 23c5 0 5-8 10-8s5-6 10-6" stroke="#f2b15c" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="26" cy="9" r="2.4" fill="#7c9cff" />
    </svg>
  );
}

export function Navigation() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setHidden(latest > previous && latest > 150 && !open);
    setHasScrolled(latest > 50);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        hasScrolled || open ? "bg-ink/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-bone" onClick={() => setOpen(false)}>
          <LogoMark />
          <span className="font-display text-2xl tracking-tight">
            Vijnova <span className="text-mist">Labs</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm text-mist" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className={`relative py-1 transition-colors hover:text-bone ${active === l.id ? "text-bone" : ""}`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-0 -bottom-0.5 h-px bg-ember"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:demo@vijnova.com?subject=Book%20a%20Demo"
            className="hidden md:inline-flex rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
          >
            Book a Demo
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative h-10 w-10 text-bone"
          >
            <span className={`absolute left-2.5 top-[15px] h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`absolute left-2.5 top-[24px] h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
            aria-label="Mobile"
          >
            <div className="px-6 pb-8 pt-2 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.id}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl py-3 text-bone border-b border-bone/10"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="mailto:demo@vijnova.com?subject=Book%20a%20Demo"
                className="mt-6 rounded-full bg-ember px-6 py-3.5 text-center font-medium text-ink"
              >
                Book a Demo
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-signal via-ember to-ember"
      />
    </motion.header>
  );
}
