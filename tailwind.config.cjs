/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
        label: ['"Fira Code"', "monospace"],
        editorial: ["Manrope", "system-ui", "sans-serif"],
        "editorial-serif": ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "#f6f6f6",
        "on-surface": "#2d2f2f",
        "on-surface-variant": "#5a5c5c",
        primary: { DEFAULT: "#5b5b5b", foreground: "#f3f3f3" },
        secondary: { DEFAULT: "#6b1ef3", foreground: "#f7f0ff" },
        tertiary: { DEFAULT: "#00618f", foreground: "#eaf4ff" },
        "inverse-surface": "#0c0f0f",
        "surface-container": "#e7e8e8",
        "surface-container-low": "#f0f1f1",
        outline: "#757777",
        error: "#b31b25",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
