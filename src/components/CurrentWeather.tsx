import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const CurrentWeather = observer(() => {
  return (
    <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 w-[300px]">
      <h2 className="text-[14px] font-bold">
        Now in {WeatherStore.city}, {WeatherStore.date}
      </h2>
      <div className="flex gap-3">
        <div className="flex items-center">
          <p className="text-[56px] leading-none">{WeatherStore.temperature}°</p>
          <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
        </div>
        <ul>
          <li>Тиск: {WeatherStore.pressure} мм</li>
          <li>Вологість: {WeatherStore.humidity} %</li>
          <li>Вітер: {WeatherStore.windSpeed} м/с</li>
        </ul>
      </div>
      <p>Відчувається як {WeatherStore.feelsLike}°</p>
      <p>{WeatherStore.summary}</p>
    </section>
  );
});

export { CurrentWeather };
