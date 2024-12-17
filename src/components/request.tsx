const API_KEY: string = "ada53a53546a12851a13875d932b485b";
const cityName = "Kyiv";
const countryCode = "UA";
const limit = 1;

const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=${limit}&appid=${API_KEY}`;

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Конвертуємо відповідь у JSON
  })
  .then((data) => {
    console.log("Результат запиту:", data);
    if (data.length > 0) {
      console.log(`Місто: ${data[0].name}`);
      console.log(`Широта: ${data[0].lat}`);
      console.log(`Довгота: ${data[0].lon}`);
    } else {
      console.log("Місто не знайдено");
    }
  })
  .catch((error) => {
    console.error("Помилка запиту:", error.message);
  });

function getCityData(cityName: string, countryCode: string) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(`Координати міста: Широта = ${lat}, Довгота = ${lon}`);

        // Викликаємо другий запит для отримання погоди
        getWeatherData(lat, lon);
      } else {
        console.log("Місто не знайдено");
      }
    })
    .catch((error) => {
      console.error("Помилка першого запиту:", error.message);
    });
}

function getWeatherData(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Дані про погоду:", data);
      console.log(`Температура: ${data.main.temp}°C`);
      console.log(`Погода: ${data.weather[0].description}`);
    })
    .catch((error) => {
      console.error("Помилка другого запиту:", error.message);
    });
}

// Викликаємо функцію для міста Київ
getCityData("Kyiv", "UA");

export { getCityData };
