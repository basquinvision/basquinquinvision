/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Main site palette
        ink: "#070707",
        blood: "#8d1f1b",
        crimson: "#bc3028",
        bone: "#eee9df",
        gold: "#b89a61",
        // Wedding palette (warm ivory / champagne / black / gold)
        night: "#100d0b",
        ivory: "#f4efe7",
        champagne: "#efe3d0",
        sand: "#d8b56d",
        bronze: "#8c6a2f",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Arial Narrow"', "sans-serif"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        body: ["Inter", '"Helvetica Neue"', "Arial", "sans-serif"],
      },
      letterSpacing: {
        cinema: "0.28em",
      },
      animation: {
        "slow-zoom": "slowZoom 18s ease-out both",
        reveal: "reveal .8s ease-out both",
        pulseLine: "pulseLine 2.4s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
      },
      keyframes: {
        slowZoom: {
          from: { transform: "scale(1.07)" },
          to: { transform: "scale(1)" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseLine: {
          "0%, 100%": { opacity: ".35", transform: "scaleX(.5)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
