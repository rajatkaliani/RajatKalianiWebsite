import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "research",
  "leadership",
  "resume",
  "contact",
] as const;

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {SECTION_IDS.map((id) => (
        <section
          key={id}
          id={id}
          className="flex min-h-screen items-center justify-center scroll-mt-24"
        >
          <h2 className="text-3xl font-medium capitalize text-ink-700 md:text-5xl">
            {id}
          </h2>
        </section>
      ))}
    </main>
  );
}
