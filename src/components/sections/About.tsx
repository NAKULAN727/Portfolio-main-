"use client";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-28 px-6 max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        About <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Avatar placeholder */}
        <motion.div
          className="w-56 h-56 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-6xl select-none"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: 3 }}
        >
          👨‍💻
        </motion.div>

        <div className="space-y-4">
          {[
            "I'm a B.Tech Computer Science student passionate about building impactful software and solving complex problems.",
            "I enjoy full-stack development, competitive programming, and exploring emerging technologies like blockchain and AI.",
            "Currently pursuing my degree while actively participating in hackathons and open-source projects.",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-slate-300 leading-relaxed"
              variants={fadeUp}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
