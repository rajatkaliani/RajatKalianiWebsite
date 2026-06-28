"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the theme class set pre-paint (external DOM state)
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
      className="group relative flex h-7 w-[52px] items-center rounded-full border border-line bg-surface px-1 transition-colors hover:border-muted"
    >
      <span className="pointer-events-none flex w-full items-center justify-between px-[5px] text-muted">
        <SunIcon className="h-3 w-3" />
        <MoonIcon className="h-3 w-3" />
      </span>
      <span
        aria-hidden
        className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-bg shadow-sm transition-transform duration-300 ease-out"
        style={{
          transform: mounted && dark ? "translateX(24px)" : "translateX(0)",
        }}
      >
        {dark ? (
          <MoonIcon className="h-3 w-3" />
        ) : (
          <SunIcon className="h-3 w-3" />
        )}
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
