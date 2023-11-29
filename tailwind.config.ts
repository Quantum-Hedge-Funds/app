import type { Config } from "tailwindcss";

import * as constants from "./src/styles/constants";

const colors = {
  "primary-50": "#f2effe",
  "primary-100": "#e9e2fd",
  "primary-200": "#d7cbfa",
  "primary-300": "#c1acf5",
  "primary-400": "#b08bee",
  "primary-500": "#a36ee6",
  "primary-600": "#9853d8",
  "primary-700": "#8644be",
  "primary-800": "#6c399a",
  "primary-900": "#57357a",
  "primary-950": "#42275a",

  "secondary-50": "#fef5fc",
  "secondary-100": "#fee9fc",
  "secondary-200": "#fbd3f6",
  "secondary-300": "#f7b0eb",
  "secondary-400": "#f181db",
  "secondary-500": "#e451c7",
  "secondary-600": "#c831a7",
  "secondary-700": "#a62588",
  "secondary-800": "#87216d",
  "secondary-900": "#6f2059",
  "secondary-950": "#490937",

  light: "#f7f7f8",
  dark: "#050505",

  // Accent colors for buttons, icons, etc.
  accent: {
    lighter: "#0F3460", // Vivid blue for important components (lighter)
    darker: "#1B1B2F", // Darker shade for less emphasis (darker)
    vivid: "#E94560", // A vivid pink/red for important action items and highlights
  },

  "base-200": "#2d2d2d",
  "base-300": "#1c1b20",

  // Neutral shades for text, borders, etc.
  neutral: {
    100: "#E7E7E9", // Very light grey for primary text
    200: "#B1B1B3", // Light grey for secondary text
    300: "#5C5C6D", // Medium grey for tertiary text or less important information
    400: "#1d1c21", // Dark grey for borders or subtle outlines
  },

  // Semantic colors for alerts, status, etc.
  info: "#3ABFF8", // Bright blue for informational messages
  success: "#23C4ED", // Greenish-blue for success states
  warning: "#FFCA3A", // Yellow for warnings
  error: "#FF595E", // Red for errors

  // Crypto-specific hues
  crypto: {
    gold: "#FFD700", // Gold for wealth and prosperity associated with cryptocurrencies
    silver: "#C0C0C0", // Silver for a modern, sleek look
    bronze: "#CD7F32", // Bronze for a traditional touch, perhaps for loyalty or long-term customers
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,

      width: {
        sidebar: constants.SIDEBAR_WIDTH,
      },
      padding: {
        sidebar: constants.SIDEBAR_WIDTH,
      },
      margin: {
        sidebar: constants.SIDEBAR_WIDTH,
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,.03), 0 20px 70px rgba(0,0,0,.06), 0 2px 4px rgba(0,0,0,.02)",
      },
      borderRadius: {
        card: "1.625rem",
      },
      backgroundImage: (theme) => ({
        // "gradient-sidebar":
        //   "linear-gradient(to bottom, #5c1e4f 0%, #22121f 100%)",
        // "gradient-app":
        //   "linear-gradient( 190deg, #401033 11.2%, #120a12 100% )",

        "grandient-main":
          "linear-gradient(rgba(98, 126, 234, 0.08) 0%, rgb(247, 247, 248) 300px, rgb(247, 247, 248) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }),
    },
  },
  plugins: [],
};

export default config;
