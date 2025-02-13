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
      tablet: '576px',
      mdtablet: '676px',
      laptop: '992px',
      desktop: '1280px',
      larger: '1920px'
    },
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        // primary: '#121212',
        // lightPrimary: '#2C3A37',
        // secondary: '#4B6F64',
        // lightSecondary: '#A8C8C0',
        // textGray: '#e0e1dd'

        primary: "#121212", // Rich Black
        lightPrimary: "#1E1E1E", // Dark Charcoal (Light version for gradient)
        foreground: "#A8D5BA", // Light Mint Green
        secondary: "#4B6F64", // Deep Teal
        lightSecondary: "#D3F0D1", // Light Mint (Light version of secondary text)
        textGray: "#e0e1dd", // Existing gray text color
        ctaBackground: "#3E8E41", // Forest Green (CTA background)
        ctaText: "#FFFFFF", // White (CTA text)
        warningColor: "#dc3545",
        fadedWarningColor: "#e05260",

        // Notifications theme
        newFollower: "#4A9B50",
        comment: "#B07A42",
        achievement: "#B58E1C",
        notificationTextColor: "#e0e1dd"
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
