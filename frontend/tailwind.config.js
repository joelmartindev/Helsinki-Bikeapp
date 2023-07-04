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
      keyframes: {
        "triangle-short": {
          from: {
            transform: "translate(0px, 8px)",
          },
          "50%": {
            transform: "translate(130px, 10px)",
          },
          "75%": {
            transform: "translate(90px, 5px)",
          },
          to: {
            transform: "translate(0px, 8px)",
          },
        },
        "triangle-long": {
          from: {
            transform: "translate(0px, 18px)",
          },
          "50%": {
            transform: "translate(180px, 22px)",
          },
          "70%": {
            transform: "translate(140px, 16px)",
          },
          to: {
            transform: "translate(0px, 18px)",
          },
        },
      },
      animation: {
        "triangle-short": "triangle-short 9s ease-in-out infinite",
        "triangle-long": "triangle-long 11s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
