import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const WeeklyForecast = observer(() => {
  const { loading, error, dailyForecast } = WeatherStore;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="weekly-forecast-section bg-[#1d1c1f] text-[#dddae5] rounded-3xl">
      <h2 className="text-xl font-bold m-6">Weekly Forecast</h2>
      <ul className="flex flex-col">
        {dailyForecast && dailyForecast.length > 0 ? (
          dailyForecast.map((item: any, index: number) => (
            <li key={index} className="flex justify-between items-center px-6 py-3 border-t-2 border-[#131214]">
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
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </li>
          ))
        ) : (
          <p>No forecast data available</p>
        )}
      </ul>
      <WeatherTable />
    </section>
  );
});

export { WeeklyForecast };

const WeatherTable = () => {
  return (
    <ul className="flex gap-3 mx-6 mb-6">
      <li>
        <p>Дата</p>
        <p>Час</p>
        <p className="leading-8">Хмарність</p>
        <p>Температура</p>
        <p>Відчувається</p>
        <p>Тиск</p>
        <p>Вологість</p>
        <p>Вітер</p>
        <p>УФ Індекс</p>
      </li>
      <Li></Li>
      <Li></Li>
      <Li></Li>
      <Li></Li>
    </ul>
  );
};

export default WeatherTable;

const Li = () => {
  const data = [
    {
      date: "середа 15",
      time: "Ніч",
      temperature: 5,
      feels_like: 3,
      pressure: 760,
      humidity: 80,
      wind: 4,
      uv: 2,
    },
  ];

  return (
    <li className="flex flex-col items-center">
      <div>
        <p>{data[0].date}</p>
        <p>{data[0].time}</p>
      </div>
      <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="Weather Icon" className="h-8" />
      <p>{data[0].temperature}</p>
      <p>{data[0].feels_like}</p>
      <p>{data[0].pressure}</p>
      <p>{data[0].humidity}</p>
      <p>{data[0].wind}</p>
      <p>{data[0].uv}</p>
    </li>
  );
};
