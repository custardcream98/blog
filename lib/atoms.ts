import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default:true
})

export const gradientTextColorSelector = selector({
  key: 'gradientTextColor',
  get: ({ get }) => {
    const isDark = get(isDarkAtom);
    return isDark
    ? "linear-gradient(90deg, rgb(255, 255, 255), rgb(255, 255, 255))"
    : "linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0))";
  }
})