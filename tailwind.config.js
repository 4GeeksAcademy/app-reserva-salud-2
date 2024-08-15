/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './template.html',
    './src/front/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "nord",
      "dark",
      "light"
    ]
  }
}

