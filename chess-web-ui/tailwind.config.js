/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chess: {
          white: '#F0D9B5',
          black: '#B58863',
          light: '#F5DEB3',
          dark: '#9CAFB4',
        }
      }
    }
  },
  plugins: [],
}