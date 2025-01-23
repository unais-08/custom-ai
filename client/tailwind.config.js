/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0e0c16",
        foreground: "#ececec",
      },
    },
  },
  plugins: [],
};
