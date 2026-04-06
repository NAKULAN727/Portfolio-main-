"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAME = "NAKULAN".split("");

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";
    
    // Total wait time = ~2.5s
    const timer = setTimeout(() => {
      setShrinking(true);
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, 700); // Wait for exit animation to finish
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={shrinking ? { opacity: 0, scale: 1.1, filter: "blur(10px)", pointerEvents: "none" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center perspective-[1000px]">
        {/* Floating Glass Cube / Card */}
        <motion.div
          className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-cyan-400/40 backdrop-blur-xl bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_40px_rgba(6,182,212,0.6)] relative flex items-center justify-center mb-10 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{
            opacity: 1, 
            y: [-15, 15, -15],
            rotateX: [15, -15, 15],
            rotateY: [-15, 25, -15],
            scale: 1
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1, ease: "easeOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Inner Glow Center */}
          <div className="absolute inset-0 m-auto w-14 h-14 bg-cyan-500/30 blur-xl rounded-full" />
          
          {/* Edge reflection */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          
          {/* Inner Diamond/Cube */}
          <motion.div 
            className="w-8 h-8 bg-cyan-400/80 rounded shadow-[0_0_15px_#06b6d4]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* NAKULAN Text */}
        <div className="flex space-x-2 md:space-x-4 text-3xl md:text-5xl font-black tracking-[0.2em] text-[#e0f2fe] uppercase">
          {NAME.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: [
                  "0 0 0px rgba(6,182,212,0)", 
                  "0 0 20px rgba(6,182,212,0.8)", 
                  "0 0 10px rgba(6,182,212,0.4)"
                ]
              }}
              transition={{
                y: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + 0.3 },
                opacity: { duration: 0.6, ease: "easeOut", delay: i * 0.1 + 0.3 },
                textShadow: { 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut",
                  delay: i * 0.1 + 0.8
                }
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
