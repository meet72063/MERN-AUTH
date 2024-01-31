/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode
        light: {
          bg: "#f8f9fa", // Dark background color
          text: "#333333", // Dark text color
          primary: "#e74c3c", // Primary color for links, buttons, etc.
        },
        // Dark Mode
        dark: {
          bg: "#1f2937", // Light background color
          text: "#fafafa", // Light text color
          primary: "#3498db", // Primary color for links, buttons, etc.
        },
      },
      height: {
        navHeight: "14vh",
      },
      minHeight: {
        page: "86vh",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
