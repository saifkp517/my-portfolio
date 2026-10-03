/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090b',
        panel: '#111317',
        line: 'rgba(255,255,255,0.09)',
        accent: {
          DEFAULT: '#E4E4E7',
          50: '#fafafa',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#E4E4E7',
          600: '#52525b',
          700: '#3f3f46',
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
