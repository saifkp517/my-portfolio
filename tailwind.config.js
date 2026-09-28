/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090b',
        panel: '#111317',
        line: 'rgba(255,255,255,0.09)',
        accent: {
          DEFAULT: '#36CE9E',
          50: '#f0fdf9',
          400: '#2dd4bf',
          500: '#36CE9E',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
      fontFamily: {
        display: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
