/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('/images/pattern.svg')",
      },
      backgroundSize: {
        '125': '125%',
        '200': '200%'
      },
      backgroundPosition: {
        'center-center': 'center center',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT: '0px 4px 20px 0px rgba(74, 58, 255, 0.28)',
        'custom': '0px 10px 20px 0px rgba(4, 16, 34, 0.06), 0px 10px 20px 0px rgba(7, 33, 102, 0.12)',
        'images': '0px 4px 16px 0px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        accent: '#F4F4F5',
        'purple': {
          100: '#ECEBFF',
          200: '#B6B0FF',
          300: '#5C4DFF',
          400: '#4A3AFF',
          500: '#3328B2',
          600: '#1D1766',
          700: '#0A0B0E',
          DEFAULT: '#4A3AFF'
        },
        'black': {
          100: '#EFF1F4',
          200: '#C1C7D4',
          300: '#939DB4',
          400: '#667394',
          500: '#475067',
          600: '#282E3B',
          700: '#1f1f1f',
          DEFAULT: '#0D0A2C'
        }
      },
      animation: {
        customPulse: 'customPulse 1.5s ease-in-out infinite',
        customWave: 'customWave 1.5s ease-in-out infinite'
      },
      keyframes: {
        customPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        customWave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
      },
    }
  },
  plugins: [],
};
