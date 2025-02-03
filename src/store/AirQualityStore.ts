import { makeAutoObservable } from "mobx";
import ErrorStore from "./ErrorStore";

class AirQualityStore {
  cityName: string | null = null;
  aqi: number | null = null;
  color: string | null = null;
  title: string | null = null;
  description: string | null = null;
  airPollutants: { label: string; value: number; icon: string }[] = [];
  airQualityLevels = [
    {
      id: 1,
      range: "AQI 0-50",
      color: "#a2d043",
      title: "Хороше повітря",
      description:
        "Повітря чисте, а рівень забруднення є мінімальним або не становить жодної загрози для здоров'я. Це безпечно для більшості людей.",
    },
    {
      id: 2,
      range: "AQI 51-100",
      color: "#f8cc4a",
      title: "Задовільне повітря",
      description:
        "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
    },
    {
      id: 3,
      range: "AQI 101-150",
      color: "#f19342",
      title: "Шкідливо для чутливих груп",
      description:
        "Забруднення повітря досягло високого рівня, воно є небезпечним для людей з підвищеною чутливістю. Якщо ви відчуєте утруднене дихання або подразнення горла, скоротите час перебування на вулиці.",
    },
    {
      id: 4,
      range: "AQI 151-200",
      color: "#d85f38",
      title: "Нездорове повітря",
      description:
        "Люди з підвищеною чутливістю можуть відчувати себе погано. При тривалому знаходженні на вулиці здорові люди можуть відчути утруднене дихання або подразнення горла. Обмежте тривале перебування на вулиці.",
    },
    {
      id: 5,
      range: "AQI 201-300",
      color: "#903c70",
      title: "Погане повітря",
      description:
        "Кожен може почати відчувати наслідки для здоров'я, члени чутливих груп можуть відчувати більш серйозні наслідки. Підвищена ймовірність погіршення роботи серця і легенів. Слід обмежити перебування на свіжому повітрі.",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setCity(cityName: string) {
    this.cityName = cityName;
  }

  updateAirQuality(data: any) {
    this.aqi = data.list[0].main.aqi;
    const currentAirQuality = this.airQualityLevels.find((item) => item.id === this.aqi) || this.airQualityLevels[4];
    this.color = currentAirQuality.color;
    this.title = currentAirQuality.title;
    this.description = currentAirQuality.description;
    this.airPollutants = [
      {
        label: "PM 2.5",
        value: Math.round(data.list[0].components.pm2_5),
        icon: "pm2_5",
      },
      {
        label: "PM 10",
        value: Math.round(data.list[0].components.pm10),
        icon: "pm10",
      },
      {
        label: "SO2",
        value: Math.round(data.list[0].components.so2),
        icon: "so2",
      },
      {
        label: "NO2",
        value: Math.round(data.list[0].components.no2),
        icon: "no2",
      },
    ];
  }

  async getAirQuality(lat: number, lon: number) {
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const AQI = await response.json();
      this.updateAirQuality(AQI);
    } catch (error: any) {
      ErrorStore.addError(error.message || "Помилка при отриманні даних якості повітря. Спробуйте пізніше.");
    }
  }
}

export default new AirQualityStore();
