/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // <- Tailwind scans all HTML, JS, and CSS files in src
  ],
  theme: {
    extend: {
      backgroundImage: {
        'restaurant': "url('./Images/background/restaurant-bcg.jpg')"
      },
    },
  },
  plugins: [],
}
