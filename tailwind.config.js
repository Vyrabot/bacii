export default {
  darkMode: "class",
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    screens: {
      sm: "300px",
      md: "760px",
      lg: "990px",
      xl: "1280px",
    },
    extend: {
      colors: {
        Primery: "#a3cef1",
        bg: "#e7ecef",
        bg2: "#6096ba",
        overlay: "rgba(0,0,0,0.5)",
        normalText: "#8b8c89",
        accent: {
          DEFAULT: "#274c77",
          hover: "#00e187",
        },
        servicesBg: "#131317e7",
        success: "#28a745",
        "dark-primary": "#1a1a2e",
        "dark-secondary": "#16213e",
        "dark-bg": "#0f3460",
        "dark-accent": "#e94560",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        english: ["Outfit", "sans-serif"],
        khmer: ["Kantumruy Pro", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        slideDown: "slideDown 0.3s ease-in-out",
        slideUp: "slideUp 0.3s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
        scaleIn: "scaleIn 0.4s ease-in-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        slideDown: {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        scaleIn: {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
