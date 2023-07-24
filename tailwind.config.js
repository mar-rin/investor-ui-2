/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {colors: {
        // Add your custom color here
        'steel-blue': '#E8F0F8',
        'off-white': '#FAFAFA',
        'charcoal-gray': '#333333',
        'gold-tint': '#FFF1D0',
      },
    },
  },
  plugins: [],
}

