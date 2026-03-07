import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        syne: ["Satoshi", "sans-serif"],
        inter: ["Satoshi", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        dark: "hsl(0 0% 3.9%)",
        surface: "hsl(0 0% 9%)",
        accent: "#2563EB",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
