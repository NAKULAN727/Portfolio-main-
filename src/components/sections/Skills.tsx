"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

const skills = [
  { name: "Python", icon: "🐍", color: "#3b82f6" },
  { name: "JavaScript", icon: "⚡", color: "#f59e0b" },
  { name: "TypeScript", icon: "🔷", color: "#3b82f6" },
  { name: "React", icon: "⚛️", color: "#06b6d4" },
  { name: "Next.js", icon: "▲", color: "#e2e8f0" },
  { name: "Node.js", icon: "🟢", color: "#22c55e" },
  { name: "Solidity", icon: "💎", color: "#8b5cf6" },
  { name: "MongoDB", icon: "🍃", color: "#22c55e" },
  { name: "PostgreSQL", icon: "🐘", color: "#6366f1" },
  { name: "Docker", icon: "🐳", color: "#06b6d4" },
  { name: "Git", icon: "🔀", color: "#f97316" },
  { name: "C++", icon: "⚙️", color: "#ef4444" },
];

function SkillCard({ name, icon, color, index }: { name: string; icon: string; color: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  return (
    <motion.div
      className="relative p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.05, borderColor: color }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-slate-300">{name}</p>
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity" style={{ background: color }} />
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Tech <span className="text-primary">Stack</span>
      </motion.h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4" style={{ perspective: 800 }}>
        {skills.map((s, i) => (
          <SkillCard key={s.name} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}
