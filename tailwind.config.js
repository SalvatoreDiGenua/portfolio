/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        ink: {
          950: '#07080c',
          900: '#0c0e15',
          850: '#11141e',
          800: '#161a26',
          700: '#1e2333',
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
        glow: '0 0 40px -10px rgba(99, 102, 241, 0.5)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.45)',
        'glow-subtle':
          '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 15px -2px rgba(99, 102, 241, 0.15)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'dot-pattern':
          'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        'hero-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.25), transparent)',
      },
    },
  },
  plugins: [],
};
