"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GlobeCanvas = dynamic(() => import("../three/GlobeCanvas"), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In <span className="text-primary">Touch</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Globe */}
        <div className="h-72 md:h-96">
          <GlobeCanvas />
        </div>

        {/* Form */}
        <motion.form
          className="space-y-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
        >
          {["Name", "Email"].map((field) => (
            <motion.input
              key={field}
              type={field === "Email" ? "email" : "text"}
              placeholder={field}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
              whileFocus={{ borderColor: "#6366f1", scale: 1.01 }}
            />
          ))}
          <motion.textarea
            placeholder="Message"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"
            whileFocus={{ borderColor: "#6366f1", scale: 1.01 }}
          />
          <motion.button
            type="submit"
            className="w-full py-3 bg-primary rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
