/** @type {import('prettier').Config} */
module.exports = {
  tailwindFunctions: ["twMerge", "createTheme"],
  plugins: ["prettier-plugin-tailwindcss"],
  // tailwindcss
  tailwindAttributes: ["theme"],
};
