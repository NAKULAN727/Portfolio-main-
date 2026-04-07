"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";

const GlobeCanvas = dynamic(() => import("../three/GlobeCanvas"), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  value={formData[f.id as keyof typeof formData]}
                  onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
                className="input-field resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              className={`btn-primary w-full justify-center transition-all ${status === "success" ? "bg-green-500 text-white" : status === "error" ? "bg-red-500 text-white" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent! ✓" : status === "error" ? "Failed! Try again" : "Send Message ↗"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
