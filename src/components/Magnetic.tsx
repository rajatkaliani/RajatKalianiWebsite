"use client";

import { useRef, type ReactNode } from "react";

/**
 * Restrained magnetic hover — the element drifts a few pixels toward the
 * cursor and springs back. Disabled under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 0.7, 0.2, 1)" }}
    >
      {children}
    </span>
  );
}
