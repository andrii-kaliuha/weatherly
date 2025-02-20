import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      current_weather_forecast: "Forecast for the next hour",
      weather: "Weather in",

      start_screen_title: "Looking for a weather forecast? Enter the name of the city in the search field.",
      start_screen_subtitle: "or let us determine your geolocation to get an accurate forecast for your region.",

      loading: "Loading...",

      error_screen_title: "An error occurred!",

      current_location: "Current Location",
      search_city: "Search city...",

      sun_and_moon: "Sun and Moon",
      sunrise: "Sunrise",
      sunset: "Sunset",
      moonrise: "Moonrise",
      moonset: "Moonset",
      moon_phase: "Moon phase",
      duration_day: "Day duration",

      air_quality_title: "Air quality in",

      good_air_title: "good air",
      satisfactory_air_title: "satisfactory air",
      harmful_air_title: "harmful to sensitive groups",
      unhealthy_air_title: "unhealthy air",
      bad_air_title: "bad air",

      good_air_description:
        "The air is clean and the level of pollution is minimal or does not pose any health risk. It is safe for most people.",
      satisfactory_air_description:
        "Air quality is generally acceptable for most people, but some pollutants may pose a moderate health risk to a very small number of people who are extremely sensitive to air pollution.",
      unhealthy_air_description:
        "Pollution has reached a high level, it is dangerous for people with increased sensitivity. If you experience difficulty breathing or throat irritation, reduce your time outdoors.",
      harmful_air_description:
        "People with increased sensitivity may feel unwell. With prolonged exposure to the outdoors, healthy people may experience difficulty breathing or throat irritation. Limit prolonged outdoor exposure.",
      bad_air_description:
        "Everyone may begin to feel the effects on their health, members of sensitive groups may feel more serious effects. Increased likelihood of heart and lung function deterioration. Limit outdoor exposure.",
      weekly_weather_forecast: "Weekly weather forecast",
    },
  },
  uk: {
    translation: {
      current_weather_forecast: "Прогноз на найближчу годину",
      weather: "Погода в",

      start_screen_title: "Шукаєте прогноз погоди? Введіть назву міста в поле пошуку",
      start_screen_subtitle: "або дозвольте визначити вашу геолокацію, щоб отримати точний прогноз для вашого регіону",

      loading: "Завантаження...",

      error_screen_title: "Сталася помилка!",

      current_location: "Місцезнаходження",
      search_city: "Пошук міста...",

      sun_and_moon: "Сонце та Місяць",
      sunrise: "Схід",
      sunset: "Захід",
      moonrise: "Схід",
      moonset: "Захід",
      moon_phase: "Фаза Місяця",
      duration_day: "Тривалість дня",

      air_quality_title: "Якість повітря в",
      good_air_title: "Хороше повітря",
      satisfactory_air_title: "Задовільне повітря",
      harmful_air_title: "Шкідливо для чутливих груп",
      unhealthy_air_title: "Нездорове повітря",
      bad_air_title: "Погане повітря",

      good_air_description:
        "Повітря чисте, а рівень забруднення є мінімальним або не становить жодної загрози для здоров'я. Це безпечно для більшості людей.",
      satisfactory_air_description:
        "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
      unhealthy_air_description:
        "Забруднення повітря досягло високого рівня, воно є небезпечним для людей з підвищеною чутливістю. Якщо ви відчуєте утруднене дихання або подразнення горла, скоротите час перебування на вулиці.",
      harmful_air_description:
        "Люди з підвищеною чутливістю можуть відчувати себе погано. При тривалому знаходженні на вулиці здорові люди можуть відчути утруднене дихання або подразнення горла. Обмежте тривале перебування на вулиці.",
      bad_air_description:
        "Кожен може почати відчувати наслідки для здоров'я, члени чутливих груп можуть відчувати більш серйозні наслідки. Підвищена ймовірність погіршення роботи серця і легенів. Слід обмежити перебування на свіжому повітрі.",
      weekly_weather_forecast: "Прогноз погоди на тиждень",
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
