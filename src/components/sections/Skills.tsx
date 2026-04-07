"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import TechIcon from "@/components/TechIcon";

// ── Types ─────────────────────────────────────────────────────────────────────
type Skill = { 
  name: string; 
  icon: string; 
  note?: string;
  proficiency?: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
};
type Category = { label: string; color: string; skills: Skill[] };

// ── Icon IDs (Devicon preferred, Simple Icons fallback) ───────────────────────
const CATEGORIES: Category[] = [
  {
    label: "Languages",
    color: "#6366f1",
    skills: [
      { name: "C",          icon: "devicon:c", description: "Low-level structures and system ops." },
      { name: "C++",        icon: "devicon:cplusplus",    note: "Basics", description: "OOP and fast algorithmic solving." },
      { name: "JavaScript", icon: "devicon:javascript", description: "Dynamic high-level web scripting." },
      { name: "Java",       icon: "devicon:java", description: "Enterprise backend and logic." },
      { name: "HTML",       icon: "devicon:html5", description: "Semantic web page structure." },
      { name: "CSS",        icon: "devicon:css3", description: "Modern responsive web styling." },
      { name: "PHP",        icon: "devicon:php",          note: "Basics", description: "Server-side scripting legacy." },
      { name: "jQuery",     icon: "devicon:jquery",       note: "Basics", description: "DOM manipulation and Ajax interactions." },
      { name: "Python",     icon: "devicon:python",       note: "Basics", description: "Data parsing & automation scripts." },
    ],
  },
  {
    label: "Frameworks",
    color: "#00f5d4",
    skills: [
      { name: "Spring Boot", icon: "devicon:spring", description: "Robust enterprise REST APIs." },
      { name: "Node.js",     icon: "devicon:nodejs", description: "Scalable backend JavaScript engine." },
      { name: "Express",     icon: "devicon:express", description: "Fast, unopinionated server routing." },
      { name: "React.js",    icon: "devicon:react", description: "Interactive component-based UIs." },
      { name: "Next.js",     icon: "devicon:nextjs", description: "Server-rendered optimized React apps." },
      { name: "Ajax",        icon: "simple-icons:jquery", description: "Asynchronous client-server fetches." },
      { name: "Tailwind",    icon: "devicon:tailwindcss", description: "Utility-first design systems." },
    ],
  },
  {
    label: "Databases",
    color: "#10b981",
    skills: [
      { name: "SQL",     icon: "devicon:mysql", description: "Relational table management & queries." },
      { name: "MongoDB", icon: "devicon:mongodb", description: "NoSQL JSON document store models." },
      { name: "Redis",   icon: "devicon:redis", description: "In-memory caching and messaging." },
    ],
  },
  {
    label: "Tools",
    color: "#f59e0b",
    skills: [
      { name: "Git",      icon: "devicon:git", description: "Distributed version control system." },
      { name: "GitHub",   icon: "simple-icons:github", description: "Cloud collaboration and CI/CD pipelines." },
      { name: "Postman",  icon: "devicon:postman", description: "API testing and endpoint design." },
      { name: "Vercel",   icon: "simple-icons:vercel", description: "Edge deployments and hosting operations." },
      { name: "MetaMask", icon: "logos:metamask-icon", description: "Web3 wallet and dapp integration." },
    ],
  },
  {
    label: "Concepts",
    color: "#7c3aed",
    skills: [
      { name: "DSA", icon: "ph:tree-structure-bold",  note: "Basics", description: "Optimal algorithm solving strategies." },
      { name: "OOP", icon: "ph:cube-bold",            note: "Basics", description: "Object-oriented systemic models." },
      { name: "NoSQL", icon: "ph:database-bold",      note: "Basics", description: "Complex relational querying capabilities." },
    ],
  },
];

// ── TechIcon card ─────────────────────────────────────────────────────────────
function SkillCard({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Parallax tilt logic based on mouse position
  const rotateX = useTransform(y, [-60, 60], [15, -15]);
  const rotateY = useTransform(x, [-60, 60], [-15, 15]);
  
  const [isFlipped, setIsFlipped] = useState(false);

  // Fallbacks for content
  const proficiency = skill.proficiency || (skill.note === "Basics" ? "Beginner" : "Intermediate");
  const description = skill.description || "Essential building block used across projects.";

  // Dark Icons force white layer
  const forceWhite = ["simple-icons:github", "devicon:express", "devicon:nextjs", "simple-icons:vercel"];
  const iconColor  = forceWhite.includes(skill.icon) ? "#ffffff" : undefined;

  return (
    <motion.div
      className="relative w-full h-[140px] md:h-[150px] rounded-lg cursor-pointer group select-none"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        if (!isFlipped) {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left - r.width / 2);
          y.set(e.clientY - r.top - r.height / 2);
        }
      }}
      onMouseLeave={() => { x.set(0); y.set(0); setIsFlipped(false); }}
      onMouseEnter={() => setIsFlipped(true)}
      onClick={() => setIsFlipped(!isFlipped)} // Tap logic on mobile Devices
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ 
          transformStyle: "preserve-3d", 
          rotateX: isFlipped ? 0 : rotateX, 
          rotateY: isFlipped ? 0 : rotateY 
        }}
      >
        <motion.div
          className="w-full h-full relative shadow-xl"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* --- Front Face --- */}
          <div
            className="absolute inset-0 card flex flex-col items-center justify-center p-4"
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden", 
              transform: "rotateY(0deg)" 
            }}
          >
            {/* Neon border pulse on hover */}
            <div 
              className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" 
              style={{ boxShadow: `inset 0 0 0 1px ${color}aa` }} 
            />
            {/* Glow backing */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: color }} />

            <TechIcon icon={skill.icon} size={42} color={iconColor} />
            <span className="font-sans text-[12px] font-bold text-center leading-tight mt-3" style={{ color: "var(--c-text)" }}>
              {skill.name}
            </span>

            {/* Note badge */}
            {skill.note && (
              <span className="absolute top-2 right-2 font-sans text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-widest" style={{ background: `${color}22`, color }}>
                {skill.note}
              </span>
            )}
            
            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          </div>

          {/* --- Back Face --- */}
          <div
            className="absolute inset-0 card flex flex-col items-center justify-center text-center p-4 border border-white/10"
            style={{ 
              backfaceVisibility: "hidden", 
              WebkitBackfaceVisibility: "hidden", 
              transform: "rotateY(180deg)",
              boxShadow: `0 0 15px ${color}22` 
            }}
          >
            <h4 className="text-white text-[13px] font-bold mb-1.5 tracking-wide">{skill.name}</h4>
            <span 
              className="font-sans text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-widest mb-3 font-semibold" 
              style={{ color: "#fff", background: color }}
            >
              {proficiency}
            </span>
            <p className="font-mono text-[10px] text-gray-300 leading-snug line-clamp-3 px-1">
              {description}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: color }} />
          </div>

        </motion.div>
      </motion.div>
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
      className="font-sans text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-200 border font-bold"
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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
