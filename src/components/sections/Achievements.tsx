"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { year: "2024", title: "Hackathon Winner", desc: "1st place at Smart India Hackathon — Health Tech track.", icon: "🏆" },
  { year: "2024", title: "LeetCode 500+", desc: "Solved 500+ problems, reaching Knight rating.", icon: "⚔️" },
  { year: "2023", title: "HackerRank 5★", desc: "Achieved 5-star rating in Problem Solving & Python.", icon: "⭐" },
  { year: "2023", title: "SkillRack Top 1%", desc: "Ranked in top 1% among 50,000+ students.", icon: "📊" },
  { year: "2023", title: "EduChain Finalist", desc: "Top 10 finalist at National Blockchain Hackathon.", icon: "🔗" },
];

export default function Achievements() {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the vertical line growing
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "none",
        scrollTrigger: { trigger: lineRef.current, start: "top 70%", end: "bottom 30%", scrub: true },
      }
    );

    // Animate each item
    itemsRef.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section id="achievements" className="py-28 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">
        <span className="text-primary">Achievements</span> &amp; Stats
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-primary/40" />

        <div className="space-y-12">
          {achievements.map((a, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`flex-1 p-5 rounded-xl bg-white/5 border border-white/10 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                <span className="text-xs text-primary font-semibold">{a.year}</span>
                <h3 className="text-lg font-bold mt-1">{a.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{a.desc}</p>
              </div>

              {/* Center dot */}
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-lg flex-shrink-0 z-10">
                {a.icon}
              </div>

              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
