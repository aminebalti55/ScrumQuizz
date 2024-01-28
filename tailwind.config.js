module.exports = {
  purge: [
    './src/**/*.svelte',
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('daisyui'),
  ],
};
