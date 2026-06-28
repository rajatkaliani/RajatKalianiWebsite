import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

const experience = [
  {
    role: "Software Engineering Intern",
    company: "GoodRx",
    detail: "Search Engine Optimization",
    period: "Summer 2026",
    upcoming: true,
  },
  {
    role: "Software Development Engineer Intern",
    company: "Amazon Web Services — Elastic Block Store (EBS)",
    detail: "",
    period: "Fall 2026",
    upcoming: true,
  },
  {
    role: "Software Engineer Intern",
    company: "KBR / NASA (TOWR-S Program)",
    detail:
      "Built geospatial ML/data pipelines for satellite data deployed to AWIPS across 156 WFOs; optimized AWS CI/CD infrastructure (EC2, Lambda, SQS, DynamoDB) supporting 24/7 systems.",
    period: "Mar 2026 — Present",
  },
  {
    role: "Software Engineer Intern",
    company: "Cadomi.ai",
    detail:
      "Designed an NLP-driven MCP backend for AI-assisted sprint planning with RAG-based LLM orchestration over Git PR data, boosting issue relevance by 40%.",
    period: "Dec 2025 — Mar 2026",
  },
  {
    role: "Full-Stack Developer (Contract)",
    company: "Orange County Community Health Center",
    detail:
      "Built a provider quota system in React/TypeScript handling 15,000+ daily requests at 99.6% uptime, backed by 30+ REST APIs and a PostgreSQL schema.",
    period: "Sep 2025 — Present",
  },
  {
    role: "Software Engineering Intern",
    company: "Teachrity AI",
    detail:
      "Stress-tested foundation models against 10,000+ K–12 standards, improving RAG curriculum accuracy by 35% and cutting hallucinations by 40%.",
    period: "Jun 2025 — Oct 2025",
  },
];

const projects = [
  {
    name: "Web Search Engine",
    stack: "Python · Flask · TF-IDF · Information Retrieval",
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

const skills = {
  Languages:
    "Python, Java, Kotlin, C, C++, C#, JavaScript, TypeScript, SQL, Rust, Ruby, Swift, Scala",
  "Frameworks & Tools":
    "React, Spring Boot, FastAPI, GraphQL, gRPC, PyTorch, TensorFlow, Redux, Jest, Pytest",
  "DevOps & Cloud":
    "AWS, Docker, Kubernetes, Kafka, Redis, PostgreSQL, MySQL, Elasticsearch, Spark, Bazel",
};

const links = [
  { label: "GitHub", href: "https://github.com/rajatkaliani" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rajat-kaliani" },
  { label: "Email", href: "mailto:rkaliani@uci.edu" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-5">
          <Image
            src="/headshot.png"
            alt="Rajat Kaliani"
            width={72}
            height={72}
            className="rounded-full object-cover"
            priority
          />
          <div>
            <h1 className="text-2xl font-semibold text-ink">Rajat Kaliani</h1>
            <p className="text-muted">AI &amp; Software Engineer</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <section className="mt-12">
        <p className="text-lg leading-relaxed text-ink/90 text-balance">
          CS student at UC Irvine building intelligent systems across ML,
          backend, and cloud infrastructure — from RAG pipelines and search
          engines to production systems serving thousands of daily requests.
        </p>
      </section>

      <Section title="Experience">
        <ul className="space-y-7">
          {experience.map((job) => (
            <li key={job.company}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-medium text-ink">
                  {job.company}{" "}
                  <span className="text-muted">· {job.role}</span>
                  {job.upcoming && (
                    <span className="ml-2 rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 text-[11px] font-normal text-accent">
                      incoming
                    </span>
                  )}
                </h3>
                <span className="shrink-0 text-sm text-muted">{job.period}</span>
              </div>
              {job.detail && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {job.detail}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Projects">
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.name}>
              <h3 className="font-medium text-ink">{project.name}</h3>
              <p className="mt-0.5 font-mono text-xs text-accent">
                {project.stack}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        <dl className="space-y-3">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="sm:flex sm:gap-4">
              <dt className="shrink-0 text-sm font-medium text-ink sm:w-36">
                {group}
              </dt>
              <dd className="text-sm text-muted">{items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-medium text-ink">University of California, Irvine</h3>
            <p className="text-sm text-muted">B.S. Computer Science · GPA 3.73</p>
          </div>
          <span className="shrink-0 text-sm text-muted">June 2028</span>
        </div>
      </Section>

      <footer className="mt-16 flex gap-6 border-t border-line pt-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </footer>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-xs font-medium uppercase tracking-wider text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
