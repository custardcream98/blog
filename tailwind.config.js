// const wdSelectTransform = (code) => {
//   console.log("컴파일");

//   const variantGroupsRegex = /wdSelect\(['"`]([^)'"`]{1,})['"`]\).style`([^`]*)`/g;
//   const variantGroupMatches = [...code.matchAll(variantGroupsRegex)];

//   // const selectorRegex = //g

//   variantGroupMatches.forEach(([matchStr, selector, classes]) => {
//     const parsedClasses = classes
//       .split(/[\s\n]/)
//       .filter((token) => !!token && token !== "\n" && token !== "\r" && token !== "\r\n")
//       .map((cls) => `${selector}:${cls}`)
//       .join(" ");

//     code = code.replace(matchStr, parsedClasses);
//     console.log("selector", selector);
//     console.log("parsedClasses", parsedClasses);
//   });

//   return code;
// };

const GROUP_SELECTOR_REGEX = /([^\s:-]*[:-])\(([^)]{1,})\)/g;
const groupSelectorTransformer = (code) => {
  const variantGroupMatches = [...code.matchAll(GROUP_SELECTOR_REGEX)];

  variantGroupMatches.forEach(([matchStr, selector, classes]) => {
    const parsedClasses = classes
      .split(/[\s\n]/)
      .filter((token) => !!token && token !== "\n" && token !== "\r" && token !== "\r\n")
      .map((cls) => `${selector}${cls}`)
      .join(" ");

    code = code.replace(matchStr, parsedClasses);
  });

  return code;
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    transform: {
      tsx: (code) => {
        code = groupSelectorTransformer(code);
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
      keyframes: {
        "bg-gradient": {
          "100%": {
            "background-position": "200% center",
          },
        },
      },
      maxWidth: {
        800: "50rem",
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
      mobile: {
        max: "800px",
      },
      pc: "800px",
    },
  },
};
