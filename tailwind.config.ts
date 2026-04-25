import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crema: "#F5EFE6",
        tierra: "#3B2817",
        tabaco: "#9B6B3D",
        "azul-noche": "#2C3E5C",
        "cielo-polvo": "#7B95B8",
        coral: "#FF5A4E",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "dot-pulse": {
          "0%, 80%, 100%": { opacity: "0.2", transform: "translateY(0)" },
          "40%": { opacity: "1", transform: "translateY(-2px)" },
        },
      },
      animation: {
        "dot-pulse": "dot-pulse 1.2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
