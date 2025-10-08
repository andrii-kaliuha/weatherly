import { observer } from "mobx-react-lite";
import { currentWeatherStore } from "../../store/forecast";
import { SVG, useHorizontalScroll } from "../ui";
import { useTranslation } from "react-i18next";

export const CurrentWeather = observer(() => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-on-surface text-sm rounded-3xl p-6 flex flex-col justify-between gap-3 current-weather-section">
      <div>
        <h2 className="text-base">{t("current_weather_forecast")}</h2>
        <p>
          {t("weather")} {currentWeatherStore.cityName}, {currentWeatherStore.weekday}, {currentWeatherStore.date}
        </p>
      </div>
      <CurrentTemperature />
      <p>{currentWeatherStore.summary}</p>
      <HourlyForecast />
      <WeatherConditions />
    </section>
  );
});

const CurrentTemperature = observer(() => {
  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center">
        <strong className="text-6xl leading-none">{currentWeatherStore.temperature}°</strong>
        <svg width={64} height={64}>
          <use href={currentWeatherStore.icon}></use>
        </svg>
      </div>
      <ul className="text-right flex flex-col justify-center">
        <li>{currentWeatherStore.description}</li>
        <li>
          {currentWeatherStore.maxTemp}°/{currentWeatherStore.minTemp}°
        </li>
      </ul>
    </div>
  );
});

const HourlyForecast = observer(() => {
  const { hourlyForecast } = currentWeatherStore;
  const listRef = useHorizontalScroll<HTMLUListElement>();

  return (
    <ul ref={listRef} className="flex justify-between overflow-x-auto gap-6">
      {hourlyForecast.map((item, index) => (
        <li key={index} className="flex flex-col items-center justify-between gap-3 rounded-3xl min-w-12 flex-shrink-0">
          <span>{item.time}</span>
          <svg width={32} height={32}>
            <use href={item.icon}></use>
          </svg>
          <p>{item.temperature}°</p>
        </li>
      ))}
    </ul>
  );
});

const WeatherConditions = observer(() => {
  const { weatherConditions } = currentWeatherStore;
  return (
    <ul className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3">
      {weatherConditions.map((item, index) => (
        <li key={index} className="flex flex-col items-center leading-none rounded-lg gap-2">
          <dl className="contents">
            <SVG name={item.icon} height={20} width={20} />
            <dt className="flex text-sm">{item.value}</dt>
            <dd className="text-xs">{item.name}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
});
