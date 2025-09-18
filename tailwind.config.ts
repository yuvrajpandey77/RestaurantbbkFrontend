import type { Config } from 'tailwindcss';

export default {
  content: ['index.html', './src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        // Remap existing keys to royal serif/display families for a richer look
        alata: ['Cinzel', 'serif'],
        anton: ['"Cormorant Garamond"', 'serif'],
        unbounded: ['"Playfair Display"', 'serif'],
        brandSerif: ['"Cormorant Garamond"', 'serif'],
        brandDisplay: ['Cinzel', 'serif'],
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


