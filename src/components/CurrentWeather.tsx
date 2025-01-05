import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const CurrentWeather = observer(() => {
  const { loading, error, hourlyForecast } = WeatherStore;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col ">
      <h2 className="text-[14px] font-bold">
        Now in {WeatherStore.city}, {WeatherStore.date}
      </h2>
      <span className="text-[12px]">Прогноз на найближчу годину</span>
      <div className="leading-none grid grid-cols-2 justify-items-center text-center gap-3 my-3">
        <b className="text-[64px]">{WeatherStore.temperature}°</b>
        <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
        <p className="leading-tight">Відчувається як {WeatherStore.feelsLike}°</p>
        <p>{WeatherStore.description}</p>
      </div>

      {/* <ul className="flex gap-3 w-full overflow-x-auto">
        {hourlyForecast && hourlyForecast.length > 0 ? (
          hourlyForecast.map((item: any, index: any) => (
            <li key={index} className="flex flex-col items-center h-[100px]">
              <p>{new Date(item.dt * 1000).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}</p>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
              <p>{Math.round(item.temp)}</p>
            </li>
          ))
        ) : (
          <p>Немає даних про погоду</p>
        )}
      </ul> */}

      <ul className="flex flex-col gap-3 w-full">
        <li>Humidity: {WeatherStore.humidity}</li>
        <li>Pressure: {WeatherStore.pressure}</li>
        <li>UV Index: {WeatherStore.uv}</li>
        <li>Wind Speed: {WeatherStore.windSpeed}</li>
        <li>Chance of Precipitation: {WeatherStore.chanceOfprecipitation}</li>
      </ul>
    </section>
  );
});

export { CurrentWeather };
