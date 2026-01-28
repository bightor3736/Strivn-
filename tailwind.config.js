/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,css}"],
  theme: {
    extend: {
      colors: {
        brandBlue: {
          primary: "#1D4ED8",
          dark: "#0B1F4E",
          soft: "#EEF2FF",
        },
        textPrimary: "#020617",
        textSecondary: "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
