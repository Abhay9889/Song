/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        void:   '#050508',
        deep:   '#0A0A14',
        card:   '#0F0F1E',
        border: '#1A1A30',
        purple: { DEFAULT: '#7C3AED', light: '#A78BFA', glow: '#6D28D9' },
        cyan:   { DEFAULT: '#00D9FF', dark: '#0891B2' },
        pink:   { DEFAULT: '#FF2D87', dark: '#BE185D' },
        neon:   '#39FF14',
        muted:  '#6B7280',
        ghost:  '#9CA3AF',
      },
      animation: {
        'spin-slow':  'spin 8s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up':   'slide-up 0.6s ease-out',
        'fade-in':    'fade-in 0.8s ease-out',
        'shimmer':    'shimmer 2s infinite',
      },
      keyframes: {
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        'pulse-glow':{ '0%,100%': { boxShadow: '0 0 20px #7C3AED44' }, '50%': { boxShadow: '0 0 60px #7C3AED99' } },
        'slide-up':  { '0%': { opacity: 0, transform: 'translateY(30px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'fade-in':   { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        shimmer:     { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237C3AED' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
