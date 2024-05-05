const categoryTheme = {
  CSS: "border-[#1834d4] text-[#1834d4] bg-[#1834d44e]",
  "Coding Test": "border-[#ff076e] text-[#ff076e] bg-[#ff076e4e]",
  "Express.js": "border-[#2def5b] text-[#2def5b] bg-[#2def5b4e]",
  Firebase: "border-[#dea41f] text-[#dea41f] bg-[#dea41f4e]",
  Git: "border-[#d43e18] text-[#d43e18] bg-[#d43e184e]",
  HTML: "border-[#b00035] text-[#b00035] bg-[#b000354e]",
  JavaScript: "border-[#ffea07] text-[#ffea07] bg-[#ffea074e]",
  "Next.js": "border-[#d1d1d1] text-[#d1d1d1] bg-[#d1d1d14e]",
  Python: "border-[#ffc907] text-[#ffc907] bg-[#ffc9074e]",
  "React.js": "border-[#3fc7ed] text-[#3fc7ed] bg-[#3fc7ed4e]",
  TypeScript: "border-[#0707ff] text-[#0707ff] bg-[#0707ff4e]",
  etc: "border-[#979797] text-[#979797] bg-[#9797974e]",
  "styled-components": "border-[#c40ed1] text-[#c40ed1] bg-[#c40ed14e]",
  thoughts:
    "border-[#1c1c1c] text-[#1c1c1c] bg-[#9797970d] dark:border-[#e8e8e8] dark:text-[#e8e8e8]",
}

export type Categoires = keyof typeof categoryTheme

export default categoryTheme
