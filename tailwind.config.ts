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
        border: "#313030",
        gold: "#FFE7A6",
        light_gold: "#FCC970",
        grey_text: "#D8D7D5",
        offwhite: "#FFFCF2",
        grey: "#4D4D4D",
        gold_dark: "#C0883A",
        background: "#08060A",
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
