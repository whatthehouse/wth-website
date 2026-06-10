/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#2E7D32',
          'green-light': '#4CAF50',
          'green-pale': '#E8F5E9',
          navy:   '#1A2E44',
          'navy-light': '#243B55',
          gray:   '#4A5568',
          'gray-light': '#718096',
          'gray-pale': '#F7F8FA',
        },
      },
      fontFamily: {
        th: ['Prompt', 'sans-serif'],
        en: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
        screens: { xl: '1200px' },
      },
    },
  },
  plugins: [],
}
