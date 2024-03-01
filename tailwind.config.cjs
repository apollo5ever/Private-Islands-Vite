/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/daisyui/dist/**/*.js'],
  theme: {
    extend: {
      clipPath: {
        'deroHex': 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // This doesn't seem to work
      },
      fontFamily: {
        'fell': ['IM FELL Double Pica SC', 'serif'],
      },
      backgroundColor: {
        'light': 'var(--background-light)',
        'dark': 'var(--background-dark)',
      },
      colors: {
        themeNeutral: {
          DEFAULT: '#F9F9F9', /* Alabaster */
          dark: '#131313'     /* Bunker */
        }
      },
      typography: {
        light: {
          css: {
          }
        },
        dark: {
          css: {
            '*': {
              color: '#EEEDE6',  /* Cararra */
            }
          }
        }
      },
    },
  },
  important: true,
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          "primary": "#fdfbea", /* Buttery White - creamy white */
          "secondary": "#e5d7b9", /*Double Spanish White - light sand */
          "accent": "#61c0a8", /*Tradewind - light mint */
          "neutral": "#c0c0c0", /*Silver - grey */
          "neutral-100": "#e6e6e6", /*Mercury */
          "neutral-200": "#d9d9d9", /*Alto */
          "neutral-300": "#cdcdcd", /*Celeste */
          "neutral-400": "#c0c0c0", /*Silver - grey */
          "neutral-500": "#9a9a9a", /*Star Dust */
          "neutral-600": "#737373", /*Tapa */
          "neutral-700": "#4d4d4d", /*Emperor */
          "neutral-800": "#262626", /*Shark */
          "base-100": "#d5d8d7", /*Iron - light grey */
          "base-200": "#c0c2c2", /*Silver Sand */
          "base-300": "#aaadac", /*Silver Chalice */
          "base-400": "#959797", /*Mountain Mist */
          "base-500": "#808281", /*Gray */
          "base-600": "#6b6c6c", /*Dove Gray */
          "base-700": "#555656", /*Fuscous Gray */
          "base-800": "#404141", /*Cape Cod */
          "base-900": "#2b2b2b", /*Piano */
          "tradewind-100": "#c0e6dc", /*Sinbad*/
          "tradewind-200": "#a0d9cb", /*Jagged Ice*/
          "tradewind-300": "#81cdb9", /*Monte Carlo*/
          "tradewind-500": "#4e9a86", /*Patina*/
          "tradewind-600": "#3a7365", /*William*/
          "tradewind-700": "#274d43", /*Plantation*/
          "info": "#ffeb80", /*Sweet Corn - light gold */
          "success": "#61c0a8", /*Tradewind - light mint */
          "warning": "#bdaf7c", /*Mongoose - burnt sand/beige */
          "error": "#c06179", /*Tapestry - rosy red */
          "txt": "#000000",
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          "primary": "#132622", /*Bush - faded navy */
          "secondary": "#0369A1", /*pahama blue - medium blue */
          "accent": "#61c0a8", /*Tradewind - light mint */
          "neutral": "#191D24", /*mirage - night/dark */
          "base-100": "#2A303C", /*charade - light charcoal */
          "info": "#3ABFF8", /*picton blue - pop blue/bright */
          "success": "#36D399", /*shamrock - irish light green */
          "warning": "#FBBD23", /*lightning yellow - sharp yellow */
          "error": "#F87272", /*froly - rosy red (lighter) */
          "color": "#EEEDE6", /*cararra - off white */
          "txt": "#FFFFFF",
        }
      }
    ],
  },
}