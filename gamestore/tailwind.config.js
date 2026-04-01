/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        slowzoom: {
          '0%': { transform: 'scale(1.05) translateY(0)' },
          '50%': { transform: 'scale(1.1) translateY(-5px)' },
          '100%': { transform: 'scale(1.05) translateY(0)' },
        },
      },
      animation: {
        slowzoom: 'slowzoom 15s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
