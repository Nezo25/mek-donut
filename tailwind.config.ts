import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E91E63",
          accent: "#10B981",
          surface: "#FFF5F8",
          secondary: "#FCF8F9",
          dark: "#2A2A2A",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', "Playfair Display", "serif"],
        sans: ['var(--font-poppins)', "Poppins", "sans-serif"],
        cursive: ['var(--font-dancing)', "Dancing Script", "cursive"],
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(0,0,0,0.05)",
        glass: "0 8px 32px 0 rgba(233, 30, 99, 0.12)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 28s linear infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg) scale(1)" },
          "50%": { transform: "rotate(3deg) scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
