import type { Config } from 'tailwindcss';

export default {
  content: ['index.html', './src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        alata: ['Alata', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        unbounded: ['"Unbounded"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff9f5',
          100: '#fff0e6',
        },
      },
      boxShadow: {
        header: '0 10px 30px -10px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;


