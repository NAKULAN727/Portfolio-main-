"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import gsap from "gsap";

// =========================================================================
// CUSTOMIZE YOUR HERO IMAGE HERE
// 1. Put your image inside the `public` folder (e.g., public/my-photo.jpg).
// 2. Change the url below to match your filename (e.g., "/my-photo.jpg").
// Note: If you leave this empty (""), it will use the default 👨 💻 emojis.
// =========================================================================
const HERO_IMAGE_URL = "";

const ParticleBackground = dynamic(() => import("../three/ParticleBackground"), { ssr: false });

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const metaRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Load any previously uploaded avatar from the browser storage
    const saved = localStorage.getItem("custom_hero_avatar");
    if (saved) setUploadedAvatar(saved);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headingRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(metaRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(subRef.current,     { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
      .fromTo(ctaRef.current,     { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedAvatar(base64String);
        localStorage.setItem("custom_hero_avatar", base64String); // Save it so it persists on refresh
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--g-hero)" }}
    >
      <div className="absolute inset-0 -z-10 bg-transparent pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Radial teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,245,212,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 py-28
                      flex flex-col md:flex-row md:items-center
                      gap-12 md:gap-20">

        {/* ── Left: text ─────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Eyebrow */}
          <p
            ref={metaRef}
            className="font-sans text-xs tracking-[0.3em] uppercase text-teal mb-5 opacity-0"
          >
            Full-Stack Developer · Competitive Programmer
          </p>

          {/* Display heading */}
          <h1
            ref={headingRef}
            className="heading-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] opacity-0"
          >
            Hi, I&apos;m<br />
            <span className="text-gradient-teal">Nakulan</span>
          </h1>

          {/* Accent subtitle */}
          <p
            ref={subRef}
            className="accent-serif text-lg md:text-xl text-white/60 mt-5 opacity-0"
          >
            Building things that <em>matter</em>.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start opacity-0">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="/Nakulan_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">View CV</a>
          </div>
        </div>

        {/* ── Right: avatar ───────────────────────────────────────────────── */}
        <motion.div
          className="flex-shrink-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Floating wrapper */}
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          >
            {/* Outer neon glow ring — pulsing */}
            <div
              className="absolute -inset-4 rounded-full animate-pulse-glow pointer-events-none"
              style={{
                background: "transparent",
                boxShadow: "0 0 40px 10px rgba(0,245,212,0.3), 0 0 80px 20px rgba(124,58,237,0.15)",
              }}
            />

            {/* Spinning gradient border ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: "conic-gradient(var(--c-teal), var(--c-purple), var(--c-teal))",
                padding: "4px",
              }}
            />

            {/* Avatar inner circle - NOW INTERACTIVE */}
            <label
              className="absolute inset-[6px] rounded-full overflow-hidden flex items-center justify-center text-7xl md:text-8xl select-none cursor-pointer group"
              style={{ background: "var(--c-card)" }}
            >
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20 text-sm font-sans tracking-widest uppercase text-white/90 font-bold">
                <span className="text-2xl mb-1">📸</span>
                Upload
              </div>

              {uploadedAvatar ? (
                <img 
                  src={uploadedAvatar} 
                  alt="Uploaded Avatar" 
                  className="w-full h-full object-cover relative z-10" 
                />
              ) : HERO_IMAGE_URL ? (
                <img 
                  src={HERO_IMAGE_URL} 
                  alt="Nakulan" 
                  className="w-full h-full object-cover relative z-10" 
                />
              ) : (
                <span className="flex items-center gap-1 relative z-10">
                  <span>👨</span>
                  <span>💻</span>
                </span>
              )}
            </label>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-sans text-[10px] tracking-widest uppercase text-muted">Scroll</span>
        <div
          className="w-px h-10 animate-pulse-glow"
          style={{ background: "linear-gradient(to bottom, var(--c-teal), transparent)" }}
        />
      </div>
    </section>
  );
}
