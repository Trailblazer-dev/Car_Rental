/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f52ba',
          light: '#3b82f6',
          dark: '#1e3a8a'
        },
        secondary: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Add extended spacing similar to Tailwind v4
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // Add these for Tailwind v4 features
      opacity: {
        '15': '.15',
        '35': '.35',
        '45': '.45',
        '55': '.55',
        '65': '.65',
        '85': '.85',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.2s ease',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  // Enable these features that were default in v4
  corePlugins: {
    container: false, // we'll define our own container below
  },
}
