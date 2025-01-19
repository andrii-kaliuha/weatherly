import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const WeeklyForecast = observer(() => {
  const { dailyForecast } = WeatherStore;

  return (
    <section className="weekly-forecast-section bg-[#1d1c1f] text-[#dddae5] rounded-3xl">
      <h2 className="text-[16px] mx-6 mt-6 mb-3">Weekly Forecast</h2>
      <ul className="flex flex-col">
        {dailyForecast && dailyForecast.length > 0 ? (
          dailyForecast.map((item: any, index: number) => (
            <li key={index} className="flex justify-between items-center px-6 py-3 border-t-2 border-[#131214] last-of-type:pb-6">
              <div className="md:flex-1">
                <p>
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p>
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" className="w-8 h-8" />
              <p className="hidden md:block md:flex-1">{item.weather[0].description}</p>
              <p className="text-[20px] w-8 text-center md:flex-1">{Math.round(item.temp.max)}°</p>
              <p className="text-[20px] w-8 text-center md:flex-1 opacity-55">{Math.round(item.temp.min)}°</p>
            </li>
          ))
        ) : (
          <p className="m-6">No forecast data available</p>
        )}
      </ul>
    </section>
  );
});

export { WeeklyForecast };
