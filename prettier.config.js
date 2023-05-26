/** @type {import('prettier').Config} */
module.exports = {
  jsxSingleQuote: true,
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 100,
  semi: true,
  tabWidth: 2,
  tailwindFunctions: [
    "cva",
    "wind",
    "wd",
    // "wdSelect"
  ],
  trailingComma: "all",
};
