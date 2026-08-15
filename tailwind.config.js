/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep industrial navy
        navy: {
          950: '#060b16',
          900: '#0a1222',
          800: '#0f1c33',
          700: '#152743',
          600: '#1d3358',
          500: '#274573',
        },
        // Charcoal / graphite
        graphite: {
          950: '#0b0d10',
          900: '#14171c',
          800: '#1c2129',
          700: '#272e39',
          600: '#3a434f',
        },
        // Steel gray
        steel: {
          500: '#8a97a8',
          400: '#a7b3c2',
          300: '#c3ccd8',
          200: '#dde3ea',
          100: '#eef1f5',
        },
        // Copper / industrial orange accent (brand #F15A16)
        copper: {
          700: '#b8410f',
          600: '#d64d12',
          500: '#f15a16',
          400: '#ff6f30',
          300: '#ff8c54',
        },
        // Light-theme semantic tokens
        ink: '#152231', // primary text / headings on light surfaces
        mute: '#4f5d6b', // secondary / body text (AA on paper & white)
        line: '#e2e6ea', // subtle borders on light surfaces
        paper: '#f5f6f7', // primary page background
        panel: '#ffffff', // card / secondary background
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        card: '0 12px 32px -16px rgba(21,34,49,0.14)',
        'card-hover': '0 20px 44px -20px rgba(21,34,49,0.22)',
        glow: '0 10px 26px -12px rgba(241,90,22,0.45)',
      },
      backgroundImage: {
        'grid-steel':
          'linear-gradient(rgba(21,34,49,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(21,34,49,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-pan': {
          '0%': { transform: 'scale(1.08) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.16) translate3d(-2%, -2%, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'slow-pan': 'slow-pan 24s ease-in-out infinite alternate',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
