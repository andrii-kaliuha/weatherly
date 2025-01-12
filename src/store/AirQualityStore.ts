import { makeAutoObservable } from "mobx";
import WeatherStore from "./WeatherStore";

class AirQualityStore {
  city: string | null = null;
  aqi: number | null = null;
  color: string | null = null;
  airStatusTitle: string | null = null;
  airStatusDescription: string | null = null;
  airPollutants: { label: string; value: number; iconClassName: string }[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAirQuality(data: any) {
    this.city = WeatherStore.city;
    this.aqi = data.list[0].main.aqi;

    const airQualityData = [
      {
        id: 1,
        color: "#a2d043",
        airStatusTitle: "Хороше повітря",
        airStatusDescription:
          "Повітря чисте, а забруднення становить невеликий ризик або взагалі не становить жодного ризику. Прийнятно для більшості людей.",
      },
      {
        id: 2,
        color: "#f8cc4a",
        airStatusTitle: "Задовільне повітря",
        airStatusDescription:
          "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
      },
      {
        id: 3,
        color: "#f19342",
        airStatusTitle: "Шкідливо для чутливих груп",
        airStatusDescription:
          "Забруднення повітря досягло високого рівня, воно є небезпечним для людей з підвищеною чутливістю. Якщо ви відчуєте утруднене дихання або подразнення горла, скоротите час перебування на вулиці.",
      },
      {
        id: 4,
        color: "#d85f38",
        airStatusTitle: "Нездорове повітря",
        airStatusDescription:
          "Люди з підвищеною чутливістю можуть відчувати себе погано. При тривалому знаходженні на вулиці здорові люди можуть відчути утруднене дихання або подразнення горла. Обмежте тривале перебування на вулиці.",
      },
      {
        id: 5,
        color: "#903c70",
        airStatusTitle: "Погане повітря",
        airStatusDescription:
          "Кожен може почати відчувати наслідки для здоров'я, члени чутливих груп можуть відчувати більш серйозні наслідки. Підвищена ймовірність погіршення роботи серця і легенів. Слід обмежити перебування на свіжому повітрі.",
      },
    ];

    const currentAirQuality = airQualityData.find((item) => item.id === this.aqi) || airQualityData[4];

    this.color = currentAirQuality.color;
    this.airStatusTitle = currentAirQuality.airStatusTitle;
    this.airStatusDescription = currentAirQuality.airStatusDescription;

    this.airPollutants = [
      {
        label: "PM 2.5",
        value: data.list[0].components.pm2_5,
        iconClassName: "icon-particles-simetrik",
      },
      {
        label: "PM 10",
        value: data.list[0].components.pm10,
        iconClassName: "icon-particles",
      },
      {
        label: "SO2",
        value: data.list[0].components.so2,
        iconClassName: "icon-SO2",
      },
      {
        label: "NO2",
        value: data.list[0].components.no2,
        iconClassName: "icon-NO2",
      },
    ];
  }

  async getAirQuality(lat: number, lon: number) {
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const AQIResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const AQI = await AQIResponse.json();
      this.updateAirQuality(AQI);
    } catch (error: any) {
      console.log(error.message || "Error when receiving air quality data");
    }
  }
}

export default new AirQualityStore();
