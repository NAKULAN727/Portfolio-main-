"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const GlobeCanvas = dynamic(() => import("../three/GlobeCanvas"), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 max-w-5xl mx-auto">

      <motion.div
        className="section-divider"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h2 className="section-heading">
          Get In <span className="text-gradient-teal accent-serif italic">Touch</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-14 items-center mt-14">

        {/* Globe */}
        <motion.div
          className="h-72 md:h-96"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlobeCanvas />
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Labels + inputs */}
            {[
              { id: "name",    label: "Name",    type: "text",  placeholder: "Your name" },
              { id: "email",   label: "Email",   type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <div key={f.id} className="space-y-1.5">
                <label
                  htmlFor={f.id}
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--c-muted)" }}
                >
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  className="input-field"
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: "var(--c-muted)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="What's on your mind?"
                rows={4}
                required
                className="input-field resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message ↗
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
