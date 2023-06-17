/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        Heading: ['DM Sans', 'sans-serif'],
        SubHeading: ['Karla', 'sans-serif']
      },
      colors: {
        customGrey: '#E3F2EF',
        customLightBlue: '#E8EDFF',
        customGreenTwo: '#71D19D'
      }
    }
  },
  plugins: []
}
