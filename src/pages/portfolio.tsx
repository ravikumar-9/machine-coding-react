import React, { useEffect, useMemo, useState } from "react";
import type { JSX, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Menu,
  X as Close,
  Mail,
  Link as LinkIcon,
  ArrowDown,
  Github,
} from "lucide-react";

// ==========================
// Ravi – Frontend Portfolio (TypeScript + Split Components + Lucide)
// - Converted to TypeScript
// - Uses lucide-react for icons
// - Responsive navbar with hamburger menu
// - Two-color background gradient (indigo→blue), buttons keep Option A (indigo→pink)
// - Lightweight runtime assertions ("tests") kept & extended
// ==========================

// ===== Types =====
interface SocialLink {
  label: string;
  href: string;
}
interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  points: string[];
}
interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
}
interface SkillBuckets {
  frontend: string[];
  backend: string[];
  database: string[];
}
interface DataShape {
  name: string;
  role: string;
  experienceYears: string;
  location: string;
  email: string; // mailto:
  resumeUrl: string;
  socials: SocialLink[];
  skills: SkillBuckets;
  highlights: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
}

// ===== Data =====
const DATA: DataShape = {
  name: "Ravi kumar Devasani",
  role: "Frontend Developer",
  experienceYears: "around 2 years",
  location: "Hyderabad",
  email: "mailto:ravikumarravikumar32439@gmail.com",
  resumeUrl: "/Ravikumar_frontend_developer.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/ravikumar-9" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ravi-kumar-devasani-6b369025a",
    },
    // { label: "X/Twitter", href: "https://twitter.com/yourhandle" },
  ],
  skills: {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux",
      "RTK",
      "Zustand",
      "Socket.io",
      "React Query",
      "Framer Motion",
      "Socket.io",
    ],
    backend: ["Node.js", "Express"],
    database: ["PostgreSQL", "SQLite"],
  },
  highlights: [
    "React + Next.js (SPA/SSR/ISR) with TypeScript and strict typing",
    "State & data: Redux Toolkit, RTK Query, Zustand, React Query",
    "Styling & motion: Tailwind CSS, MUI, Framer Motion, responsive & accessible components",
    "Real-time features with Socket.io; RESTful API integrations",
    "Performance: code-splitting, image optimization, lazy routes",
    "Backend: Node.js + Express, PostgreSQL schema design & queries",
  ],
  experience: [
    {
      title: "Jr.Frontend Developer",
      company: "Interakt Techsol Private Limited",
      period: "Jan 2024 – Present",
      points: [
        "Worked extensively on RPM (Remote Patient Monitoring) applications.",
        "Built real-time dashboards and patient monitoring screens using React.js and TypeScript.",
        "Implemented state management with Redux Toolkit and RTK Query for predictable and scalable data flows.",
        "Designed responsive and accessible UI layouts with Tailwind CSS.",
        "Integrated Socket.io for live vitals, alerts, and clinician updates.",
        "Implemented audio/video calling features using ZegoCloud (ZEGOCLOUD).",
      ],
    },
  ],
  projects: [
    {
      title: "Impakt Health & Impakt Care – Remote Patient Monitoring",
      description:
        "RPM platform for real-time patient tracking, alert escalation, and care coordination. Engineered modular interfaces in React/TS, optimized state and API handling with Redux Toolkit, built responsive dashboards with Tailwind, and implemented real-time streams using Socket.io. Added ZegoCloud-based video calling to support remote consultations.",
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "Tanstack Query",
        "Socket.io",
        "ZegoCloud",
      ],
    },
    {
      title: "Imapkt Life - Wellness Application",
      description:
        "Admin platform for managing wellness users, tracking their vitals, monitoring app update status, and reviewing real-time activity. Developed scalable modules using React.js, centralized data flow with Redux Toolkit, styled dashboards with Tailwind across the system.",
      tags: ["React.js", "TailwindCSS", "Redux Toolkit"],
    },
    {
      title: "RebitBox",
      description:
        "Admin panel for managing Reverse Vending Machines (RVMs), including machine tracking, live location mapping with React Google Maps, campaign setup, PR management, support workflows, and monitoring of materials accepted per machine. Built modular interfaces with React, TypeScript, Redux Toolkit, and Tailwind for consistent and scalable admin operations.",
      tags: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux Toolkit",
        "Tanstack Query",
      ],
    },
  ],
};

// ===== Shared UI atoms =====
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <section id={id} className="relative py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white/90">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`group rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all ${className}`}
    >
      {children}
    </div>
  );
}

function Badge({ children }: { children: ReactNode }): JSX.Element {
  return (
    <span className="inline-flex items-center justify-center rounded-full text-nowrap border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function LinkBtn({
  href = "#",
  children,
  variant = "primary",
}: {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}): JSX.Element {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[.98]";
  if (variant === "ghost")
    return (
      <a
        href={href}
        className={`${base} border border-white/15 bg-white/5 hover:bg-white/10 text-white/90`}
      >
        {children}
      </a>
    );
  return (
    <a
      href={href}
      className={`${base} bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-lg hover:brightness-110`}
    >
      {children}
    </a>
  );
}

// ===== Animation helpers =====
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

function GradientBg(): JSX.Element {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 to-blue-500/25 blur-3xl" />
        <div className="absolute bottom-[-18rem] right-[-8rem] h-[28rem] w-[28rem] rotate-12 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-3xl" />
      </div>
    </>
  );
}

// ===== Navbar =====
const NAV_LINKS: { id: string; label: string }[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="text-sm font-semibold tracking-wider text-white/90"
        >
          {DATA.name.split(" ").slice(0, 2)}
        </a>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-white/70 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LinkBtn href={DATA.resumeUrl}>Download CV</LinkBtn>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/90 hover:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="md:hidden overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-xl z-20 absolute w-full"
      >
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                {s.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <LinkBtn href={DATA.resumeUrl}>Download CV</LinkBtn>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ===== Hero =====
function Hero(): JSX.Element {
  const reduce = useReducedMotion();
  const featured = useMemo(() => (DATA.skills?.frontend || []).slice(0, 6), []);
  return (
    <header id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          <p className="text-xs uppercase tracking-[.25em] text-white/60">
            {DATA.role} • {DATA.experienceYears} OF EXPERIENCE • {DATA.location}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            I build fast, delightful web experiences.
          </h1>
          <p className="mt-5 max-w-xl text-white/70">
            I’m {DATA.name}, a {DATA.role.toLowerCase()} with{" "}
            {DATA.experienceYears} of hands-on experience crafting responsive,
            accessible, and performant UIs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkBtn href="#projects">See Projects</LinkBtn>
            <LinkBtn href={DATA.email} variant="ghost">
              <Mail size={16} />
              Email me
            </LinkBtn>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-64 md:w-80">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-blue-500 opacity-50 blur-2xl" />
            <GlassCard className="relative flex h-full w-full items-center justify-center rounded-[2rem] p-8">
              <div className="text-center">
                <div className="text-sm text-white/50">Featured Stack</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-white/80">
                  {featured.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
      {/* <div className="flex items-center justify-center pb-8">
        <a
          href="#about"
          className="inline-flex items-center gap-2 text-white/70"
        >
          <ArrowDown size={18} />
          Scroll
        </a>
      </div> */}
    </header>
  );
}

// ===== About =====
function About(): JSX.Element {
  return (
    <Section id="about" title="About">
      <GlassCard className="p-6 md:p-8">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <p className="text-white/80">
              I’m a frontend developer specializing in React and Next.js,
              turning Figma into fast, accessible, production-ready UIs. I build
              with React.js, Next.js, TypeScript, Tailwind, and Framer Motion,
              manage complex state with Redux Toolkit/Zustand, and ship reliable
              data flows with React Query/RTK Query. I care about Core Web
              Vitals, a11y (WCAG AA), and DX—backed by Node.js/Express and
              PostgreSQL when needed.
            </p>
            <ul className="mt-6 grid gap-3 text-white/70 md:grid-cols-2">
              {DATA.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <div className="text-sm text-white/50">Primary Tools</div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-white/50">
                  Frontend
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DATA.skills.frontend.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-white/50">
                  Backend
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DATA.skills.backend.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-white/50">
                  Database
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DATA.skills.database.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </GlassCard>
    </Section>
  );
}

// ===== Skills =====
function Skills(): JSX.Element {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="p-6">
          <h3 className="text-white/90 font-semibold">Frontend</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {DATA.skills.frontend.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-white/90 font-semibold">Backend</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {DATA.skills.backend.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-white/90 font-semibold">Database</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {DATA.skills.database.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

// ===== Experience =====
function Experience(): JSX.Element {
  return (
    <Section id="experience" title="Experience">
      <div className="grid gap-6">
        {Array.isArray(DATA.experience) && DATA.experience.length > 0 ? (
          DATA.experience.map((job, idx) => (
            <motion.div
              key={job.title + idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={idx}
            >
              <GlassCard className="p-6 md:p-8">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90">
                      {job.title} •{" "}
                      <span className="text-white/70">{job.company}</span>
                    </h3>
                    <div className="text-sm text-white/50">{job.period}</div>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3 text-white/75">
                  {job.points?.map((p, i) => (
                    <li key={p + i} className="flex items-start gap-3">
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))
        ) : (
          <GlassCard className="p-6 text-white/70">
            No experience items provided yet.
          </GlassCard>
        )}
      </div>
    </Section>
  );
}

// ===== Projects =====
function Projects(): JSX.Element {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DATA.projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={idx}
          >
            <GlassCard className="flex h-full flex-col p-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white/90">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ===== Contact =====
function Contact(): JSX.Element {
  return (
    <Section id="contact" title="Contact">
      <GlassCard className="p-6 md:p-10 text-center">
        <h3 className="text-xl font-semibold text-white/90">
          Let’s build something great
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-white/70">
          I’m open to frontend roles, freelance projects, and collaboration. No
          forms—just reach out directly.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <LinkBtn href={DATA.email}>
            <Mail size={16} /> Email
          </LinkBtn>
          {DATA.socials.map((s) => (
            <LinkBtn key={s.label} href={s.href} variant="ghost">
              <LinkIcon size={16} /> {s.label}
            </LinkBtn>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}

// ===== App (root) =====
export default function Portfolio(): JSX.Element {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white antialiased selection:bg-blue-500/30 selection:text-white">
      <GradientBg />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-sm text-white/50">
          © {new Date().getFullYear()} {DATA.name}. Built with React+TypeScript
          , Tailwind, and Framer Motion.
        </div>
      </footer>
    </main>
  );
}
