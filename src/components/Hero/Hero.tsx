"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralScene } from "./NeuralScene";

const SECTIONS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Leadership", href: "#leadership" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function Hero() {
  const scrollProgress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLSpanElement>(null);
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      const passed = Math.max(0, -rect.top);
      const p = Math.min(1, passed / total);
      scrollProgress.current = p;

      const imgFade = clamp((0.42 - p) / 0.18, 0, 1);
      if (imgRef.current) imgRef.current.style.opacity = String(imgFade * 0.95);

      const taglineFade = clamp((0.24 - p) / 0.1, 0, 1);
      if (taglineRef.current) {
        taglineRef.current.style.opacity = String(taglineFade);
        taglineRef.current.style.transform = `translateY(${(1 - taglineFade) * 16}px)`;
      }
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = String(taglineFade * 0.9);
      }

      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.78 + i * 0.012;
        const fade = clamp((p - start) / 0.08, 0, 1);
        el.style.opacity = String(fade);
        el.style.transform = `translate(-50%, -50%) scale(${0.85 + 0.15 * fade})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(255, 196, 90, 0.22), transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(255, 154, 31, 0.10), transparent 60%)",
          }}
        />

        <div className="relative flex h-[78vh] max-h-[820px] w-full max-w-6xl items-center justify-center px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/headshot.png"
            alt="Portrait of Rajat Kaliani"
            className="h-full w-auto select-none object-contain"
            style={{ opacity: 0.95 }}
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <Canvas
          className="!absolute inset-0"
          orthographic
          camera={{ zoom: 95, position: [0, 0, 10] }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <NeuralScene scrollProgress={scrollProgress} />
        </Canvas>

        <div
          ref={taglineRef}
          className="pointer-events-none absolute inset-x-0 bottom-16 flex flex-col items-center px-6 text-center"
          style={{ willChange: "opacity, transform" }}
        >
          <h1 className="text-balance text-4xl font-medium tracking-tight text-ink-900 md:text-6xl">
            Rajat Kaliani
          </h1>
          <p className="mt-3 text-balance text-sm tracking-wide text-ink-500 md:text-base">
            AI Engineer · Software Engineer · Researcher
          </p>
        </div>

        <span
          ref={scrollCueRef}
          className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.28em] text-ink-300"
        >
          scroll
        </span>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative h-0 w-0">
            {SECTIONS.map((s, i) => {
              const angle = (i / SECTIONS.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 260;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius * 0.72;
              return (
                <a
                  key={s.href}
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  href={s.href}
                  className="glass pointer-events-auto absolute whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-ink-900 transition-colors hover:text-amber-600"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: 0,
                    transform: "translate(-50%, -50%) scale(0.85)",
                    willChange: "opacity, transform",
                  }}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
