module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["sr-only"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
