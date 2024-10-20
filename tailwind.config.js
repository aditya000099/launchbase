/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFF0F3', // Light pinkish
          dark: '#2D0A12', // Dark matte red
        },
        accent: {
          light: '#FF4D6D', // Pinkish red
          dark: '#C9184A', // Darker pinkish red
        },
        text: {
          light: '#1A0208', // Very dark red (almost black)
          dark: '#FFCCD5', // Very light pink
        },
        background: {
          light: '#FFF0F3', // Light pinkish
          dark: '#000000', // Dark matte red
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  plugins: [],
};
