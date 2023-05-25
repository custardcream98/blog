interface ICategoryTheme {
  [category: string]: {
    color: string;
  };
}

const categoryTheme: ICategoryTheme = {
  CSS: { color: "#1834d4" },
  "Coding Test": { color: "#ff076e" },
  "Express.js": { color: "#2def5b" },
  Firebase: { color: "#dea41f" },
  Git: { color: "#d43e18" },
  HTML: { color: "#b00035" },
  JavaScript: { color: "#ffea07" },
  "Next.js": { color: "#d1d1d1" },
  Python: { color: "#ffc907" },
  "React.js": { color: "#3fc7ed" },
  TypeScript: { color: "#0707ff" },
  etc: { color: "#979797" },
  "styled-components": { color: "#c40ed1" },
};

export default categoryTheme;
