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
        // Earth & Heritage Palette
        terracotta: {
          DEFAULT: "#B85042",
          50: "#FAF0EF",
          100: "#F5E0DE",
          200: "#EBC2BE",
          300: "#E0A39C",
          400: "#D48278",
          500: "#B85042", // Primary
          600: "#9A4034",
          700: "#7A3026",
          800: "#5B211A",
          900: "#3D130E",
        },
        sage: {
          DEFAULT: "#A7BEA9",
          50: "#F4F7F4",
          100: "#E9EFEA",
          200: "#D4E0D6",
          300: "#BDCFBF",
          400: "#A7BEA9", // Secondary
          500: "#8EA990",
          600: "#718E74",
          700: "#576F5A",
          800: "#3E5040",
          900: "#263227",
        },
        amber: {
          DEFAULT: "#E7A93B",
          50: "#FEF9EE",
          100: "#FCF0D6",
          200: "#F9E1AA",
          300: "#F5D07D",
          400: "#EEBD53",
          500: "#E7A93B", // Accent (CTAs)
          600: "#C98B22",
          700: "#9C6916",
          800: "#704A0D",
          900: "#452C06",
        },
        cream: {
          DEFAULT: "#F7F5F0",
          50: "#FFFFFF",
          100: "#FBF9F6",
          200: "#F7F5F0", // Background
          300: "#ECE7DE",
          400: "#DFD7CA",
          500: "#D1C6B4",
        },
        dark: {
          DEFAULT: "#2B2D2F",
          50: "#8E9398",
          100: "#7E8389",
          200: "#63686D",
          300: "#4D5054",
          400: "#3A3C3E",
          500: "#2B2D2F", // Text
          600: "#222425",
          700: "#1A1B1C",
          800: "#111213",
          900: "#090909",
        },
      },
      fontFamily: {
        heading: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
