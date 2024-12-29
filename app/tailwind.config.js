/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3a643b", // Main color, e.g., buttons, headers, etc.
        accent: "#fff7e2", // Secondary color, used for background or highlights
      },
    },
  },
  plugins: [],
};
