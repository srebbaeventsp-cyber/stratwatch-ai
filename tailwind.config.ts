import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'stw-charcoal': '#0A0B0E',
        'stw-surface': '#15171C',
        'stw-ivory': '#D6D2CC',
        'stw-amber': '#8A6A2F',
        'stw-red': '#7A1E1E',
        'stw-meta': '#6F6A63',
      },
      fontFamily: {
        'tech': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
