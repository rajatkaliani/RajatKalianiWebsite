"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Leadership", href: "#leadership" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className={`glass flex items-center gap-1 rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "scale-[0.97]" : "scale-100"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-ink-900"
          aria-label="Home"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span className="tracking-tight">Rajat Kaliani</span>
        </Link>
        <span className="mx-1 h-5 w-px bg-ink-900/10" aria-hidden />
        <ul className="hidden items-center gap-0.5 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-500 transition-colors hover:bg-white/60 hover:text-ink-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#resume"
          className="ml-1 hidden items-center rounded-full bg-ink-900 px-4 py-1.5 text-sm font-medium text-warm-50 transition-transform hover:scale-[1.02] md:inline-flex"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
