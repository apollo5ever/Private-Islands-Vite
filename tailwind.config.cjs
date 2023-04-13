/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          "primary": "#0c4a6e",
          "primary-focus": "#0284c7",
          "primary-content": "#e2e8f0",
          "secondary": "#115e59",
          "secondary-focus": "#0d9488",
          "secondary-content": "#e2e8f0",
          "accent": "#78350f",
          "accent-focus": "#b45309",
          "accent-content": "#fcd34d",
          "info": "#e2e8f0",
          "info-focus": "#cbd5e1",
          "info-content": "#27272a",
        },
      }
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}