/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", lg: "2rem" } },
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["DM Sans", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",
          500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",
          DEFAULT:"#0e7490"
        },
      },
      boxShadow: { card: "0 8px 30px -12px rgba(2, 132, 199, 0.25)" },
      borderRadius: { xl:"1rem", "2xl":"1.25rem", "3xl":"1.75rem" }
    },
  },
  plugins: [],
};
