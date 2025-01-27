import { observer } from "mobx-react-lite";
import WeeklyForecastStore from "../store/WeeklyForecastStore";

const WeeklyForecast = observer(() => {
  const { weeklyForecast } = WeeklyForecastStore;

  return (
    <section className="bg-surface text-on-surface rounded-3xl">
      <h2 className="text-[16px] px-6 pt-6 pb-3 leading-none">Прогноз погоди на тиждень</h2>
      <ul className="flex flex-col">
        {weeklyForecast.map((day: any, index: number) => (
          <li key={index} className="flex justify-between items-center px-6 py-3 border-t-2 border-[#131214]">
            <div className="md:flex-1">
              <p>{day.date}</p>
              <p>{day.weekday}</p>
            </div>
            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="" className="w-8 h-8" />
            <p className="hidden md:block md:flex-1">{day.description}</p>
            <p className="text-[20px] w-8 text-center md:flex-1">{day.maxTemp}°</p>
            <p className="text-[20px] w-8 text-center md:flex-1 opacity-55">{day.minTemp}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
});

export { WeeklyForecast };
