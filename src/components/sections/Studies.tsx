"use client";
import { motion } from "framer-motion";

const STUDIES = [
  {
    institution: "Sri Eshwar College of Engineering",
    degree: "B.E. Computer Science and Engineering",
    year: "2024 - 2028",
    highlights: ["Currently pursuing", "Focusing on Software Engineering, Data Structures, and Web Development"],
  },
  {
    institution: "Sri Vidhya Bharati Matriculation Higher Secondary School, Salem",
    degree: "Higher Secondary",
    year: "2023 - 2024",
    highlights: ["Completed higher secondary education", "Strong foundation in Mathematics and Computer Science"],
  },
];

export default function Studies() {
  return (
    <section id="studies" className="py-28 px-6 max-w-5xl mx-auto relative z-10">
      {/* Heading */}
      <motion.div
        className="section-divider mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-heading text-center text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          My <span className="text-gradient-teal accent-serif">Education</span>
        </h2>
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-teal to-transparent"></div>
      </motion.div>

      {/* Timeline/Cards */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-teal/50 before:to-transparent">
        {STUDIES.map((study, index) => (
          <motion.div
            key={index}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-teal shadow-[0_0_15px_rgba(0,245,212,0.5)] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,245,212,0.8)] transition-all duration-300">
              <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full"></div>
            </div>

            {/* Card Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm relative transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-white/[0.04] hover:shadow-glow-teal group-hover:after:opacity-100 overflow-hidden ml-16 md:ml-0">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-gradient-to-br from-teal/20 to-purple/20 z-0"></div>
              
              <div className="relative z-10">
                <span className="inline-block py-1 px-3 rounded-full bg-teal/10 text-teal text-xs font-semibold tracking-wider mb-4 border border-teal/20">
                  {study.year}
                </span>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal transition-colors duration-300">
                  {study.degree}
                </h3>
                <h4 className="text-sm font-medium text-purple-400 mb-4 uppercase tracking-wide">
                  {study.institution}
                </h4>
                <ul className="space-y-2">
                  {study.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="text-sm text-gray-400 flex items-start">
                      <span className="text-teal mr-2 opacity-70 mt-0.5 max-w-[12px] min-w-[12px] flex-shrink-0">▹</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
