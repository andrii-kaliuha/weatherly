import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",
        background: "var(--color-background)",
        "on-background": "var(--color-on-background)",
        surface: "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
      },
      // gridTemplateColumns: {
      //   "forecast-mobile": "2fr 1fr 1fr 1fr",
      //   "forecast-md": "1fr 1fr 1fr 1fr",
      // },
      // gridTemplateColumns: {
      //   // Мобільна версія: Перша колонка 2fr, далі 32px для іконки, потім 1fr для опису, 40px для maxTemp, 40px для minTemp
      //   // Зверніть увагу: я припустив 5 колонок, оскільки у вас 5 логічних елементів: дата+день, іконка, опис, maxTemp, minTemp.
      //   // Якщо ви згрупували іконку та опис в один div, то це може бути 4 колонки.
      //   // Давайте виходити з 4 колонок, як ви натякали у своєму питанні, тоді іконка та опис будуть в одній колонці.
      //   "forecast-mobile": "2fr minmax(0, 1fr) 40px 40px", // 2fr для дати/дня, 1fr для іконки/опису, 40px для temp, 40px для minTemp
      //   "forecast-md": "1fr minmax(0, 1fr) 40px 40px", // На md breakpoint: 1fr для дати/дня, 1fr для іконки/опису, 40px для temp, 40px для minTemp
      // },
    },
  },
  plugins: [],
};

export default config;
