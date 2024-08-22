module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      sans: ['var(--font-noto-sans-kr)', 'var(--font-pretendard)', 'sans-serif'],
      pretendard: ['var(--font-pretendard)', 'sans-serif'],
    },
  },
  plugins: [],
};
