import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { LocalTime } from "@/components/LocalTime";

const experience = [
  {
    company: "Amazon Web Services",
    role: "SDE Intern",
    detail: "Elastic Block Store (EBS)",
    period: "Fall 2026",
    upcoming: true,
  },
  {
    company: "GoodRx",
    role: "SWE Intern",
    detail: "Search Engine Optimization",
    period: "Jun 2026 — Present",
  },
  {
    company: "KBR / NASA",
    role: "SWE Intern · TOWR-S",
    detail: "Geospatial ML, satellite modeling & cloud infrastructure",
    period: "Mar — Jun 2026",
  },
  {
    company: "Cadomi.ai",
    role: "SWE Intern",
    detail: "MCP-powered AI agent orchestration with RAG",
    period: "Dec 2025 — Mar 2026",
  },
  {
    company: "OC Community Health Center",
    role: "Full-Stack Dev",
    detail: "Full-stack healthcare data management platform",
    period: "Sep 2025 — Present",
  },
  {
    company: "Teachrity AI",
    role: "SWE Intern",
    detail: "RAG-powered curriculum intelligence for K-12 education",
    period: "Jun — Oct 2025",
  },
];

const projects = [
  {
    name: "Web Search Engine",
    stack: "Python · Flask · TF-IDF · IR",
    description:
      "Full-stack search engine over 53,792 pages with a custom inverted index, positional indexing, and disk-based retrieval at sub-millisecond latency. Parallel indexing across 4 workers (1.07M terms), ranked with PageRank, n-gram boosting, and SimHash LSH dedup.",
  },
  {
    name: "Diabetic Retinopathy Detector",
    stack: "Python · TensorFlow · CNNs · Grad-CAM",
    description:
      "CNN medical image classifier using transfer learning to grade retinal fundus images into 4 severity levels at 82% cross-validated accuracy, with 5-fold CV and Grad-CAM saliency maps for clinical interpretability.",
  },
];

const skills: Record<string, string[]> = {
  Languages: [
    "Python",
    "Java",
    "Kotlin",
    "C",
    "C++",
    "C#",
    "TypeScript",
    "SQL",
    "Rust",
    "Swift",
    "Scala",
  ],
  Frameworks: [
    "React",
    "Spring Boot",
    "FastAPI",
    "GraphQL",
    "gRPC",
    "PyTorch",
    "TensorFlow",
  ],
  Infra: [
    "AWS",
    "Docker",
    "Kubernetes",
    "Kafka",
    "Redis",
    "PostgreSQL",
    "Elasticsearch",
    "Spark",
  ],
};

const links = [
  { label: "GitHub", href: "https://github.com/rajatkaliani" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rajat-kaliani" },
  { label: "Email", href: "mailto:rkaliani@uci.edu" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 pb-24 pt-8 sm:pt-12">
      {/* top bar */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.18em] text-muted">
          rajatkaliani.com
        </span>
        <ThemeToggle />
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <Reveal as="header" className="mt-16 sm:mt-20">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="status-dot h-[7px] w-[7px] rounded-full bg-accent" />
          Available · 2026 internships
        </span>

        <div className="mt-7 flex items-start justify-between gap-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
              Rajat Kaliani
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              AI / Software Engineer
            </p>
            <p className="mt-6 max-w-[54ch] text-[15px] leading-[1.7] text-body text-balance sm:text-base">
              Building intelligent systems at UC Irvine across ML, backend, and
              cloud — from RAG pipelines and search engines to production
              systems serving thousands daily.
            </p>

            <nav className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
              {links.map((link) => (
                <Magnetic key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-grow inline-flex items-center gap-1 pb-0.5 uppercase tracking-wider text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span aria-hidden className="text-faint">
                      ↗
                    </span>
                  </a>
                </Magnetic>
              ))}
            </nav>
          </div>

          {/* portrait — clean frame, aligned to the name */}
          <div className="group/portrait hidden shrink-0 overflow-hidden rounded-xl ring-1 ring-line sm:block">
            <Image
              src="/headshot.png"
              alt="Rajat Kaliani"
              width={104}
              height={104}
              className="h-[104px] w-[104px] object-cover transition-transform duration-500 ease-out group-hover/portrait:scale-[1.03]"
              preload
            />
          </div>
        </div>
      </Reveal>

      <Section n="01" title="Experience">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 50}>
            <Entry
              meta={job.period}
              title={job.company}
              sub={job.role}
              badge={job.upcoming ? "incoming" : undefined}
              body={job.detail}
              active={job.upcoming}
            />
          </Reveal>
        ))}
      </Section>

      <Section n="02" title="Research">
        <Reveal>
          <Entry
            meta="2026 — Present"
            title="AI in Science Institute"
            sub="UC Irvine"
            body="Deep learning on high-dimensional circadian omics datasets to model temporal gene expression and infer circadian-regulated gene activation dynamics."
            link={{
              href: "https://circadiomics.igb.uci.edu/",
              label: "Circadiomics",
            }}
          />
        </Reveal>
      </Section>

      <Section n="03" title="Projects">
        {projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 50}>
            <Entry
              meta={project.stack}
              title={project.name}
              body={project.description}
            />
          </Reveal>
        ))}
      </Section>

      <Section n="04" title="Skills">
        <dl className="space-y-5">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 50}>
              <div className="sm:grid sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:mb-0 sm:pt-1.5">
                  {group}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-body transition-colors hover:border-muted"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section n="05" title="Education">
        <Reveal>
          <Entry
            meta="June 2028"
            title="University of California, Irvine"
            sub="B.S. Computer Science"
            body="GPA 3.73 · Coursework in systems design, ML, information retrieval, and security."
          />
        </Reveal>
      </Section>

      {/* ── Footer / engineering metadata ─────────────────────── */}
      <footer className="mt-24 border-t border-line pt-6">
        <div className="flex flex-wrap items-center justify-between gap-y-2 font-mono text-[11px] text-muted">
          <span className="text-body">Rajat Kaliani</span>
          <span className="tnum">33.6405°N · 117.8443°W</span>
          <LocalTime />
        </div>
        <p className="mt-3 font-mono text-[11px] text-faint">
          Built with Next.js & Tailwind · designed pixel by pixel
        </p>
      </footer>
    </main>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-20">
      <Reveal className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[11px] tnum text-muted">{n}</span>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line" />
      </Reveal>
      {children}
    </section>
  );
}

function Entry({
  meta,
  title,
  sub,
  badge,
  body,
  link,
  active,
}: {
  meta: string;
  title: string;
  sub?: string;
  badge?: string;
  body?: string;
  link?: { href: string; label: string };
  active?: boolean;
}) {
  return (
    <div className="group grid grid-cols-1 gap-x-6 gap-y-2 py-5 sm:grid-cols-[7rem_1fr]">
      {/* date / meta column */}
      <div className="font-mono text-[11px] tnum leading-relaxed text-muted">
        {meta}
      </div>

      {/* content column — left rail forms a continuous timeline */}
      <div className="relative border-l border-line pl-6">
        <span
          aria-hidden
          className={`absolute -left-[3.5px] top-[7px] h-[7px] w-[7px] rounded-full ring-4 ring-bg transition-colors ${
            active
              ? "bg-accent"
              : "bg-line group-hover:bg-muted"
          }`}
        />
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="entry-title font-medium text-ink">{title}</h3>
          {sub && <span className="text-sm text-muted">· {sub}</span>}
          {badge && (
            <span className="rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
              {badge}
            </span>
          )}
        </div>
        {body && (
          <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-body">
            {body}
          </p>
        )}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="underline-grow mt-2.5 inline-flex items-center gap-1 pb-0.5 text-sm text-ink transition-colors hover:text-accent"
          >
            {link.label}
            <span aria-hidden className="text-faint">
              ↗
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
