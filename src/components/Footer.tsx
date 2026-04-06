"use client";

export default function Footer() {
  // new Date() runs only on the client — no SSR mismatch
  const year = new Date().getFullYear();
  return (
    <footer className="text-center py-8 text-slate-600 text-sm border-t border-white/5">
      © {year} Nakulan. Built with Next.js, Three.js &amp; GSAP.
    </footer>
  );
}
