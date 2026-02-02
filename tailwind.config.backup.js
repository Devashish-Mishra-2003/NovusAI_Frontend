/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // use this className="font-heading" for hero headings
        heading: ["'Playfair Display'", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        novusLight: {
          "primary": "#4F46E5",
          "primary-content": "#ffffff",

          "secondary": "#06B6D4",
          "secondary-content": "#02151a",

          "accent": "#22C55E",
          "accent-content": "#02130a",

          "neutral": "#111827",
          "neutral-content": "#E5E7EB",

          "base-100": "#ffffff",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          "base-content": "#111827",

          "info": "#0EA5E9",
          "success": "#22C55E",
          "warning": "#F97316",
          "error": "#EF4444",
        },
      },
      {
        novusDark: {
          "primary": "#6366F1",
          "primary-content": "#0B1020",

          "secondary": "#06B6D4",
          "secondary-content": "#02151a",

          "accent": "#22C55E",
          "accent-content": "#02130a",

          "neutral": "#020617",
          "neutral-content": "#CBD5F5",

          "base-100": "#020617",
          "base-200": "#020617",
          "base-300": "#020617",
          "base-content": "#E5E7EB",

          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#FB923C",
          "error": "#FCA5A5",
        },
      },
    ],
    darkTheme: "novusDark",
  },
};
