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
        "primary_blue_darker": "#1958CF"
      },
    }
  },
  plugins: [],
}

