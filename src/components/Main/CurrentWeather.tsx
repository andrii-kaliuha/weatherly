import { observer } from "mobx-react-lite";
import { currentWeatherStore } from "../../store/forecast";
import { Icon, SVG, useHorizontalScroll } from "../ui";
import { useTranslation } from "react-i18next";

export const CurrentWeather = observer(() => {
  const { t } = useTranslation();

  return (
    <section
      className="bg-surface text-primary text-sm rounded-3xl p-6 flex flex-col justify-between gap-3 current-weather-section"
      aria-labelledby="current-weather-heading"
    >
      <div>
        <h2 id="current-weather-heading" className="text-base">
          {t("current_weather_forecast")}
        </h2>
        <p>
          {t("weather_in")} {currentWeatherStore.cityName}, {currentWeatherStore.weekday}, {currentWeatherStore.date}
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
  const { t } = useTranslation();

  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center">
        <strong className="text-6xl leading-none">{currentWeatherStore.temperature}°</strong>
        <SVG source={currentWeatherStore.icon} width={64} height={64} />
      </div>
      <div className="text-right flex flex-col justify-center" aria-label={t("weather.current.aria.temp_range")}>
        <span>{currentWeatherStore.description}</span>
        <span className="font-semibold">
          {currentWeatherStore.maxTemp}° / {currentWeatherStore.minTemp}°
        </span>
      </div>
    </div>
  );
});

const HourlyForecast = observer(() => {
  const { hourlyForecast } = currentWeatherStore;
  const listRef = useHorizontalScroll<HTMLUListElement>();
  const { t } = useTranslation();

  return (
    <ul
      ref={listRef}
      tabIndex={0}
      aria-label={t("weather.hourly.title")}
      className="flex justify-between overflow-x-auto gap-6 p-2 rounded-xl 
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 
                 transition-shadow scroll-smooth"
    >
      {hourlyForecast.map((item, index) => (
        <li key={index} className="flex flex-col items-center justify-between gap-3 rounded-3xl min-w-12 flex-shrink-0">
          <time dateTime={item.fullDateISO} className="text-sm font-medium">
            {item.time}
          </time>

          <SVG source={item.icon} width={32} height={32} label={item.description} />
          <p className="font-bold">{item.temperature}°</p>
        </li>
      ))}
    </ul>
  );
});

const WeatherConditions = observer(() => {
  const { weatherConditions } = currentWeatherStore;
  const { t } = useTranslation();

  return (
    <dl className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3" aria-label={t("weather.current.aria.conditions")}>
      {weatherConditions.map((item, index) => (
        <div key={index} className="flex flex-col items-center leading-none rounded-lg gap-2">
          <Icon name={item.icon} height={20} width={20} aria-hidden="true" />
          <dt className="text-xs">{item.name}</dt>
          <dd className="flex text-sm">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
});
