import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: {
            DEFAULT: '#6D381E',
            hover: '#562C16',
            light: '#F5EBE6',
            dark: '#401F0E',
          },
          black: {
            DEFAULT: '#111111',
            dark: '#0A0A0A',
            muted: '#333333',
          },
          cream: {
            DEFAULT: '#FAF8F5',
            light: '#FDFCFB',
            dark: '#F0ECE4',
          },
          accent: {
            green: '#10B981',
            blue: '#3B82F6',
            orange: '#F97316',
            purple: '#8B5CF6',
          }
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px rgba(0, 0, 0, 0.06)',
        elevated: '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        brand: '10px',
      }
    },
  },
  plugins: [],
};

export default config;
