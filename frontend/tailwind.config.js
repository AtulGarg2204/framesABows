/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
};