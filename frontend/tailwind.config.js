/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "button-header-black": "rgba(var(--color-button-header-black), 1)",
        "button-header-white": "rgba(var(--color-button-header-white), 1)",
        "color-gray": "rgba(var(--color-gray), 1)",
        "color-black": "rgba(var(--color-black), 1)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
}
