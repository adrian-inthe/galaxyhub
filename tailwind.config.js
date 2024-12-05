/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sf: ["SF Distant Galaxy", "sans-serif"],
        rogan: ["Rogan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
