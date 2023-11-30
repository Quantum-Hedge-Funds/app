import type { Config } from "tailwindcss";

import * as constants from "./src/styles/constants";

export const colors = {
  "primary-50": "#fef5fc",
  "primary-100": "#fee9fc",
  "primary-200": "#fbd3f6",
  "primary-300": "#f7b0eb",
  "primary-400": "#f181db",
  "primary-500": "#e451c7",
  "primary-600": "#c831a7",
  "primary-700": "#a62588",
  "primary-800": "#87216d",
  "primary-900": "#6f2059",
  "primary-950": "#490937",

  "secondary-50": "#f2effe",
  "secondary-100": "#e9e2fd",
  "secondary-200": "#d7cbfa",
  "secondary-300": "#c1acf5",
  "secondary-400": "#b08bee",
  "secondary-500": "#a36ee6",
  "secondary-600": "#9853d8",
  "secondary-700": "#8644be",
  "secondary-800": "#6c399a",
  "secondary-900": "#57357a",
  "secondary-950": "#42275a",

  light: "#f7f7f8",
  dark: "#050505",

  "base-200": "#2d2d2d",
  "base-300": "#1c1b20",
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
        topbar: constants.TOPBAR_HEIGHT,
      },
      margin: {
        sidebar: constants.SIDEBAR_WIDTH,
        topbar: constants.TOPBAR_HEIGHT,
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
