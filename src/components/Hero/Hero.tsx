"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { FaceParticles } from "./FaceParticles";

export function Hero() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex h-[100dvh] min-h-[640px] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(255, 196, 90, 0.22), transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(255, 154, 31, 0.10), transparent 60%)",
        }}
      />

      <div className="relative flex h-full w-full max-w-6xl items-center justify-center px-6">
        <div className="relative flex h-[78vh] max-h-[820px] w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/headshot.png"
            alt="Portrait of Rajat Kaliani"
            className="h-full w-auto select-none object-contain opacity-95"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <Canvas
            className="!absolute inset-0"
            orthographic
            camera={{ zoom: 95, position: [0, 0, 10] }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <FaceParticles scrollProgress={scrollProgress} />
          </Canvas>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center px-6 text-center">
        <h1 className="text-balance text-4xl font-medium tracking-tight text-ink-900 md:text-6xl">
          Rajat Kaliani
        </h1>
        <p className="mt-3 text-balance text-sm tracking-wide text-ink-500 md:text-base">
          AI Engineer · Software Engineer · Researcher
        </p>
        <span className="mt-8 text-[10px] font-medium uppercase tracking-[0.28em] text-ink-300">
          scroll
        </span>
      </div>
    </section>
  );
}
