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
        className="section-divider mb-16"
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        <h2 className="section-heading">
          About <span className="text-gradient-teal accent-serif italic">Me</span>
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

        {/* Right Side: Circular Profile Image */}
        <motion.div 
          className="flex-shrink-0 flex items-center justify-center w-full md:w-auto"
          variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="relative w-64 h-64 md:w-[340px] md:h-[340px] group">
            {/* Subtle outer glowing blob */}
            <div
              className="absolute -inset-4 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,245,212,0.15) 0%, rgba(124,58,237,0.15) 100%)",
              }}
            />
            
            {/* Spinning decorative ring */}
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: "conic-gradient(var(--c-teal), var(--c-purple), var(--c-teal))",
                padding: "3px",
              }}
            />
            
            {/* The Image Container - NOW INTERACTIVE */}
            <label
              className="absolute inset-[4px] rounded-full overflow-hidden flex items-center justify-center bg-gray-900 group-hover:scale-[0.98] transition-transform duration-500 ease-out cursor-pointer group/inner"
              style={{ background: "var(--c-card)" }}
            >
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/inner:opacity-100 transition-opacity flex flex-col items-center justify-center z-20 text-sm font-sans tracking-widest uppercase text-white/90 font-bold">
                <span className="text-3xl mb-2">📸</span>
                Upload
              </div>

              <img 
                src={uploadedAvatar || PROFILE_IMAGE_URL}
                alt="Profile of Nakulan" 
                className="w-full h-full object-cover relative z-10" 
              />
            </label>
            
            {/* Floating decorative badge */}
            <motion.div 
              className="absolute -bottom-2 -left-2 bg-gray-900/80 backdrop-blur-md border border-teal-500/30 rounded-2xl p-4 shadow-xl z-10"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
