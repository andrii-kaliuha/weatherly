import { observer } from "mobx-react-lite";
import { weeklyForecastStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";

export const WeeklyForecast = observer(() => {
  const { weeklyForecast } = weeklyForecastStore;
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-on-surface rounded-3xl">
      <h2 className="text-[16px] px-6 pt-6 pb-3 leading-none">{t("weekly_weather_forecast")}</h2>
      <ul className="flex flex-col">
        {weeklyForecast.map(
          (day: { date: string; weekday: string; minTemp: number; maxTemp: number; icon: string; description: string }, index: number) => (
            <li key={index} className="flex justify-between items-center px-6 py-3 border-t-2 border-background">
              <div className="md:flex-1">
                <p>{day.date}</p>
                <p>{day.weekday}</p>
              </div>
              <img src={`./src/assets/icons/${day.icon}.svg`} alt="" height={32} width={32} />
              <p className="ml-3 hidden md:block md:flex-1">{day.description}</p>
              <p className="text-[20px] w-8 text-center md:flex-1">{day.maxTemp}°</p>
              <p className="text-[20px] w-8 text-center md:flex-1 opacity-55">{day.minTemp}°</p>
            </li>
          )
        )}
      </ul>
    </section>
  );
});
