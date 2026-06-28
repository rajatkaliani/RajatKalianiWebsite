"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      aria-pressed={dark}
      className="relative flex h-8 w-[58px] items-center rounded-full border border-line bg-surface px-1 transition-colors"
    >
      {/* track symbols */}
      <span className="pointer-events-none flex w-full items-center justify-between px-1 text-[11px] text-muted">
        <span aria-hidden>☀</span>
        <span aria-hidden>☾</span>
      </span>

      {/* sliding star knob */}
      <span
        aria-hidden
        className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] text-bg shadow-sm transition-transform duration-300 ease-out"
        style={{
          transform: mounted && dark ? "translateX(26px)" : "translateX(0)",
        }}
      >
        ★
      </span>
    </button>
  );
}
