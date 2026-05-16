import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { WeeklyForecastListProps, WeeklyForecastItemProps } from "../../types";
import "./WeeklyForecast.css";
import { SVG } from "../ui";

export const WeeklyForecast = observer(({ theme, weeklyForecastList }: WeeklyForecastListProps) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-primary rounded-3xl weekly-forecast-section">
      <h2 className="px-6 pt-6 pb-3 leading-none">{t("weather.weekly.title")}</h2>

      <ul className="weekly-forecast-list">
        {weeklyForecastList.map((day: WeeklyForecastItemProps, index: number) => {
          const fullDayDescription = `${day.date}, ${day.weekday}, ${day.description}, ${t("weather.weekly.max_temp")} ${day.maxTemp}°, ${t("weather.weekly.min_temp")} ${day.minTemp}°`;

          return (
            <li key={index} className="weekly-forecast-item">
              <span className="sr-only">{fullDayDescription}</span>

              <div aria-hidden="true" className="weekly-forecast-date">
                <time dateTime={day.fullDateISO}>
                  <p>{day.date}</p>
                  <p>{day.weekday}</p>
                </time>
              </div>

              <div aria-hidden="true" className="flex items-center gap-3 weekly-forecast-description">
                <SVG source={`/weather-icons/${theme === "dark" ? "dark" : "light"}/${day.icon}.svg`} width={32} height={32} />
                <p className="leading-none hidden md:block">{day.description}</p>
              </div>

              <p aria-hidden="true" className="text-xl text-center weekly-forecast-temp-max">
                {day.maxTemp}°
              </p>
              <p aria-hidden="true" className="text-xl text-center opacity-55 weekly-forecast-temp-min">
                {day.minTemp}°
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
});
