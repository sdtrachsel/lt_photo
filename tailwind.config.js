/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'orange': '#f9b17a',
      'purple': {
        100:'#676f9d',
        200:'#424769',
        300:'#2d3250',
      },
      white: '#fff',
    },
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

