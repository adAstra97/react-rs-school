export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainBackground: 'var(--main-background)',
        detailsBackground: 'var(--details-background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        button: 'var(--button)',
        contrast: 'var(--contrast)',
        cardOverlay: 'var(--card-overlay)',
      },
    },
  },
};
