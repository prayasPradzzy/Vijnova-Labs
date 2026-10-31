"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.ComponentProps<"div"> {
  glowColor?: string;
  edgeColor?: string;
}

/** Card whose surface and 1px border light up around the cursor. */
export function SpotlightCard({
  className,
  glowColor = "rgba(124,156,255,0.10)",
  edgeColor = "rgba(124,156,255,0.65)",
  onMouseMove,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const at = "var(--spotlight-x, 50%) var(--spotlight-y, 50%)";

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
        }
        onMouseMove?.(e);
      }}
      className={cn("group/spotlight relative isolate overflow-hidden border border-bone/[0.08]", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{ background: `radial-gradient(420px circle at ${at}, ${glowColor}, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-20 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${at}, ${edgeColor}, transparent 70%)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
