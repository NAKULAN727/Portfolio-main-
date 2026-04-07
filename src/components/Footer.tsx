"use client";

import { Icon } from "@iconify/react";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/NAKULAN727",                          icon: "mdi:github",   hoverColor: "hover:text-white" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nakulan-s-v-4b5093315/",    icon: "mdi:linkedin", hoverColor: "hover:text-[#0A66C2]" },
  { label: "Email",    href: "mailto:nakulan07022007@gmail.com",                       icon: "mdi:email",    hoverColor: "hover:text-[#EA4335]" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="border-t py-10 px-8"
      style={{ borderColor: "var(--c-border)", background: "var(--c-surface)" }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted tracking-widest uppercase">
          © {year} <span className="text-teal">Nakulan</span>
        </p>

        <div className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`text-muted transition-colors duration-200 ${s.hoverColor}`}
            >
              <Icon icon={s.icon} className="w-6 h-6 transform hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
