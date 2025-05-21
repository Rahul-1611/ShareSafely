/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: '#CCD5AE',
        sage: '#E9EDC9',
        cream: '#FEFAE0',
        peach: '#FAEDCD',
        orange: '#D4A373',
      },
    },
  },
  plugins: [],
}

