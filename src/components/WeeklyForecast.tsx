import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import WeeklyForecastStore from "../store/WeeklyForecastStore.ts";

const WeeklyForecast = observer(() => {
  useEffect(() => {
    WeeklyForecastStore.getWeatherData();
  }, []);

  const { loading, error, formattedForecast } = WeeklyForecastStore;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="weekly-forecast-section bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl w-full max-w-full">
      <h2 className="text-xl font-bold mb-3">Weekly Forecast</h2>
      <ul className="flex flex-col gap-3">
        {formattedForecast.map((item: any, index: number) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <p>{item.date.split(",")[0]}</p>
              <p className="opacity-55">{item.date.split(",")[1]}</p>
            </div>
            <img src={item.icon} alt="Weather Icon" className="w-8 h-8" />
            <p className="text-[20px] w-8 text-center">{item.tempMax}°</p>
            <p className="text-[20px] w-8 text-center opacity-55">{item.tempMin}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
});

export { WeeklyForecast };
