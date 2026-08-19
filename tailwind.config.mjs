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
        /** Matches Ryak logo wordmark (Archivo Black) */
        display: ['Archivo', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        /** Matches Ryak tagline / body copy in brand lockup */
        body: ['Inter', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        brand: '-0.03em',
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
