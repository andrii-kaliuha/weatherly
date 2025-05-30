import { observer } from "mobx-react-lite";
import { weeklyForecastStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";
import "./WeeklyForecast.css";

export const WeeklyForecast = observer(() => {
  const { weeklyForecast } = weeklyForecastStore;
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-on-surface rounded-3xl weekly-forecast-section">
      <h2 className="text-[16px] px-6 pt-6 pb-3 leading-none">{t("weekly_forecast_title")}</h2>
      <ul className="weekly-forecast-list">
        {weeklyForecast.map(
          (day: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }, index: number) => (
            <li key={index} className="weekly-forecast-list-item">
              <div className="weekly-forecast-date">
                <p>{day.date}</p>
                <p>{day.weekday}</p>
              </div>
              <div className="flex items-center gap-3 weekly-forecast-description">
                <img src={`./src/assets/icons/${day.icon}.svg`} alt="" height={32} width={32} />
                <p className="leading-none hidden md:block">{day.description}</p>
              </div>
              <p className="text-[20px] text-center weekly-forecast-temp-max">{day.maxTemp}°</p>
              <p className="text-[20px] text-center opacity-55 weekly-forecast-temp-min">{day.minTemp}°</p>
            </li>
          )
        )}
      </ul>
    </section>
  );
});
