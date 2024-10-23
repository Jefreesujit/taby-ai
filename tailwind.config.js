/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#242424',
          700: '#2E2E2E',
          500: '#393939'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
