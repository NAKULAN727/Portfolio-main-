"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


const LINKS = ["About", "Studies", "Skills", "Projects", "Achievements", "Certifications", "Contact"];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive]   = useState("");
  const [isOpen, setIsOpen]   = useState(false);

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
      className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-4 md:px-8 py-3 md:py-4 border-b"
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
      <a href="#hero" className="flex items-center transition-transform hover:scale-105 duration-300 shrink-0">
        <img 
          src="/logo.png" 
          alt="SVN Logo" 
          className="h-10 md:h-16 scale-125 md:scale-150 w-auto object-contain mix-blend-screen origin-left" 
          style={{ 
            maskImage: "radial-gradient(circle, black 30%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 65%)"
          }}
        />
      </a>

      {/* Desktop Links */}
      <ul className="hidden lg:flex gap-8 items-center">
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

      {/* Desktop CTA */}
      <a href="mailto:nakulan07022007@gmail.com" className="btn-ghost hidden lg:inline-flex text-xs py-2 px-4">
        Hire Me
      </a>

      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden text-muted hover:text-teal transition-colors shrink-0 p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[100%] left-0 right-0 border-b flex flex-col p-6 gap-6 lg:hidden"
          style={{
            background: "rgba(8,10,15,0.95)",
            backdropFilter: "blur(16px)",
            borderColor: "var(--c-border)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={`font-mono text-sm tracking-widest uppercase transition-colors duration-200
                ${active === l ? "text-teal" : "text-muted hover:text-white"}`}
            >
              {l}
            </a>
          ))}
          <a 
            href="mailto:nakulan07022007@gmail.com" 
            className="btn-ghost inline-flex justify-center text-xs py-3 px-4 mt-2"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
