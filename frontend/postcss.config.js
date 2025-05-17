export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // Add helpful error messages if plugins fail to load
  errorHandler: (error) => {
    console.error('PostCSS error:', error.message);
    throw error;
  }
}
