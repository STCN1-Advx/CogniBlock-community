/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1C68FF',
          600: '#1956cc',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#1C68FF',
          600: '#1956cc',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

