/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/daisyui/dist/**/*.js'],
  theme: {
    extend: {
      backgroundColor: {
        'color-light': '#FFFFFF',
        'color-dark': '#2d353f',
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          "primary": "#3ce0d2",
          "secondary": "#5ee596",
          "accent": "#ffe182",
          "neutral": "#28353e",
          "base-100": "#eeeff6",
          "info": "#6c98d6",
          "success": "#125933",
          "warning": "#967b03",
          "error": "#e14167",
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          "primary": "#0C4A6E",
          "secondary": "#0369A1",
          "accent": "#6E6B0C",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        }
      }
    ],
  },
}