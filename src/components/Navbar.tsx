"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const LINKS = ["About", "Studies", "Skills", "Projects", "Achievements", "Certifications", "Contact"];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive]   = useState("");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const current = LINKS.find((l) => {
        const el = document.getElementById(l.toLowerCase());
        if (!el) return false;
        const { top } = el.getBoundingClientRect();
        return top <= 120 && top > -el.offsetHeight + 120;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 flex justify-between items-center
                 px-8 py-4 border-b"
      style={{
        background: "rgba(8,10,15,0.85)",
        backdropFilter: "blur(16px)",
        borderColor: "var(--c-border)",
      }}
      initial={mounted ? { y: -64, opacity: 0 } : false}
      animate={mounted ? { y: 0,   opacity: 1 } : undefined}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center transition-transform hover:scale-105 duration-300">
        <img 
          src="/logo.png" 
          alt="SVN Logo" 
          className="h-16 scale-150 w-auto object-contain mix-blend-screen origin-left" 
          style={{ 
            maskImage: "radial-gradient(circle, black 30%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 65%)"
          }}
        />
      </a>

      {/* Links */}
      <ul className="hidden md:flex gap-8">
        {LINKS.map((l) => (
          <li key={l} className="relative">
            <a
              href={`#${l.toLowerCase()}`}
              className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200
                ${active === l ? "text-teal" : "text-muted hover:text-white"}`}
            >
              {l}
            </a>
            {active === l && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{ background: "var(--c-teal)" }}
              />
            )}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="mailto:nakulan07022007@gmail.com" className="btn-ghost hidden md:inline-flex text-xs py-2 px-4">
        Hire Me
      </a>
    </motion.nav>
  );
}
