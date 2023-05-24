interface ICategoryTheme {
  [category: string]: {
    color: string;
  };
}

const categoryTheme: ICategoryTheme = {
  etc: { color: "#979797" },
  "React.js": { color: "#3fc7ed" },
  TypeScript: { color: "#0707ff" },
  Python: { color: "#ffc907" },
  "Coding Test": { color: "#ff076e" },
  "Next.js": { color: "#d1d1d1" },
  JavaScript: { color: "#ffea07" },
  Firebase: { color: "#dea41f" },
  "styled-components": { color: "#c40ed1" },
  "Express.js": { color: "#2def5b" },
  HTML: { color: "#b00035" },
  CSS: { color: "#1834d4" },
  Git: { color: "#d43e18" },
};

export default categoryTheme;
