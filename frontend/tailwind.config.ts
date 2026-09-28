import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B", // Primary Machinery Orange
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        navy: {
          950: "#070C18", // Deepest slate/navy body bg
          900: "#0F172A", // Primary dark background
          850: "#131C2E", // Header & card bg
          800: "#1A253A", // Card surface
          700: "#22314E", // Elevated surface / dropdowns
          600: "#334155", // Borders
          500: "#475569",
          400: "#64748B",
          300: "#94A3B8", // Subtle secondary text
          200: "#CBD5E1",
          100: "#E2E8F0", // High contrast light text
        },
      },
      keyframes: {
        "gear-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "gear-spin": "gear-spin 12s linear infinite",
        "gear-spin-fast": "gear-spin 2s cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-slow": "pulse-slow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
