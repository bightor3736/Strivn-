/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-900": "#050B1A",
        "bg-850": "#07122A",
        "bg-800": "#0B1B4D",
        "primary-500": "#2F80FF",
        "primary-400": "#58A6FF",
        "accent-400": "#4FC3FF",
        "text-100": "#F7FAFF",
        "muted-300": "#B8C6E6",
        border: "rgba(255,255,255,0.12)",
        card: "rgba(255,255,255,0.06)"
      },
      boxShadow: {
        glow: "0 0 32px rgba(88, 166, 255, 0.45)",
        card: "0 20px 40px rgba(5, 11, 26, 0.35)"
      }
    }
  },
  plugins: []
};
