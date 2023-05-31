// eslint-disable-next-line @typescript-eslint/no-var-requires
const { transformGroupSelector } = require("utility-class-components");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    transform: {
      ts: (code) => {
        code = transformGroupSelector(code);
        return code;
      },
      tsx: (code) => {
        code = transformGroupSelector(code);
        return code;
      },
    },
  },
  darkMode: "class",
  plugins: [],
  theme: {
    backgroundImage: {
      intro:
        "linear-gradient( -225deg, #3c2395 0%, #44107a 17%, #ff1361 33%, #fff800 50%, #ff1361 66%, #44107a 83%, #3c2395 100%)",
    },
    extend: {
      animation: {
        "bg-gradient": "bg-gradient 3s linear infinite",
        shake: "shake 0.2s",
        "shake-reverse": "shake 0.2s reverse",
        show: "show 0.2s ease",
      },
      boxShadow: {
        "default-dark":
          "rgba(220, 205, 205, 0.25) 0px 2px 5px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px",
        "default-light":
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",

        "line-dark": "rgba(200, 200, 200, 0.25)",
        "line-light": "rgba(17, 17, 26, 0.1)",
      },
      colors: {
        accent: {
          dark: "#3b96ff",
          light: "#0070f3",
        },
        bg: {
          dark: "#121212",
          light: "#fcfcfc",
        },
        default: {
          dark: "#efefef",
          light: "#121212",
          sub: {
            dark: "rgb(177, 177, 177)",
            light: "rgb(140, 140, 140)",
          },
        },
        nav: {
          bg: { dark: "#6a6a6a14", light: "#e7e7e767" },
        },
        post: {
          element: {
            bg: {
              dark: "#1e1e1e",
              light: "rgb(240, 240, 240)",
            },
          },
        },
        resume: {
          accent: { dark: "#ffea00", light: "#ffbb00" },
          badge: {
            bg: { dark: "#ffffff22", light: "#eee" },
            text: { dark: "#ffffff99", light: "#666" },
          },
          text: {
            dark: "#ccc",
            dim: {
              dark: "#858585",
              light: "#aaa",
            },
            light: "#616161",
            strong: {
              dark: "#fff",
              light: "#333",
            },
          },
        },
      },
      keyframes: {
        "bg-gradient": {
          "100%": {
            "background-position": "200% center",
          },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(-10%)",
          },
          "75%": {
            transform: "translateX(10%)",
          },
        },
        show: {
          "0%": {
            opacity: 0,
            transform: "translateX(50%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      },
      maxWidth: {
        800: "50rem",
      },
      spacing: {
        nav: "3.125rem",
      },
    },
    fontFamily: {
      mono: ["Source Code Pro", "monospace"],
      sans: [
        "Noto Sans",
        "Noto Sans KR",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Apple Color Emoji",
        "Segoe UI Emoji",
      ],
      serif: ["Nanum Myeongjo", "serif"],
      title: ["Poppins", "sans-serif"],
    },
    lineHeight: {
      1.2: "1.2",
    },
    screens: {
      ad: {
        max: "500px",
      },
      mobile: {
        max: "800px",
      },
      pc: "800px",
    },
  },
};