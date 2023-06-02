/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-malachite": "#18dd43",
        "custom-eerie-black": "#1C2222",
      },
    },
  },
  plugins: [],
};
