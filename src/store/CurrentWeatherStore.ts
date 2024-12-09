// class CurrentWeatherStore {
//   cityName: string = "Тернопіль";
//   currentDate: string = "20 листопада, Середа";
//   currentTime: string = "16:31";
//   currentTemperature: number = 21;
//   feelsLike: number = 19;
//   weatherIcon: string = "icons/1.svg";
//   currentWeatherDescription: string = "Хмарно з проясненнями, невеликий дощ";
//   todayWeatherDescription: string =
//     "Погода у Тернополі обіцяє бути хмарною, але вечірнє небо стане ясним. Залишаємо парасольки вдома. Опадів не передбачається. Варто готуватися до холодів.";

//   constructor() {
//     makeAutoObservable(this);
//   }

//   async fetchWeather(city: string) {
//     try {
//       const apiKey = "ada53a53546a12851a13875d932b485b";
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`);

//       if (!response.ok) {
//         throw new Error("Не вдалося отримати дані погоди");
//       }

//       const data = await response.json();

//       return {
//         currentTemperature: data.main.temp,
//         description: data.weather[0].description,
//         cityName: data.name,
//         country: data.sys.country,
//       };
//     } catch (error) {
//       console.error(error);
//       throw new Error("Помилка при отриманні даних погоди");
//     }
//   }

//   updateWeather(data: Partial<CurrentWeatherStore>) {
//     Object.assign(this, data);
//   }
// }

// async function fetchWeatherData() {
//   const weatherStore = new CurrentWeatherStore();
//   try {
//     const weatherData = await weatherStore.fetchWeather("Kyiv");

//     runInAction(() => {
//       weatherStore.updateWeather({
//         currentTemperature: weatherData.currentTemperature,
//         currentWeatherDescription: weatherData.description,
//         cityName: weatherData.cityName,
//       });
//     });
//     console.log(weatherStore);
//   } catch (error) {
//     console.error("Не вдалося отримати погоду:", error);
//   }
// }

// fetchWeatherData();

// // export default new CurrentWeatherStore();

// const city: string = "Kyiv";

// // Створюємо функцію для отримання погоди
// function getWeather(city: string) {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Присвоюємо значення з об'єкта API в змінні
//       const temperature = data.main.temp; // температура
//       const description = data.weather[0].description; // опис погоди
//       const windSpeed = data.wind.speed; // швидкість вітру
//       const humidity = data.main.humidity; // вологість

//       // Виводимо значення в консоль або використовуємо їх в програмі
//       console.log(`Погода в місті: ${city}`);
//       console.log(`Температура: ${temperature}°C`);
//       console.log(`Опис: ${description}`);
//       console.log(`Швидкість вітру: ${windSpeed} м/с`);
//       console.log(`Вологість: ${humidity}%`);

//       // Ви можете використати ці змінні далі в коді
//       // Наприклад, відобразити їх на веб-сторінці:
//     })
//     .catch((error) => {
//       console.error("Помилка запиту:", error);
//     });
// }

// // Викликаємо функцію для отримання погоди в Києві
// getWeather(city);

import { makeAutoObservable } from "mobx";

class CurrentWeatherStore {
  city: string | null = null;
  date: number | null = null;
  temperature: number | null = null;
  feelsLike: number | null = null;
  description: string = "";
  icon: string | null = null;
  windSpeed: number | null = null;
  humidity: number | null = null;
  loading: boolean = false;
  error: string | null = null;

  weatherIcons: { [key: string]: string } = {
    ясно: "icons/sunny.svg",
    хмарно: "icons/cloudy.svg",
    дощ: "icons/rainy.svg",
    сніг: "icons/snowy.svg",
    туман: "icons/foggy.svg",
    вітряно: "icons/windy.svg",
    "хмарно з проясненнями": "icons/partly_cloudy.svg",
    "невеликий дощ": "icons/light_rain.svg",
    "перемінна хмарність": "icons/variable_cloudy.svg",
  };

  constructor() {
    makeAutoObservable(this);
  }

  async getWeather(city: string) {
    this.loading = true;
    this.error = null;
    try {
      const apiKey: string = "ada53a53546a12851a13875d932b485b";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`);
      const data = await response.json();

      console.log(data);

      this.temperature = data.main.temp;
      this.feelsLike = data.main.feels_like;
      this.description = data.weather[0].description;
      this.windSpeed = data.wind.speed;
      this.humidity = data.main.humidity;
      this.icon = this.weatherIcons[this.description.toLowerCase()] || "icons/default.svg";
    } catch (err) {
      this.error = "Не вдалося отримати дані";
    } finally {
      this.loading = false;
    }
  }
}

export default new CurrentWeatherStore();
