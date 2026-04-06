"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCanvas = dynamic(() => import("../three/ProjectCanvas"), { ssr: false });

const projects = [
  {
    title: "Health Checkup\nTracker",
    description: "A full-stack health monitoring app with real-time vitals tracking, appointment scheduling, and AI-powered health insights.",
    tech: ["Next.js", "Node.js", "MongoDB", "TensorFlow"],
    color: "#6366f1",
    link: "#",
  },
  {
    title: "EduChain",
    description: "Blockchain-based academic credential verification platform using Solidity smart contracts and IPFS for tamper-proof records.",
    tech: ["Solidity", "React", "IPFS", "Hardhat"],
    color: "#8b5cf6",
    link: "#",
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
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <section id="projects" className="py-28 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Featured <span className="text-primary">Projects</span>
      </h2>

      <div className="space-y-16">
        {projects.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* 3D Cube */}
            <div className="w-full md:w-64 h-64 flex-shrink-0">
              <ProjectCanvas title={p.title} color={p.color} />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <h3 className="text-2xl font-bold">{p.title.replace("\n", " ")}</h3>
              <p className="text-slate-400">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full border border-primary/40 text-primary">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                className="inline-block mt-2 px-5 py-2 bg-primary rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-colors"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
