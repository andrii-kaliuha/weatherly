import SharedWeatherStore from "./store/SharedWeatherStore";

const API_KEY = "ada53a53546a12851a13875d932b485b";

async function getCity(cityName: string) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  try {
    SharedWeatherStore.setLoading(true);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log("Координати міста:", lat, lon);
      console.log("Місто:", data[0].name);

      await getWeather(lat, lon);
    } else {
      console.log("Місто не знайдено");
    }
  } catch (error) {
    if (error instanceof Error) {
      SharedWeatherStore.setError(error.message);
      console.error("Помилка запиту getCity:", error.message);
    } else {
      SharedWeatherStore.setError("Невідома помилка запиту getCity");
      console.error("Невідома помилка запиту getCity");
    }
  } finally {
    SharedWeatherStore.setLoading(false);
  }
}

async function getWeather(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    SharedWeatherStore.setWeatherData(data);
    console.log("Дані про погоду:", data);
  } catch (error) {
    if (error instanceof Error) {
      SharedWeatherStore.setError(error.message);
      console.error("Помилка запиту getWeather:", error.message);
    } else {
      SharedWeatherStore.setError("Невідома помилка запиту getWeather");
      console.error("Невідома помилка запиту getWeather");
    }
  }
}

export { getCity };
