/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important: Add this to prevent Tailwind from clashing with Material-UI's styles
  // This tells Tailwind to use `tw-` prefix for its classes
  prefix: 'tw-',
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles to avoid conflicts
  },
}