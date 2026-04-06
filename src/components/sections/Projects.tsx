"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCanvas = dynamic(() => import("../three/ProjectCanvas"), { ssr: false });

const STATUS_STYLES: Record<string, { text: string; bg: string; border: string }> = {
  Ongoing: { text: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)"  },
  Partial: { text: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)"  },
  Initial: { text: "#38bdf8", bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.3)"  },
};

const projects = [
  {
    title: "Adaptive Cognitive\nLearning Classroom",
    year: "2026", status: "Ongoing",
    bullets: [
      "GCR-based platform supporting students with dyslexia, dyscalculia & dysgraphia.",
      "Integrates Whisper speech-to-text for hands-free, accessible content delivery.",
      "Adaptive UI adjusts content format per each learner's cognitive profile.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "Whisper", "BrowserAPI", "MongoDB Atlas"],
    color: "#10b981", link: "https://github.com/Saravana-creator/ncert_2",
    image: "/aclc.png"
  },
  {
    title: "IntelliDoc\nParser",
    year: "2025", status: "Partial",
    bullets: [
      "AI-powered PDF knowledge base using RAG for semantic search and Q&A.",
      "OCR for text extraction, vector search with ChromaDB, conversational Streamlit interface.",
      "Enables intelligent document parsing and querying.",
    ],
    tech: {
      "AI & Data Processing": ["PYTHON", "CHROMADB", "SENTENCE-TRANSFORMERS", "FLAN-T5", "RANK-BM25", "TESSERACT OCR", "TINYDB"],
      "Backend & API": ["FASTAPI", "UVICORN", "SQLALCHEMY", "PASSLIB"],
      "Frontend UI": ["NEXT.JS", "REACT", "TAILWIND CSS", "FRAMER MOTION"]
    },
    color: "#f59e0b", link: "https://github.com/NAKULAN727/Intel-proj",
    image: "/intellidoc.png"
  },
  {
    title: "EduChain",
    year: "2025", status: "Initial",
    bullets: [
      "Blockchain-based decentralised web app to prevent fraud and duplication of academic certificates.",
      "Uses Ethereum test-net for secure credential verification.",
      "Prototype demonstrating blockchain's role in education trust.",
    ],
    tech: ["HTML", "CSS", "MongoDB", "Solidity", "Ethereum Test-net"],
    color: "#7c3aed", link: "https://github.com/Saravana-creator/VIT_HACKATHON",
    image: "/educhain.png"
  },
];

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="py-28 px-6 max-w-5xl mx-auto">

      <motion.div
        className="section-divider"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h2 className="section-heading">
          Featured <span className="text-gradient-teal accent-serif italic">Projects</span>
        </h2>
      </motion.div>

      <div className="space-y-24 mt-14">
        {projects.map((p, i) => {
          const st = STATUS_STYLES[p.status];
          return (
            <div
              key={p.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image / 3D Canvas */}
              <div className="w-full md:w-80 h-64 flex-shrink-0 relative rounded-lg overflow-hidden border flex items-center justify-center p-2" style={{ borderColor: `var(--c-border)`, background: 'var(--c-surface)' }}>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500 rounded-md" />
                ) : (
                  <ProjectCanvas title={p.title} color={p.color} />
                )}
              </div>

              {/* Card */}
              <motion.div
                className="card flex-1 p-7 space-y-4"
                whileHover={{ boxShadow: `0 0 32px 4px ${p.color}28`, borderColor: p.color }}
                transition={{ duration: 0.25 }}
              >
                {/* Title row */}
                <div className="flex flex-wrap items-start gap-3">
                  <h3 className="heading-display text-3xl text-white leading-none">
                    {p.title.replace("\n", " ")}
                  </h3>
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest self-center"
                    style={{ color: st.text, background: st.bg, borderColor: st.border }}
                  >
                    {p.status}
                  </span>
                  <span className="ml-auto font-mono text-xs" style={{ color: "var(--c-muted)" }}>
                    {p.year}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 font-mono text-xs leading-relaxed" style={{ color: "var(--c-text)" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech chips */}
                {Array.isArray(p.tech) ? (
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2.5 py-1 rounded-sm border uppercase tracking-wider"
                        style={{ color: "var(--c-muted)", borderColor: "var(--c-border)", background: "var(--c-surface)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-2">
                    {Object.entries(p.tech).map(([category, skills]) => (
                      <div key={category} className="space-y-2 flex flex-col items-start border-l-2 pl-3" style={{ borderLeftColor: `${p.color}40` }}>
                        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>{category}</span>
                        <div className="flex flex-wrap gap-2">
                          {(skills as string[]).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[9px] px-2.5 py-1 rounded-full border uppercase tracking-wider transition-all duration-300"
                              style={{ 
                                color: "var(--c-muted)", 
                                borderColor: "var(--c-border)", 
                                background: "rgba(0,0,0,0.2)"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = p.color;
                                e.currentTarget.style.color = p.color;
                                e.currentTarget.style.boxShadow = `0 0 8px ${p.color}33`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--c-border)";
                                e.currentTarget.style.color = "var(--c-muted)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-subtle inline-flex"
                  style={{ borderColor: p.color, color: p.color }}
                >
                  GitHub ↗
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
