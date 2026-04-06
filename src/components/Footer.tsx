"use client";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/NAKULAN727",                          icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nakulan-s-v-4b5093315/",    icon: "in" },
  { label: "Email",    href: "mailto:nakulan07022007@gmail.com",                       icon: "@" },
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
          © {year} <span className="text-teal">Nakulan</span> — Built with Next.js · Three.js · GSAP
        </p>

        <div className="flex gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="font-mono text-xs text-muted hover:text-teal transition-colors duration-200
                         tracking-widest uppercase"
            >
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
