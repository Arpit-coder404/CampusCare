/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          ivory: '#F8F7F2',
          white: '#FFFFFF',
          forest: '#173F35',
          'forest-dark': '#0F2C25',
          'forest-light': '#1E4E42',
          green: '#3D8B68',
          'green-light': '#4EA87E',
          mint: '#E5F2EA',
          'mint-light': '#F0F8F4',
          charcoal: '#202722',
          'charcoal-muted': '#3C453F',
          grey: '#858A83',
          'grey-light': '#D6D9D4',
          border: '#E5E7E0',
          coral: '#D75D52',
          'coral-light': '#FDF1F0',
          amber: '#F2C66D',
          'amber-light': '#FEF9ED',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'DM Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 63, 53, 0.05), 0 1px 2px -1px rgba(23, 63, 53, 0.03)',
        'card': '0 4px 20px -2px rgba(23, 63, 53, 0.06), 0 2px 6px -1px rgba(23, 63, 53, 0.03)',
        'floating': '0 20px 40px -8px rgba(23, 63, 53, 0.12), 0 8px 16px -4px rgba(23, 63, 53, 0.06)',
      }
    },
  },
  plugins: [],
}

