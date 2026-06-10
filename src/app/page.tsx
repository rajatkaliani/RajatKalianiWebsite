import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* placeholder for scroll past hero so the dispersion animation has runway */}
      <section className="h-[120vh]" aria-hidden />
    </main>
  );
}
