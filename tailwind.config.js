/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nerko: ['"Nerko One"', 'cursive'],
      },
      colors: {
        primary: "#1D7151",
        playground: "#E8F1EE",
        grayground: "#E8F1EE",
        lightgreen: "#4E4E4E" 
      },
    },
  },
  plugins: [],
};
