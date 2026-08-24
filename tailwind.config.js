/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand system: Emerald is the identity, Lime is the highlight.
        brand: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        accent: {
          300: '#d9f99d',
          400: '#bef264',
          500: '#a3e635',
          600: '#84cc16',
        },
        ink: {
          950: '#070a08',
          900: '#0a0f0c',
          850: '#101713',
          800: '#151d18',
          700: '#1d2a22',
        },
        content: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
          disabled: '#64748b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 40px -10px rgba(16, 185, 129, 0.42)',
        'glow-accent': '0 0 40px -10px rgba(190, 242, 100, 0.30)',
        'glow-subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 15px -2px rgba(16, 185, 129, 0.12)',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.20), transparent)',
      },
    },
  },
  plugins: [],
};
