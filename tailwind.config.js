/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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
        // Small harmonious palette for tinting generic (non-brand) icons —
        // same hex values are mirrored in src/data/iconColors.js, since
        // runtime color math (rgba tints, the Dither canvas) needs the raw
        // hex and can't read this config at runtime.
        meta: {
          sky: '#38BDF8',
          violet: '#A78BFA',
          rose: '#FB7185',
          amber: '#FBBF24',
          indigo: '#818CF8',
        },
      },
      // Type system: font-mono (JetBrains Mono) for headings, labels, meta,
      // captions and all UI chrome/buttons; font-body (Inter) for paragraph
      // copy only. Don't mix the two inside the same role.
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
