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
  "Next.js": { backgroundColor: "#d1d1d14e", borderColor: "#d1d1d1" },
  JavaScript: { backgroundColor: "#ffea074e", borderColor: "#ffea07" },
  Firebase: {backgroundColor:"#dea41f4e", borderColor:"#dea41f"}
}

export default categoryTheme;