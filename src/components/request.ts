const API_KEY = "ada53a53546a12851a13875d932b485b";

function getCity(cityName: string) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

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
        getWeather(lat, lon);
      } else {
        console.log("Місто не знайдено");
      }
    })
    .catch((error) => {
      console.error("Помилка першого запиту:", error.message);
    });
}

function getWeather(lat: number, lon: number) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export { getCity };
