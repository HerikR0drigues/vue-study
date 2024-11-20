/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: "",
        aawzMain: "#B7E1A7",
        aawzSecondary: "#52c227",
        aawzThird: "#607367",
        aawzBlack: "#1C1A1E"
      },
      fontFamily: {
        'pixelfy': ["Pixelify Sans", "sans-serif"],
        'sofia': ["Sofia Sans Condensed", "sans-serif"],
        'poppins': ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Plugin para scrollbar
  ],
}

