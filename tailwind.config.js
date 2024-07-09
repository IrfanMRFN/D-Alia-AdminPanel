/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        acadia: "#34302d",
        "acadia-2": "#4c4742",
        "acadia-3": "#282522",
        finch: "#727C57",
        kelp: "#4A5039",
        gainsboro: "#D9D9D9",
        "gainsboro-2": "#C4C4C4",
        offwhite: "#FAF9F6",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
