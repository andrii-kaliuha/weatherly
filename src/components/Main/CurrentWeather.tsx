import { observer } from "mobx-react-lite";
import { currentWeatherStore } from "../../store/forecast/currentWeatherStore";
import { Icon, SVG } from "../../shared/ui/Icons";
import { useTranslation } from "react-i18next";
import settings from "../../store/settings";
import { useHorizontalScroll } from "../../shared/hooks/useHorizontalScroll";

export const CurrentWeather = observer(() => {
  const { t } = useTranslation();
  const { сurrentWeather } = currentWeatherStore;
  if (!сurrentWeather) return null;

  const subtitle = t("weather.current.subtitle", {
    city: сurrentWeather.cityName,
    weekday: сurrentWeather.weekday,
    date: сurrentWeather.date,
  });

  return (
    <section className="bg-surface text-primary text-sm rounded-3xl p-6 flex flex-col justify-between gap-3 current-weather-section">
      <div>
        <h2 className="text-base">{t("weather.current.title")}</h2>
        <p>{subtitle}</p>
      </div>
      <CurrentTemperature />
      <p>{сurrentWeather.summary}</p>
      <HourlyForecast />
      <WeatherConditions />
    </section>
  );
});

const CurrentTemperature = observer(() => {
  const { t } = useTranslation();
  const { сurrentWeather } = currentWeatherStore;
  if (!сurrentWeather) return null;

  const tempRange = t("weather.current.temp_range", {
    maxTemp: сurrentWeather.maxTemp,
    minTemp: сurrentWeather.minTemp,
    unit: t(`weather.units.${settings.settings.temperatureUnit}.short`),
  });

  const unitShort = t(`weather.units.${settings.settings.temperatureUnit}.short`);
  const unitLong = t(`weather.units.${settings.settings.temperatureUnit}.long`);

  return (
    <div className="flex flex-col gap-3 w-max">
      <div className="flex items-center gap-3">
        <strong className="text-6xl leading-none">
          {сurrentWeather.temperature}
          {unitLong}
        </strong>
        <SVG source={сurrentWeather.icon} width={64} height={64} />
      </div>

      <div className="flex gap-3 justify-between">
        <span aria-hidden="true">
          {сurrentWeather.maxTemp}
          {unitShort} / {сurrentWeather.minTemp}
          {unitShort}
        </span>
        <span>{сurrentWeather.description}</span>
        <span className="sr-only">{tempRange}</span>
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
      className="flex justify-between overflow-x-auto gap-6 focus-visible:outline-2 focus-visible:outline-offset 
      focus-visible:outline-offset-2 scroll-smooth focus-visible:outline-accent"
    >
      {hourlyForecast.map((item, index) => (
        <li key={index} className="flex flex-col items-center justify-between gap-3 min-w-12 flex-shrink-0 relative">
          <time dateTime={item.dateISO} aria-hidden="true" className="text-sm font-medium">
            {item.time}
          </time>
          <SVG source={item.icon} width={32} height={32} aria-hidden="true" />
          <p aria-hidden="true">{item.temperature}°</p>

          <span className="sr-only">
            {t("weather.hourly.item", {
              time: item.time,
              description: item.description,
              temperature: item.temperature,
            })}
          </span>
        </li>
      ))}
    </ul>
  );
});

const WeatherConditions = observer(() => {
  const { weatherConditions } = currentWeatherStore;
  const { t } = useTranslation();

  return (
    <ul className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3" aria-label={t("weather.current.conditions.title")}>
      {weatherConditions.map((item, index) => (
        <li key={index} className="flex flex-col items-center leading-none gap-2">
          <Icon name={item.icon} height={24} width={24} aria-hidden="true" />

          <span aria-hidden="true" className="text-xs">
            {item.name}
          </span>

          <span aria-hidden="true" className="text-sm font-medium">
            {item.value} {t(`weather.units.${item.unit}.long`)}
          </span>

          <span className="sr-only">
            {t("weather.current.conditions.item", { name: item.name, value: item.value, units: t(`weather.units.${item.unit}.aria`) })}
          </span>
        </li>
      ))}
    </ul>
  );
});
