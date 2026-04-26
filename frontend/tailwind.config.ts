/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agent: {
          frontend: '#1164A3', // standard slack blue
          backend: '#E01E5A', // standard slack red
          reviewer: '#2EB67D', // standard slack green
        },
        slack: {
          bg: '#ffffff',
          sidebar: '#3f0e40',
          sidebarHover: '#350d36',
          sidebarText: '#cfa9cf',
          sidebarActiveBg: '#1164a3',
          sidebarActiveText: '#ffffff',
          text: '#1d1c1d',
          border: '#dddddd',
          blue: '#1164a3'
        }
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
