"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";

const CERTIFICATIONS = [
  {
    id: 1,
    title: "SQL (Basics)",
    issuer: "HackerRank",
    year: "2025",
    icon: "mdi:database-search",
    link: "https://www.hackerrank.com/certificates/c3d83de10632",
  },
  {
    id: 2,
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    year: "2025",
    icon: "mdi:database-sync",
    link: "https://www.hackerrank.com/certificates/dfc4686151d0",
  },
  {
    id: 3,
    title: "K! Hacks 3.0 Participation",
    issuer: "CEG Campus",
    year: "2026",
    icon: "carbon:code",
    link: "https://drive.google.com/file/d/1byGNr1-iRUmQ7Gtc9Ze0RC9zFTME238T/view?usp=drivesdk",
  },
  {
    id: 4,
    title: "Hack The Horizon",
    issuer: "VIT Chennai",
    year: "2025",
    icon: "ph:rocket-launch-duotone",
    link: "https://drive.google.com/file/d/1L74EslT4hl7gabSbYpxQzckCBndqPiq5/view?usp=drivesdk",
  },
  {
    id: 5,
    title: "Mastering Data Structures & Algorithms",
    issuer: "Udemy",
    year: "2025",
    icon: "fluent:code-block-24-regular",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-3ec836ba-dccf-4b64-9591-d8e8a6965c9c.pdf",
  },
];

function CertCard({ cert, index }: { cert: typeof CERTIFICATIONS[0], index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-56 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateX: isFlipped ? 180 : 0, y: isFlipped ? -8 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 card flex flex-col items-center justify-center p-6 text-center bg-[#141920] border-[#1e2530] rounded-xl transition-all duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center mb-4 text-teal-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300">
            <Icon icon={cert.icon} className="w-7 h-7" />
          </div>
          <h3 className="font-sans font-bold text-lg text-white leading-tight">
            {cert.title}
          </h3>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0f1318] border border-teal-500/40 rounded-xl"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateX(180deg)",
            boxShadow: "0 0 30px 5px rgba(0,245,212,0.15)"
          }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Icon icon="ph:certificate-duotone" className="w-20 h-20 text-teal-500" />
          </div>
          
          <p className="text-teal-400 font-mono text-xs tracking-widest uppercase mb-1 z-10">Issuer</p>
          <h4 className="text-white font-bold text-lg mb-2 z-10">{cert.issuer}</h4>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2 z-10" />
          
          <p className="text-gray-400 font-mono text-sm mb-4 z-10">
            Issued: <span className="text-purple-400 font-bold">{cert.year}</span>
          </p>

          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent card flip when clicking the link
            className="z-20 px-5 py-1.5 rounded text-[10px] font-mono tracking-widest uppercase border border-teal-500/50 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 transition-colors"
          >
            Verify ↗
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div
        className="section-divider"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading">
          My <span className="text-gradient-teal accent-serif italic pr-2">Certifications</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
