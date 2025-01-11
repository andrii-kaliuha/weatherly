import { makeAutoObservable } from "mobx";

class AirQualityStore {
  city: string | null = null;
  color: string | null = null;
  aqi: number | null = null;
  airPollutants: string[] | null = null;
  airStatusTitle: string | null = null;
  airStatusDescription: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAirQuality(data: any) {
    // this.city = data.city;
    // this.color = data.color;
    this.aqi = data.list[0].main.aqi;
    this.airPollutants = data.details;
    this.airStatusTitle = data.airStatusTitle;
    this.airStatusDescription = data.airStatusDescription;
  }

  async getAirQuality(lat: number, lon: number) {
    try {
      const API_KEY = "ada53a53546a12851a13875d932b485b";
      const AQIResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const AQI = await AQIResponse.json();
      console.log(AQI);
    } catch (error: any) {
      console.log(error.message || "Error when receiving data");
    }
  }
}

export default new AirQualityStore();
