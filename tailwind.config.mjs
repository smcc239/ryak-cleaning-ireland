/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#EE3124',
          dark: '#C61E12',
          tint: '#FDEBE9',
        },
        ink: {
          DEFAULT: '#14151A',
          soft: '#23252D',
        },
        stone: '#F4F5F7',
        line: '#E4E6EA',
        grey: '#5B616E',
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Poppins', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        body: ['Poppins', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
};
