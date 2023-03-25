/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
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
      '2xl': {'min': '1366px'},
      'xl': {'min': '1200px'},
      'lg': {'min': '992px'},
      'md': {'min': '768px'},
      'sm': {'min': '576px'},
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '90%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '872px',
          },
          '@screen xl': {
            maxWidth: '1088px',
          },
          '@screen 2xl': {
            maxWidth: '1088px',
          },
        }
      })
    }
  ],
}
