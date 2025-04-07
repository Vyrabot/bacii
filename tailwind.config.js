export default {
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
      },
      fontFamily: {
        JetBrainsMono: ["JetBrains Mono", "sans-serif"],
        khmer: ["Koh Santepheap", "sans-serif"],
      },
    },
  },
  plugins: [],
};
