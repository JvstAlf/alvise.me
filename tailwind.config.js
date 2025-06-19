/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,svelte,js,ts}",// Adjust paths to your source files
  ],
  theme: {
    extend: {
      height: {
        'screen-dvh': '100dvh !important',
      },
    },
  },
  plugins: [],
}
