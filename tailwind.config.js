/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#15803d',
          700: '#166534',
          800: '#14532d',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          300: '#d9f99d',
          400: '#bef264',
          500: '#a3e635',
          600: '#84cc16',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        ink: {
          950: '#070a08',
          900: '#0a0f0c',
          850: '#101713',
          800: '#151d18',
          700: '#1d2a22',
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'Outfit',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 197, 94, 0.45)',
        'glow-cyan': '0 0 40px -10px rgba(190, 242, 100, 0.38)',
        'glow-subtle':
          '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 15px -2px rgba(34, 197, 94, 0.14)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'dot-pattern':
          'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        'hero-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34, 197, 94, 0.22), transparent)',
      },
    },
  },
  plugins: [],
};
