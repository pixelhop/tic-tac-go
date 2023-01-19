/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        black: "#000201",
        orange: {
          DEFAULT: "#FF7615",
        },
        blue: {
          DEFAULT: "#02FFFF",
        },
      },
    },
  },
  plugins: [],
};
