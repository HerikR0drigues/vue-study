/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleCustom: '#6C48C5',
        background: '#EDF1F6',
        secondaryBackground: '#F2F4F7',
        thirdBackground: "#FAFAFA",
        backgroundPurple: "rgba(15, 0, 37, 1)",
        spanHeader: "#c1095a",
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

