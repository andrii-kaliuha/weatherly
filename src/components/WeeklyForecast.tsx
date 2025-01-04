import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const WeeklyForecast = observer(() => {
  const { loading, error, dailyForecast } = WeatherStore;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="weekly-forecast-section bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl w-full max-w-full">
      <h2 className="text-xl font-bold mb-3">Weekly Forecast</h2>
      <ul className="flex flex-col gap-3">
        {dailyForecast && dailyForecast.length > 0 ? (
          dailyForecast.map((item: any, index: number) => (
            <li key={index} className="flex justify-between items-center">
              <div>
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
              <p className="text-[20px] w-8 text-center">{Math.round(item.temp.max)}°</p>
              <p className="text-[20px] w-8 text-center opacity-55">{Math.round(item.temp.min)}°</p>
            </li>
          ))
        ) : (
          <p>No forecast data available</p>
        )}
      </ul>
    </section>
  );
});

export { WeeklyForecast };
