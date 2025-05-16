/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // This is a blue color, you can adjust as needed
        secondary: '#1e40af',
        accent: '#60a5fa',
        'primary-dark': '#2563eb',  // Add this darker blue shade
        'primary-light': '#93c5fd', // You might want to add this too for consistency
      },
    },
  },
  plugins: [],
}