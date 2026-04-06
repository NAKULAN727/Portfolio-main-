/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ── Colour palette ────────────────────────────────────────────────────
      colors: {
        dark:    { DEFAULT: "#080a0f", 800: "#0d1017", 700: "#131720", 600: "#1a2030" },
        teal:    { DEFAULT: "#00f5d4", 400: "#33f7db", 600: "#00c4aa", 900: "#003d35" },
        purple:  { DEFAULT: "#7c3aed", 400: "#a78bfa", 600: "#6d28d9", 900: "#2e1065" },
        indigo:  { DEFAULT: "#6366f1", 400: "#818cf8", 600: "#4f46e5" },
        surface: { DEFAULT: "#0f1318", card: "#141920", border: "#1e2530" },
      },
      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        display: ["Bebas Neue", "Oswald", "sans-serif"],  // loud headings
        accent:  ["Oswald", "sans-serif"],                 // sub-headings / nav
        sans:    ["Open Sans", "sans-serif"],              // body default
        mono:    ["Open Sans", "sans-serif"],              // replaces Space Mono in utility classes
      },
      // ── Shadows / glows ───────────────────────────────────────────────────
      boxShadow: {
        "glow-teal":   "0 0 24px 4px rgba(0,245,212,0.25)",
        "glow-purple": "0 0 24px 4px rgba(124,58,237,0.30)",
        "glow-indigo": "0 0 20px 3px rgba(99,102,241,0.28)",
        "card":        "0 4px 32px rgba(0,0,0,0.55)",
      },
      // ── Keyframes ─────────────────────────────────────────────────────────
      keyframes: {
        "float": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 12px 2px rgba(0,245,212,0.2)" },
          "50%":     { boxShadow: "0 0 28px 6px rgba(0,245,212,0.45)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bar-grow": {
          "0%":   { width: "0%" },
          "100%": { width: "var(--bar-w)" },
        },
      },
      animation: {
        "float":      "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "marquee":    "marquee 28s linear infinite",
        "spin-slow":  "spin-slow 12s linear infinite",
        "bar-grow":   "bar-grow 1.2s cubic-bezier(.4,0,.2,1) forwards",
      },
    },
  },
  plugins: [],
};
