import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import "./WeeklyForecast.css";
import { SVG } from "../../shared/ui/Icons";
import settings from "../../store/settings";
import type { WeeklyForecastState } from "../../shared/types/store";

type WeeklyForecastList = {
  weeklyForecastList: WeeklyForecastState[];
};

export const WeeklyForecast = observer(({ weeklyForecastList }: WeeklyForecastList) => {
  const { t } = useTranslation();
  const unitAria = `weather.units.${settings.settings.temperatureUnit}.aria`;
  const unitShort = `weather.units.${settings.settings.temperatureUnit}.short`;
  const theme = settings.settings.theme;

  return (
    <section className="bg-surface text-primary rounded-3xl weekly-forecast-section">
      <h2 className="px-6 pt-6 pb-3 leading-none">{t("weather.weekly.title")}</h2>

      <ul className="weekly-forecast-list">
        {weeklyForecastList.map((day: WeeklyForecastState) => {
          const dayDescription = t("weather.weekly.day_description", {
            date: day.date,
            weekday: day.weekday,
            description: t(day.description),
            maxTemp: day.maxTemp,
            minTemp: day.minTemp,
            unit: t(unitAria),
          });

          return (
            <li key={day.dateISO} className="weekly-forecast-item">
              <span className="sr-only">{dayDescription}</span>

              <time aria-hidden="true" className="weekly-forecast-date" dateTime={day.dateISO}>
                <p>{day.date}</p>
                <p>{day.weekday}</p>
              </time>

              <div aria-hidden="true" className="flex items-center gap-3 weekly-forecast-description">
                <SVG source={`/weather-icons/${theme === "dark" ? "dark" : "light"}/${day.icon}.svg`} width={32} height={32} />
                {/* <p className="leading-none hidden md:block">{day.description}</p> */}
                <p className="leading-none hidden md:block">{t(`weather_descriptions.${day.description}.summary`)}</p>
              </div>

              <p aria-hidden="true" className="text-xl text-center weekly-forecast-temp-max">
                {day.maxTemp}
                {t(unitShort)}
              </p>
              <p aria-hidden="true" className="text-xl text-center opacity-55 weekly-forecast-temp-min">
                {day.minTemp}
                {t(unitShort)}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
});
