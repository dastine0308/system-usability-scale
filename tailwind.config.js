/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '22px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        xxl: ['32px', '45px'],
      }
    },
    screens: {
      '2xl': {'max': '1366px'},
      'xl': {'max': '1200px'},
      'lg': {'max': '992px'},
      'md': {'max': '768px'},
      'sm': {'max': '576px'},
    },
  },
  plugins: [],
}
