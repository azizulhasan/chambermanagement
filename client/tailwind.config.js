/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/front/home/**/*.{html,js,jsx,ts,tsx}",
    "./src/pages/Front.js",
    "./src/pages/Login.js",
    "./src/pages/Register.js",
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}