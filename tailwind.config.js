const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      amber: colors.amber,
      blue: colors.blue,
      bluegray: colors.blueGray,
      coolgray: colors.coolGray,
      cyan: colors.cyan,
      emerald: colors.emerald,
      fuchsia: colors.fuchsia,
      gray: colors.gray,
      green: colors.green,
      indigo: colors.indigo,
      lime: colors.lime,
      orange: colors.orange,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      rose: colors.rose,
      sky: colors.sky,
      teal: colors.teal,
      truegray: colors.trueGray,
      violet: colors.violet,
      warmgray: colors.warmGray,
      yellow: colors.yellow,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
