/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          foreground: 'var(--color-on-emerald)',
          soft: 'var(--color-emerald-soft)',
          line: 'var(--color-emerald-line)',
        },
        lime: {
          DEFAULT: 'var(--color-lime)',
          hover: 'var(--color-lime-hover)',
        },
        blue: {
          DEFAULT: 'var(--color-blue)',
          ink: 'var(--color-blue-ink)',
        },
      },
      fontFamily: {
        sans: 'var(--font-body)',
        display: 'var(--font-display)',
      },
    },
  },
};
