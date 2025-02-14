import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import rootStore from "./store/rootStore";

// Тексти для різних мов
const resources = {
  en: {
    translation: {
      hello: "Hello",
      welcome: "Welcome to our site",
    },
  },
  uk: {
    translation: {
      hello: "Привіт",
      welcome: "Ласкаво просимо на наш сайт",
    },
  },
};

// Отримуємо мову з rootStore.settings.language або встановлюємо 'uk' за замовчуванням
// const language = rootStore.settings.language.toLowerCase() || "uk"; // Наприклад, "Ukrainian" -> "uk"

i18n
  .use(LanguageDetector) // Автоматичне визначення мови
  .use(initReactI18next) // Інтеграція з React
  .init({
    resources,
    lng: "uk", // Мова за замовчуванням з налаштувань
    fallbackLng: "en", // Мова для fallback (якщо обрана мова відсутня)
    interpolation: {
      escapeValue: false, // Не потрібно екранувати значення (React автоматично це робить)
    },
  });

export default i18n;
