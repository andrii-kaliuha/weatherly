import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { WeeklyForecastListProps, WeeklyForecastItemProps } from "../../types";
import "./WeeklyForecast.css";
import { SVG } from "../ui";

export const WeeklyForecast = observer(({ theme, weeklyForecastList }: WeeklyForecastListProps) => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-primary rounded-3xl weekly-forecast-section">
      <h2 className="px-6 pt-6 pb-3 leading-none">{t("weekly_forecast_title")}</h2>
      <ul className="weekly-forecast-list">
        {weeklyForecastList.map((day: WeeklyForecastItemProps, index: number) => (
          <li key={index} className="weekly-forecast-item">
            <div className="weekly-forecast-date">
              <p>{day.date}</p>
              <p>{day.weekday}</p>
            </div>
            <div className="flex items-center gap-3 weekly-forecast-description">
              <SVG source={`/weather-icons/${theme === "dark" ? "dark" : "light"}/${day.icon}.svg`} width={32} height={32} />
              <p className="leading-none hidden md:block">{day.description}</p>
            </div>
            <p className="text-xl text-center weekly-forecast-temp-max">{day.maxTemp}°</p>
            <p className="text-xl text-center opacity-55 weekly-forecast-temp-min">{day.minTemp}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
});
