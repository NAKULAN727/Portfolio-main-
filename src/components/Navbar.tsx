"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = ["About", "Skills", "Projects", "Achievements", "Contact"];

export default function Navbar() {
  // Don't animate until after hydration — avoids server/client style mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-dark/80 backdrop-blur-md border-b border-white/5"
      initial={mounted ? { y: -60, opacity: 0 } : false}
      animate={mounted ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span className="font-black text-xl text-primary">N.</span>
      <ul className="hidden md:flex gap-8 text-sm text-slate-400">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
