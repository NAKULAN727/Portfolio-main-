"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AchievementType = "Hackathon" | "Internship" | "Event";

const TYPE_STYLES: Record<AchievementType, { text: string; bg: string; border: string; glow: string }> = {
  Hackathon:  { text: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", glow: "#7c3aed" },
  Internship: { text: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  glow: "#10b981" },
  Event:      { text: "#38bdf8", bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.3)",  glow: "#06b6d4" },
};

const achievements: {
  year: string; type: AchievementType; icon: string; title: string; org: string; desc: string;
}[] = [
  {
    year: "2026", type: "Hackathon", icon: "🏆",
    title: "K! Hacks 3.0 — Top 25 in India",
    org: "CEG Campus, Chennai",
    desc: "Shortlisted among the top 25 teams across all of India in this national-level hackathon.",
  },
  {
    year: "2025", type: "Hackathon", icon: "⚡",
    title: "Hack The Horizon",
    org: "VIT Chennai",
    desc: "Participated in a 24-hour hackathon, building and presenting a working prototype under time pressure.",
  },
  {
    year: "2025", type: "Internship", icon: "💼",
    title: "MERN Stack Intern",
    org: "Sri Eshwar College of Engineering",
    desc: "Completed a hands-on MERN internship covering MongoDB, Express, React, and Node.js in a real project environment.",
  },
  {
    year: "2025", type: "Event", icon: "🛡️",
    title: "Zero Day — Intra Hackathon",
    org: "Sri Eshwar College of Engineering",
    desc: "Competed in an intra-college 24-hour hackathon focused on security and systems-level problem solving.",
  },
];

export default function Achievements() {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: lineRef.current, start: "top 70%", end: "bottom 30%", scrub: true },
      }
    );
    itemsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="achievements" className="py-28 px-6 max-w-3xl mx-auto">

      <motion.div
        className="section-divider"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h2 className="section-heading">
          <span className="text-gradient-teal accent-serif italic">Achievements</span>
        </h2>
      </motion.div>

      <div className="relative mt-14">
        {/* GSAP-driven spine */}
        <div
          ref={lineRef}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full"
          style={{ background: "linear-gradient(to bottom, var(--c-teal), var(--c-purple), transparent)" }}
        />

        <div className="space-y-10">
          {achievements.map((a, i) => {
            const st     = TYPE_STYLES[a.type];
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { if (el) itemsRef.current[i] = el; }}
                className={`flex items-center gap-4 md:gap-6 flex-row
                  ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Card */}
                <motion.div
                  className={`card flex-1 p-5 space-y-2
                    ${isLeft ? "md:text-right" : "md:text-left"} text-left`}
                  whileHover={{
                    scale: 1.03,
                    borderColor: st.glow,
                    boxShadow: `0 0 28px 4px ${st.glow}30`,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Year + badge */}
                  <div className={`flex items-center gap-2 flex-wrap
                    ${isLeft ? "md:justify-end" : "md:justify-start"} justify-start`}>
                    <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--c-muted)" }}>
                      {a.year}
                    </span>
                    <span
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest"
                      style={{ color: st.text, background: st.bg, borderColor: st.border }}
                    >
                      {a.type}
                    </span>
                  </div>

                  <h3 className="heading-display text-xl text-white leading-tight">{a.title}</h3>
                  <p className="font-mono text-[11px] font-bold" style={{ color: "var(--c-teal)" }}>{a.org}</p>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: "var(--c-text)" }}>{a.desc}</p>
                </motion.div>

                {/* Centre node */}
                <div
                  className="hidden md:flex w-10 h-10 rounded-full flex-shrink-0 z-10
                    items-center justify-center text-base border-2"
                  style={{
                    background: "var(--c-card)",
                    borderColor: st.glow,
                    boxShadow: `0 0 16px ${st.glow}55`,
                  }}
                >
                  {a.icon}
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
