import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
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
        dark_purple: "#08080A",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        beaufort: ["BeaufortPro", "sans-serif"],
        lato: ["var(--font-lato)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        // Main background images
        "stars-bg": "url('/imgs/stars-bg.png')",
        "modal-bg": "url('/imgs/modal-bg.png')",
        "promptCard-bg": "url('/imgs/promptCard.png')",
        smoke: "url('/imgs/Smoke.png')",

        // Button images
        "button-glow": "url('/imgs/buttonglow.png')",
        "activated-button": "url('/imgs/activatedButton.png')",

        // Outline images
        outline: "url('/imgs/Outline.png')",
        outline1: "url('/imgs/Outline1.png')",
        "active-outline": "url('/imgs/activeOutline.png')",

        // Stone images
        "eye-stone": "url('/imgs/stones/eye-stone.png')",
        "genesis-stone-3x": "url('/imgs/stones/GenesisStone3x.png')",
        "genesis-stone-5x": "url('/imgs/stones/GenesisStone5x.png')",
        "genesis-stone-7x": "url('/imgs/stones/GenesisStone7x.png')",
        "genesis-stone-10x": "url('/imgs/stones/GenesisStone10x.png')",
        "genesis-stone-15x": "url('/imgs/stones/GenesisStone15x.png')",

        // Combined backgrounds
        "smoke-outline": "url('/imgs/Smoke.png'), url('/imgs/Outline.png')",
        "smoke-outline1": "url('/imgs/Smoke.png'), url('/imgs/Outline1.png')",
        "smoke-active-outline":
          "url('/imgs/Smoke.png'), url('/imgs/activeOutline.png')",
      },
      backgroundSize: {
        full: "100% 100%",
        "stone-lg": "387px 387px, 404px 404px",
        "stone-sm": "180px 180px, 188px 188px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
