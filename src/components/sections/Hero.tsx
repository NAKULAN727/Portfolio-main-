"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ParticleBackground = dynamic(() => import("../three/ParticleBackground"), { ssr: false });

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="text-center z-10 px-4">
        <h1 ref={headingRef} className="text-6xl md:text-8xl font-black tracking-tight opacity-0">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Nakulan
          </span>
        </h1>
        <p ref={subRef} className="mt-4 text-xl md:text-2xl text-slate-400 opacity-0">
          Full-Stack Developer &amp; Competitive Programmer
        </p>
        <div ref={ctaRef} className="mt-8 flex gap-4 justify-center opacity-0">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary rounded-full font-semibold hover:bg-indigo-500 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-primary rounded-full font-semibold hover:bg-primary/10 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 text-sm">
        ↓ scroll
      </div>
    </section>
  );
}
