import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mga: {
          "primary-dark": "#2E5C8A", // Azul Marino
          "primary": "#6BA3D0", // Azul Secundario
          "light": "#A8D0E8", // Azul Gradiente
          "dark": "#000000", // Negro
          "light-bg": "#F5F5F5", // Gris Neutro
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
