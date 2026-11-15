/* ClickChat brand tokens for the Tailwind Play CDN (prototypes only).
   Values come from Brand Guidelines v1.0 + the Brand DNA doc (decisions of 2026-11-12). */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1B3A', 900: '#1B2B48', 800: '#33425E', surface: '#142442', raised: '#202F4A', line: '#334058' },
        mint: { DEFAULT: '#12C99B', 300: '#55DCB1', 600: '#087F62', 700: '#066B51', soft: '#DBF8EC', deep: '#143B2E' },
        violet: { DEFAULT: '#6C5CE7', 300: '#B8B9FF', 700: '#5244B8', soft: '#EEEFFF', deep: '#2E2D55' },
        coral: { DEFAULT: '#FF6A4D', 700: '#953927', soft: '#FFEBE7', deep: '#4D261E' },
        steel: { DEFAULT: '#5B6B82', 300: '#B7C2D2', 500: '#8290A4' },
        mist: '#F5F8FB',
        hair: '#E3E8EF',
        ink: { DEFAULT: '#0D1013', surface: '#15171B', raised: '#1E2124', line: '#303337' },
        wa: '#25D366', ig: '#E4405F', fb: '#0084FF',
      },
      fontFamily: {
        display: ['"Readex Pro"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        ar: ['"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
        en: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '16px', btn: '12px', sheet: '24px' },
      boxShadow: {
        e1: '0 1px 2px rgba(11,27,58,.06)',
        e2: '0 8px 24px -6px rgba(11,27,58,.14)',
        e3: '0 24px 48px -12px rgba(11,27,58,.22)',
      },
      transitionTimingFunction: { brand: 'cubic-bezier(0.2,0,0,1)' },
      maxWidth: { page: '1200px' },
    },
  },
};
