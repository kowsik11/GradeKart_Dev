/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Poppins"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#1e40af',
          secondary: '#0f172a',
          accent: '#1d4ed8',
        },
      },
      boxShadow: {
        card: '0 20px 40px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
