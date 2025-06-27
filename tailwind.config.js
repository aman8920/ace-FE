/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontSize: {
      "xs": '0.5rem',
      "sm": '0.7rem',
      "small": '0.7rem',
      "base": '1rem',
      "xl": '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },
  darkMode: "class",
  plugins: [nextui({
    layout: {
      fontSize: {
        tiny: "0.6rem", // text-tiny
        small: "0.75rem", // text-small
        medium: "1rem", // text-medium
        large: "1.125rem" // text-large
      }
    }
  }), require('tailwind-scrollbar')],
};
