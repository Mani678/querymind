/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080810",
        surface: "#0F0F1A",
        card: "#13131F",
        "card-hover": "#1A1A28",
        border: "#1E1E30",
        "border-light": "#2A2A40",
        accent: "#6366F1",
        primary: "#F0F0FF",
        secondary: "#C4C4D4",
        muted: "#6B6B8A",
      },
    },
  },
  plugins: [],
}