/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#11101D',
        text: '#FFFFFF',
        main: '#94EC24',
      },
      screens: {
        'hoverable': {'raw': '(hover: hover)'},
      },
    },
  },
  plugins: [],
}

