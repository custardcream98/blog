/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      colors: {
        accent: {
          dark: "#3b96ff",
          light: "#0070f3",
        },
        bg: {
          dark: "#121212",
          light: "#fcfcfc",
        },
        darkmodeShadow: {
          dark: "rgba(220, 205, 205, 0.25) 0px 2px 5px -1px, rgba(255, 255, 255, 0.3) 0px 1px 3px -1px",
          light: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
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
          shadow: {
            line: {
              dark: "rgba(200, 200, 200, 0.25) 0px 1px 0px",
              light: "rgba(17, 17, 26, 0.1) 0px 1px 0px",
            },
          },
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
    screens: {
      mobile: "780px",
    },
  },
};
