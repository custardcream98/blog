interface ICategoryTheme {
  [category : string]:{
    backgroundColor: string
    borderColor : string
  }
}

const categoryTheme:ICategoryTheme = {
  "React.js": { backgroundColor: "#3fc7ed4e", borderColor: "#3fc7ed" },
  TypeScript: { backgroundColor: "#0707ff4e", borderColor: "#0707ff" },
  Python: { backgroundColor: "#ffc9074e", borderColor: "#ffc907" },
  "Coding Test": { backgroundColor: "#ff076e4e", borderColor: "#ff076e" },
  "Next.js": { backgroundColor: "#ffffff4e", borderColor: "white" },
  JavaScript: {backgroundColor: "#ffea074e", borderColor: "#ffea07"}
}

export default categoryTheme;