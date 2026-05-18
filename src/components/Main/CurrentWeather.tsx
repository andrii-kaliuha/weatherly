import { observer } from "mobx-react-lite";
import { currentWeatherStore } from "../../store/forecast";
import { Icon, SVG, useHorizontalScroll } from "../ui";
import { useTranslation } from "react-i18next";

export const CurrentWeather = observer(() => {
  const { t } = useTranslation();

  const description = `${t("weather_in")} ${currentWeatherStore.cityName}, ${currentWeatherStore.weekday}, ${currentWeatherStore.date}`;

  return (
    <section
      className="bg-surface text-primary text-sm rounded-3xl p-6 flex flex-col justify-between gap-3 current-weather-section"
      aria-labelledby="current-weather-heading"
    >
      <div>
        <h2 id="current-weather-heading" className="text-base">
          {t("current_weather_forecast")}
        </h2>
        <p>{description}</p>
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

  const tempRange = `${t("weather.weekly.max_temp")} ${currentWeatherStore.maxTemp}°, ${t("weather.weekly.min_temp")} ${currentWeatherStore.minTemp}°`;
  const degrees = `${currentWeatherStore.temperature}°`;

  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center">
        <strong className="text-6xl leading-none">{degrees}</strong>
        <SVG source={currentWeatherStore.icon} width={64} height={64} />
      </div>
      {/* <div className="text-right flex flex-col justify-center" aria-label={t("weather.current.aria.temp_range")}>
        <span>{currentWeatherStore.description}</span>
        <span>
          {currentWeatherStore.maxTemp}° / {currentWeatherStore.minTemp}°
        </span>
      </div> */}

      <div className="text-right flex flex-col justify-center">
        <span>{currentWeatherStore.description}</span>
        <span aria-hidden="true">
          {currentWeatherStore.maxTemp}° / {currentWeatherStore.minTemp}°
        </span>
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
      className="flex justify-between overflow-x-auto gap-6 p-2
      focus-visible:outline-2 focus-visible:outline-offset focus-visible:outline-offset-2
        scroll-smooth focus-visible:outline-accent"
    >
      {hourlyForecast.map((item, index) => (
        <li key={index} className="flex flex-col items-center justify-between gap-3 min-w-12 flex-shrink-0 relative">
          <time dateTime={item.fullDateISO} aria-hidden="true" className="text-sm font-medium">
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

// const WeatherConditions = observer(() => {
//   const { weatherConditions } = currentWeatherStore;
//   const { t } = useTranslation();

//   return (
//     <dl className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3" aria-label={t("weather.current.aria.conditions")}>
//       {weatherConditions.map((item, index) => (
//         <div key={index} className="flex flex-col items-center leading-none rounded-lg gap-2">
//           <Icon name={item.icon} height={20} width={20} aria-hidden="true" />
//           <dt className="text-xs">{item.name}</dt>
//           <dd className="flex text-sm">{item.value}</dd>
//         </div>
//       ))}
//     </dl>
//   );
// });

// const WeatherConditions = observer(() => {
//   const { weatherConditions } = currentWeatherStore;
//   const { t } = useTranslation();

//   return (
//     <>
//       <h3 className="sr-only">{t("weather.current.conditions")}</h3>
//       <dl className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3">
//         {weatherConditions.map((item, index) => (
//           <div role="group" key={index} className="flex flex-col items-center leading-none rounded-lg gap-2">
//             <Icon name={item.icon} height={20} width={20} aria-hidden="true" />
//             <dt className="text-xs">{item.name}</dt>
//             <dd className="flex text-sm">{item.value}</dd>
//           </div>
//         ))}
//       </dl>
//     </>
//   );
// });

// const WeatherConditions = observer(() => {
//   const { weatherConditions } = currentWeatherStore;
//   const { t } = useTranslation();

//   return (
//     <>
//       <h3 className="sr-only">{t("weather.current.conditions")}</h3>
//       <ul className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 gap-3">
//         {weatherConditions.map((item, index) => (
//           <li key={index} className="flex flex-col items-center leading-none gap-2">
//             <Icon name={item.icon} height={24} width={24} aria-hidden="true" />
//             <span className="text-xs">{item.name}</span>
//             <span className="flex text-sm">{item.value}</span>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// });

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
            {item.value} {t(`weather.current.units.${item.unit}`)}
          </span>

          <span className="sr-only">
            {t("weather.current.conditions.item", {
              name: item.name,
              value: item.value,
              units: t(`weather.current.units_aria.${item.unit}`),
            })}
          </span>
        </li>
      ))}
    </ul>
  );
});
