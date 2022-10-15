/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
      },
      backgroundImage: {
        "red-blob": "url('/src/images/redblob.svg')",
      },
    },
  },
  plugins: [],
};
