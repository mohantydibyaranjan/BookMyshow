/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-700': '#1d4ed8', // Dark Blue for sidebar and accents
        'gold': '#FFD700', // Metallic Gold for premium elements
        'silver': '#C0C0C0', // Metallic Silver for premium elements
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      height: {
        '16': '4rem',
      }
    },
  },
  plugins: [],
}