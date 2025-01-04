import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const CurrentWeather = observer(() => {
  const { loading, error, hourlyForecast } = WeatherStore;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col w-full max-w-full">
      <h2 className="text-[14px] font-bold">
        Погода {WeatherStore.city},<br />
        <span>{WeatherStore.date}</span>
      </h2>
      <span className="text-[12px]">Прогноз на найближчу годину</span>
      <div className="leading-none grid grid-cols-2 justify-items-center text-center gap-3 my-3">
        <b className="text-[64px]">{WeatherStore.temperature}°</b>
        <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
        <p className="leading-tight">Відчувається як {WeatherStore.feelsLike}°</p>
        <p>{WeatherStore.description}</p>
      </div>

      {/* <ul className="hourly-forecast">
        {hourlyForecast.map((item: any, index: any) => (
          <li key={index} className="flex justify-between items-center">
            <p>{item.dt}</p>
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
          </li>
        ))}
      </ul> */}

      {/* <p>
        {
          "Погода у Тернополі обіцяє бути хмарною, але вечірнє небо стане ясним. Залишаємо парасольки вдома. Опадів не передбачається. Варто готуватися до холодів."
        }
      </p> */}
    </section>
  );
});

export { CurrentWeather };
