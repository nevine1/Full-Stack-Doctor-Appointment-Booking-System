/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brandBlue: "#1e40af",
          softRed: "#f87171",
        },
        gridTemplateColumns: {
          'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
        }
      },
    },
    plugins: [],
  };
  