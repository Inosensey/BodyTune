import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      phone: '280px',
      mdphone: '420px',
      tablet: '481px',
      laptop: '992px',
      desktop: '1280px',
      larger: '1920px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#1A2421',
        lightPrimary: '#2C3A37',
        secondary: '#415a77',
        lightSecondary: '#778da9',
        textGray: '#e0e1dd'
      },
      fontFamily: {
        dmSans: ['var(--font-dm-sans)'],
        quickSand: ['var(--font-quicksand)'],
      },
    },
  },
  plugins: [],
};
export default config;
