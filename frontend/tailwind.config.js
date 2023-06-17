/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-malachite": "#18dd43",
        "custom-eerie-black": "#1C2222",
        "custom-isabelline": "#F4F3EE",
        "custom-pigment-green": "#00B354",
        "custom-onyx": "#3E3E3E",
        "custom-jet": "#303030",
        "custom-text": "#333333",
        "custom-anti-flash-white": "#F1F1F1",
      },
    },
  },
  plugins: [],
};
