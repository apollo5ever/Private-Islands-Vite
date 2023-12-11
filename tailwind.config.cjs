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
          DEFAULT: '#FFF',
          dark: '#000'
        }
      },
      typography: {
        dark: {
          css: {
            '*': {
              color: '#EEEDE6',
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
          "primary": "#76BDDB",
          "secondary": "#8DCAB2",
          "accent": "#866640",
          "neutral": "#28353e",
          "base-100": "#E5E5E5",
          "info": "#E1D7BA",
          "success": "#00F70C",
          "warning": "#DB8B76",
          "error": "#e14167",
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          "primary": "#0C4A6E",
          "secondary": "#0369A1",
          "accent": "#334155",
          "neutral": "#191D24",
          "base-100": "#2A303C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
          "color": "#EEEDE6",
        }
      }
    ],
  },
}