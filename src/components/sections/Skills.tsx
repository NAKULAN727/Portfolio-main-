"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import TechIcon from "@/components/TechIcon";

// ── Types ─────────────────────────────────────────────────────────────────────
type Skill    = { name: string; icon: string; note?: string };
type Category = { label: string; color: string; skills: Skill[] };

// ── Icon IDs (Devicon preferred, Simple Icons fallback) ───────────────────────
// Format: "set:icon-name" — Iconify resolves these from CDN automatically.
const CATEGORIES: Category[] = [
  {
    label: "Languages",
    color: "#6366f1",
    skills: [
      { name: "C",          icon: "devicon:c" },
      { name: "C++",        icon: "devicon:cplusplus",    note: "Basics" },
      { name: "JavaScript", icon: "devicon:javascript" },
      { name: "Java",       icon: "devicon:java" },
      { name: "HTML",       icon: "devicon:html5" },
      { name: "CSS",        icon: "devicon:css3" },
      { name: "PHP",        icon: "devicon:php",          note: "Basics" },
      { name: "jQuery",     icon: "devicon:jquery",       note: "Basics" },
      { name: "Python",     icon: "devicon:python",       note: "Basics" },
    ],
  },
  {
    label: "Frameworks",
    color: "#00f5d4",
    skills: [
      { name: "Spring Boot", icon: "devicon:spring" },
      { name: "Node.js",     icon: "devicon:nodejs" },
      { name: "Express",     icon: "devicon:express" },
      { name: "React.js",    icon: "devicon:react" },
      { name: "Next.js",     icon: "devicon:nextjs" },
      { name: "Ajax",        icon: "simple-icons:jquery" },   // closest match
      { name: "TailwindCSS", icon: "devicon:tailwindcss" },
    ],
  },
  {
    label: "Databases",
    color: "#10b981",
    skills: [
      { name: "SQL",     icon: "devicon:mysql" },
      { name: "MongoDB", icon: "devicon:mongodb" },
      { name: "Redis",   icon: "devicon:redis" },
    ],
  },
  {
    label: "Tools",
    color: "#f59e0b",
    skills: [
      { name: "Git",      icon: "devicon:git" },
      { name: "GitHub",   icon: "devicon:github" },
      { name: "Postman",  icon: "devicon:postman" },
      { name: "Vercel",   icon: "devicon:vercel" },
      { name: "MetaMask", icon: "simple-icons:metamask" },
    ],
  },
  {
    label: "Concepts",
    color: "#7c3aed",
    skills: [
      { name: "DSA", icon: "ph:tree-structure-bold",  note: "Basics" },
      { name: "OOP", icon: "ph:cube-bold",            note: "Basics" },
      { name: "SQL", icon: "ph:database-bold",        note: "Basics" },
    ],
  },
];

// ── TechIcon card ─────────────────────────────────────────────────────────────
function SkillCard({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [12, -12]);
  const rotateY = useTransform(x, [-40, 40], [-12, 12]);

  // Devicon "plain" / "wordless" variants are coloured by default.
  // For dark-mode neutrality we let the icon render its own colours
  // but force GitHub/Vercel/Express (dark icons) to white.
  const forceWhite = ["devicon:github", "devicon:express", "devicon:nextjs", "devicon:vercel"];
  const iconColor  = forceWhite.includes(skill.icon) ? "#ffffff" : undefined;

  return (
    <motion.div
      className="card relative flex flex-col items-center gap-2 p-4 cursor-default select-none"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left - r.width / 2);
        y.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.1, boxShadow: `0 0 22px 4px ${color}44` }}
    >
      {/* Neon glow layer on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-sm"
        style={{ background: color }}
      />

      {/* Neon border pulse on hover — CSS outline trick */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none transition-all duration-300"
        style={{ boxShadow: `inset 0 0 0 1px ${color}00` }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${color}`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${color}00`)}
      />

      {/* Icon */}
      <TechIcon icon={skill.icon} size={36} color={iconColor} />

      {/* Name */}
      <span
        className="font-sans text-[11px] font-semibold text-center leading-tight"
        style={{ color: "var(--c-text)" }}
      >
        {skill.name}
      </span>

      {/* Note badge */}
      {skill.note && (
        <span
          className="font-sans text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-widest"
          style={{ background: `${color}22`, color }}
        >
          {skill.note}
        </span>
      )}

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

// ── Category tab ──────────────────────────────────────────────────────────────
function Tab({ label, color, active, onClick }: {
  label: string; color: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-sm
                 transition-all duration-200 border font-bold"
      style={
        active
          ? { color, borderColor: color, background: `${color}18`, boxShadow: `0 0 12px ${color}44` }
          : { color: "var(--c-muted)", borderColor: "var(--c-border)" }
      }
    >
      {label}
    </button>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState(0);
  const current = CATEGORIES[active];
  const total   = CATEGORIES.reduce((a, c) => a + c.skills.length, 0);

  return (
    <section id="skills" className="py-28 px-6 max-w-5xl mx-auto">

      {/* Heading */}
      <motion.div
        className="section-divider"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h2 className="section-heading">
          Tech <span className="text-gradient-teal accent-serif">Skills</span>
        </h2>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mt-10 mb-8"
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.1 }}
      >
        {CATEGORIES.map((cat, i) => (
          <Tab key={cat.label} label={cat.label} color={cat.color}
               active={active === i} onClick={() => setActive(i)} />
        ))}
      </motion.div>

      {/* Category strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.label + "-strip"}
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}
        >
          <div className="h-px flex-1" style={{ background: "var(--c-border)" }} />
          <span
            className="font-sans text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-sm border font-bold"
            style={{ color: current.color, borderColor: `${current.color}50`, background: `${current.color}12` }}
          >
            {current.label}
          </span>
          <div className="h-px flex-1" style={{ background: "var(--c-border)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Icon grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.label}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
          style={{ perspective: 900 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
        >
          {current.skills.map((skill, i) => (
            <SkillCard key={skill.name + i} skill={skill} color={current.color} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footer count */}
      <motion.p
        className="mt-8 text-center font-sans text-xs tracking-widest uppercase"
        style={{ color: "var(--c-muted)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.4 }}
      >
        <span className="heading-display text-2xl text-gradient-teal">{total}</span>
        {" "}skills · {CATEGORIES.length} categories
      </motion.p>
    </section>
  );
}
