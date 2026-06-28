import Image from "next/image";

const projects = [
  {
    name: "Project One",
    description: "A short description of what you built and why it matters.",
    href: "#",
  },
  {
    name: "Project Two",
    description: "Another project — swap these out for your real work.",
    href: "#",
  },
  {
    name: "Project Three",
    description: "Keep it to a sentence or two each.",
    href: "#",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:kaliani.rajat@gmail.com" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <header className="flex items-center gap-5">
        <Image
          src="/headshot.png"
          alt="Rajat Kaliani"
          width={72}
          height={72}
          className="rounded-full object-cover"
          priority
        />
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Rajat Kaliani</h1>
          <p className="text-ink-500">AI &amp; Software Engineer · UC Irvine CS</p>
        </div>
      </header>

      <section className="mt-12">
        <p className="text-lg leading-relaxed text-ink-700">
          I build intelligent systems — blending machine learning, software
          engineering, and research to ship things people actually use. This is
          a placeholder intro; rewrite it in your own voice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium uppercase tracking-wide text-ink-300">
          Projects
        </h2>
        <ul className="mt-5 space-y-6">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.href}
                className="group block rounded-lg p-4 -mx-4 transition-colors hover:bg-warm-200"
              >
                <h3 className="font-medium text-ink-900 group-hover:text-amber-600">
                  {project.name}
                </h3>
                <p className="mt-1 text-ink-500">{project.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 flex gap-6 border-t border-warm-400 pt-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-ink-500 transition-colors hover:text-amber-600"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </main>
  );
}
