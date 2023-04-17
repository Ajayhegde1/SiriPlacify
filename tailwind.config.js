/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary_green: '#006241',
      secondary_green: '#1BA979',
      primary_blue: '#332FE8',
      gray: '#475E6B',
      background: '#F5F6FA',
      primary_font: '#191D20',
      secondary_font: '#333333',
      tertiary_font: '#6E757E',
      button_black: '#282730',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
