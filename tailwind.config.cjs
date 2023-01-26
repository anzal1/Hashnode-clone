/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./Editor/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      margin: {
        spacing: "1.25rem",
        xlspacing: "2rem",
      },
      padding: {
        spacing: "1.25rem",
        xlspacing: "2rem",
      },
      gap: {
        spacing: "1.25rem",
        xlspacing: "2rem",
      },

      colors: {
        blue: "rgb(52, 102, 246)",
        blue_hover: "rgb(37 79 203)",
        blue_light: "rgb(91 121 209)",
        red: "rgba(239, 68, 68, 1)",
        yellow: "#fde047",
        info: "hsl(198 93% 60%)",
        success: "hsl(158 64% 52%)",
        warning: "hsl(43 96% 56%)",
        black: "#444",
        error: "hsl(0 91% 71%)",
        dark: {
          border_primary: "rgba(31, 41, 55, 1)", //
          border_secondary: "rgba(55, 65, 81, 1)",
          primary_background: "rgba(17, 24, 39, 1)",
          paragraph_color: "rgba(156, 163, 175, 1)",
          heading_color: "rgba(255, 255, 255, 1)",
          secondary_background: "rgba(17, 24, 39, 1)",
          button_text: "rgba(229, 231, 235, 1)",
        },
        light: {
          border_primary: "rgba(229, 231, 235)",
          primary_background: "rgb(250 251 255)",
          paragraph_color: "rgba(75, 85, 99)",
          icon_color: "rgba(55, 65, 81)",
          input_background: "rgba(245, 247, 250)",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
