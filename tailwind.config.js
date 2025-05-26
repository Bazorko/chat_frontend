/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": {"min": "1px"},
      },
      colors: {
        "primary_blue": "#1A64ED",
        "primary_blue_darker": "#1958CF",
        "dark_theme": "#0A0A0A"
      },
      maxWidth: {
        "3/4": "75%",
      },
      animation: {
        fadeInLeftToRight: "fadeInFromLeft 400ms linear forwards",
        fadeInRightToLeft: "fadeInFromRight 400ms ease-out forwards"
      },
      borderColor: ['invalid'],
      keyframes: {
        fadeInFromLeft: {
          "0%": { width: "0%", left: "0" },
          "100%": { width: "100%", left: "0" },
        },
        fadeInFromRight: {
          "0%": { width: "0", right: "0" },
          "100%": { width: "100%", right: "0" },
        }
      }
    }
  },
  plugins: [],
}

