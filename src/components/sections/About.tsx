"use client";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

// =========================================================================
// CUSTOMIZE YOUR PROFILE IMAGE HERE
// 1. Put your image in the `public` folder (e.g., public/my-photo.jpg).
// 2. Change the url below to match your filename (e.g., "/my-photo.jpg").
// =========================================================================
const PROFILE_IMAGE_URL = "https://api.dicebear.com/9.x/notionists/svg?seed=Nakulan&backgroundColor=transparent&size=200";

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function About() {
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("custom_about_avatar");
    if (saved) setUploadedAvatar(saved);
  }, []);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedAvatar(base64String);
        localStorage.setItem("custom_about_avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="about" className="py-28 px-6 max-w-6xl mx-auto">
      
      {/* Section Small Heading */}
      <motion.div
        className="section-divider mb-16 text-center"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <h2 className="section-heading text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          About <span className="text-gradient-teal accent-serif italic pr-2">Me</span>
        </h2>
      </motion.div>

      {/* Main Split Layout container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start w-full max-w-xl text-center md:text-left">
          <motion.h3 
            className="text-4xl md:text-5xl font-bold mb-3"
            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ color: "var(--c-text)" }}
          >
            Hi, I&apos;m <span className="text-gradient-teal">Nakulan</span>
          </motion.h3>
          
          <motion.div 
            className="font-sans text-sm md:text-base tracking-widest uppercase text-teal mb-6 font-semibold opacity-90"
            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Full-Stack Developer &middot; Competitive Programmer
          </motion.div>
          
          <motion.div
            className="space-y-4 mb-8 flex-grow"
            variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <p className="font-mono text-sm md:text-base leading-relaxed text-white/70">
              I am a student passionate about turning ideas into reality through technology. 
              Whether it&apos;s building full-stack web applications, exploring new tools, or solving 
              complex competitive programming challenges, I embrace an &quot;always improving&quot; mindset.
            </p>
            <p className="font-mono text-sm md:text-base leading-relaxed text-white/70">
              My focus is on creating web experiences that are not only visually striking but also mathematically efficient 
              under the hood. I am actively looking to collaborate on meaningful projects and grow my skills.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-auto justify-center md:justify-start"
            variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="/Nakulan_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">View CV</a>
          </motion.div>
        </div>

        {/* Right Side: Circular Profile Image with Neon Effects */}
        <motion.div 
          className="flex-shrink-0 flex items-center justify-center w-full md:w-auto"
          variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="relative w-64 h-64 md:w-[380px] md:h-[380px] group transition-all duration-700">
            {/* 1. Breathing Pulsing Outer Glow */}
            <motion.div
              className="absolute -inset-10 rounded-full opacity-30 pointer-events-none blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(circle, var(--c-teal) 0%, var(--c-purple) 70%, transparent 100%)",
              }}
            />
            
            {/* 2. Glassy Background Layer */}
            <div className="absolute inset-0 rounded-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-500 group-hover:bg-white/[0.05] group-hover:border-white/20" />

            {/* 3. Orbiting Particles */}
            <div className="absolute inset-[-20px] pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-teal shadow-[0_0_15px_var(--c-teal)]"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: `${110 + i * 25}px 0`,
                  }}
                />
              ))}
            </div>

            {/* 4. Main Conic Rotating Ring (Now Deep Black/Dark Grey) */}
            <div
              className="absolute inset-[10px] rounded-full transition-all duration-1000 animate-spin-slow group-hover:[animation-duration:12s] group-hover:scale-105 group-hover:blur-[1px]"
              style={{
                background: "conic-gradient(from 0deg, transparent, #0a0a0a, #1a1a1a, #0a0a0a, transparent)",
                padding: "4px",
                maskImage: "radial-gradient(circle, transparent 66%, black 67%)",
                WebkitMaskImage: "radial-gradient(circle, transparent 66%, black 67%)",
              }}
            />

            {/* 5. Inner Secondary Glow Ring */}
            <div
              className="absolute inset-[18px] rounded-full border border-teal/20 blur-[1px] opacity-50 group-hover:opacity-100 group-hover:border-teal/50 transition-all duration-500"
            />
            
            {/* 6. The Profile Image Container */}
            <label
              className="absolute inset-[24px] cursor-pointer group/inner transition-all duration-500 group-hover:scale-[0.97] rounded-full isolate"
              style={{
                background: "var(--c-card)",
                overflow: "hidden",
                maskImage: "radial-gradient(white, black)",
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                borderRadius: "50%"
              }}
            >
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              
              {/* Image Reveal Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 z-20 pointer-events-none" />

              {/* Upload Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/inner:opacity-100 transition-opacity flex flex-col items-center justify-center z-30 text-[10px] font-sans tracking-[0.3em] uppercase text-white/90 font-bold backdrop-blur-sm pointer-events-none">
                <span className="text-3xl mb-3 animate-pulse">📸</span>
                Update Avatar
              </div>

              <img 
                src={uploadedAvatar || PROFILE_IMAGE_URL}
                alt="Nakulan's Profile" 
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                style={{ borderRadius: "50%" }}
              />
            </label>
            
            {/* 7. Floating Tech Badge */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-teal-500/40 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,245,212,0.2)] z-30"
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal animate-pulse shadow-[0_0_10px_var(--c-teal)]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
