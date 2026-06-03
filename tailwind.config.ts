/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        navy: {
          50: '#e8edf5',
          100: '#c5d0e5',
          200: '#9eb0d3',
          300: '#7790c1',
          400: '#5a77b4',
          500: '#3d5ea7',
          600: '#2e4e92',
          700: '#1e3a5f',
          800: '#132640',
          900: '#0a1628',
          950: '#060d1a',
        },
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#f5c842',
          500: '#d4a017',
          600: '#b8860b',
          700: '#9a6f08',
          800: '#7c5806',
          900: '#5e4104',
        },
        // UI Colors
        surface: {
          DEFAULT: '#fafaf8',
          secondary: '#f2f2ef',
          card: '#ffffff',
          dark: '#0f1923',
          'dark-secondary': '#162032',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        accent: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(10, 22, 40, 0.06), 0 1px 3px rgba(10, 22, 40, 0.04)',
        'card-hover': '0 8px 30px rgba(10, 22, 40, 0.12), 0 2px 8px rgba(10, 22, 40, 0.06)',
        'glow-gold': '0 0 30px rgba(245, 200, 66, 0.25)',
        'glow-navy': '0 0 30px rgba(10, 22, 40, 0.4)',
        'nav': '0 1px 0 rgba(10, 22, 40, 0.06), 0 4px 16px rgba(10, 22, 40, 0.04)',
        'dashboard': '0 0 0 1px rgba(10, 22, 40, 0.05), 0 4px 24px rgba(10, 22, 40, 0.08)',
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%)',
        'gradient-gold': 'linear-gradient(135deg, #f5c842 0%, #d4a017 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 60%, #2e4e92 100%)',
        'gradient-surface': 'linear-gradient(180deg, #fafaf8 0%, #f2f2ef 100%)',
        'mesh-navy': 'radial-gradient(at 40% 20%, #1e3a5f 0px, transparent 50%), radial-gradient(at 80% 0%, #2e4e92 0px, transparent 50%), radial-gradient(at 0% 50%, #0a1628 0px, transparent 50%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
};
