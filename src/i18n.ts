import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      airTitle: "Air quality in",
    },
  },
  uk: {
    translation: {
      airTitle: "Якість повітря в",
    },
  },
};

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
