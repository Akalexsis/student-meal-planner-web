/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", ".src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        DEFAULT: "#f0e7d7",
        primaryGreen: "#0B592f",
        secondaryGreen: "#011008",
        primaryOrange: "#df6f3b",
        yellowAccent: "#eeb627",
        brown: "#936440",
      },
      font: {
        DEFAULT: "Nunito Sans"
      }
    },
  },
  plugins: [],
}

