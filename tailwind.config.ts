import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#FFE7A6",
        offwhite: "#FFFCF2",
        grey: "#4D4D4D",
        gold_dark: "#C0883A",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        beaufort: ["BeaufortPro", "sans-serif"],
        lato: ["var(--font-lato)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
