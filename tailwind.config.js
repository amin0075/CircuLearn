const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      ...colors,
      primary: {
        // red: "#e31a1a",
        red: "#f55151",
        purple: "#4218ff",
        blue: "#0077ff",
        green: "#01b573",
        orange: "#ffb547",
      },
      // secondary: {
      //   light: "#344767",
      // },
      black: "#040307",
      white: "#fff",
      backgroundLight: "#FAFAFA",
      backgroundDark: "#1a1f37",
      customGray: "#a0aec0",
      customGrayDark: "#6c737f",
    },
    fontWeight: {},
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      "100%": "100%",
      16: "4rem",
    },
    screens: {
      "2xs": "390px",
      // => @media (min-width: 360px) { ... }

      xs: "475px",
      // => @media (min-width: 475px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        stone: colors.stone,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
      },
      boxShadow: {
        "box-shadow-black-md": "rgb(0 0 0 / 24%) 0px 4px 6px",
      },
      zIndex: {
        60: 60,
        70: 70,
      },
      spacing: {
        unset: "unset",
      },
      backgroundImage: {
        "gr-text-light":
          "linear-gradient(97.89deg, rgb(255, 255, 255) 70.67%, rgba(117, 122, 140, 0) 108.55%)",
        "gr-text-dark":
          "linear-gradient(97.89deg, rgb(0, 0, 0) 70.67%, rgba(117, 122, 140, 0) 108.55%)",
        gr_card_light: "",
        gr_card_dark:
          "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        // "linear-gradient(127.09deg, rgba(24, 29, 60, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        gr_dark:
          "linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.49) 76.65%)",
        gr_darker:
          "linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgb(10, 14, 35) 91.2%)",
        gr_modal:
          "linear-gradient(126.97deg, rgb(5, 21, 63) 28.26%, rgb(7, 37, 97) 91.2%)",
        gradientPurple:
          "linear-gradient(97.89deg, rgb(67, 24, 255), rgb(159, 122, 234))",
        gradientRed:
          "linear-gradient(310deg, rgb(245, 60, 43), rgb(245, 60, 43))",
        gradientBlue:
          "linear-gradient(310deg, rgb(0, 117, 255), rgb(33, 212, 253))",
        gradientGreen:
          "linear-gradient(310deg, rgb(1, 181, 116), rgb(201, 251, 213))",
        gradientOrange:
          "linear-gradient(310deg, rgb(245, 57, 57), rgb(251, 207, 51))",
      },
      fontFamily: {
        PlusJakartaSans: [
          "PlusJakartaSans",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        extraLight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
      },
      fontSize: {
        h1: ["52px", "1.85"],
        h1_md: ["40px", "1.85"],
        h1_sm: ["30px", "1.85"],
        h2: ["36px", "1.3"],
        h2_sm: ["24px", "1.3"],
        h3: ["30px", "1.375"],
        h3_sm: ["22px", "1.375"],
        h4: ["20px", "1.375"],
        base: ["18px", "1.625"],
        body1: ["16px", "1.6"],
        body2: ["14px", "1.5"],
        caption: ["12px", "1.25"],
        caption2: ["10px", "1.625"],
      },
      borderRadius: {
        30: "30px",
        20: "20px",
        10: "10px",
      },
      keyframes: {
        imageTransition: {
          "0%": { backgroundImage: 'url("/images/1-welcome-bg.png")' },
          "50%": { backgroundImage: 'url("/images/2-welcome-bg.png")' },
          "100%": { backgroundImage: 'url("/images/1-welcome-bg.png")' },
        },
        svgTransition: {
          to: {
            strokeDashoffset: 0,
          },
        },
        // getTotalLength()
      },
      animation: {
        "welcome-bg-animation": "imageTransition 1s ease-in-out infinite",
        "svg-animate": "svgTransition 2s ease",
      },
    },
  },
  variants: {
    backgroundImage: ["dark"],
    float: ["responsive", "direction"],
    margin: ["responsive", "direction"],
    padding: ["responsive", "direction"],
    textAlign: ["responsive", "direction"],
  },
  plugins: [require("flowbite/plugin"), require("tailwindcss-dir")()],
};
