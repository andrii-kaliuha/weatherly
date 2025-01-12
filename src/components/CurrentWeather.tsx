import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const CurrentWeather = observer(() => {
  const { loading, error, hourlyForecast } = WeatherStore;

  if (loading) {
    return (
      <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col ">
        <h2 className="text-[14px] font-bold shimmer-loading">
          Now in {WeatherStore.city}, {WeatherStore.date}
        </h2>
        <span className="text-[12px]">Прогноз на найближчу годину</span>
        <div className="leading-none grid grid-cols-2 justify-items-center text-center gap-3 my-3">
          <b className="text-[64px]">{WeatherStore.temperature}°</b>
          <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
          <p className="leading-tight">Відчувається як {WeatherStore.feelsLike}°</p>
          <p>{WeatherStore.description}</p>
        </div>
      </section>
    );
  }

  if (error) return <p>{error}</p>;

  type LiProps = {
    title: string;
    value: any;
    iconClassName: string;
  };

  const Li = ({ title, iconClassName, value }: LiProps) => {
    return (
      <li className="grid flex-1 p-3 bg-[#111] rounded-[12px] gap-3">
        <p className="text-[16px] text-[#7b7980]">{title}</p>
        <div className="flex items-center justify-between">
          <span className={`text-[24px] ${iconClassName}`}></span>
          <p className="text-[24px] leading-none">{value}</p>
        </div>
      </li>
    );
  };

  return (
    <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col ">
      <h2 className="text-[14px] font-bold">
        Now in {WeatherStore.city}, {WeatherStore.date}
      </h2>
      {/* <span className="text-[12px]">Прогноз на найближчу годину</span> */}
      <div className="leading-none grid grid-cols-2 justify-items-center text-center gap-3 my-3">
        <b className="text-[64px]">{WeatherStore.temperature}°</b>
        <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
        {/* <p className="leading-tight">Відчувається як {WeatherStore.feelsLike}°</p> */}
        <p>{WeatherStore.description}</p>
      </div>

      {/* <div className="max-w-[1024px] w-[calc(100% - 24px)] overflow-hidden">
        <ul className="flex gap-3 w-full overflow-x-auto">
          {hourlyForecast && hourlyForecast.length > 0 ? (
            hourlyForecast.map((item: any, index: any) => (
              <li key={index} className="flex flex-col items-center h-[100px]">
                <p>{new Date(item.dt * 1000).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}</p>
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather Icon" />
                <p>{Math.round(item.temp)}</p>
              </li>
            ))
          ) : (
            <p>Немає даних про погоду</p>
          )}
        </ul>
      </div> */}

      <ul className="flex flex-wrap gap-3 justify-between w-full">
        <Li title="Feels like" iconClassName="icon-feels-like" value={WeatherStore.feelsLike} />
        <Li title="Humidity" iconClassName="icon-uv" value={WeatherStore.humidity} />
        <Li title="Pressure" iconClassName="icon-meater" value={WeatherStore.pressure} />
        <Li title="UV" iconClassName="icon-waves" value={WeatherStore.uv} />
        <Li title="Wind" iconClassName="icon-wind" value={WeatherStore.windSpeed} />
        <Li title="Visibility" iconClassName="icon-visibility" value={WeatherStore.visibility} />
      </ul>

      {/* <li className="flex-1  p-3 bg-[#111] rounded-[12px]">
          <p>Humidity</p>
          <span className="icon-uv"></span>
          <p>{WeatherStore.humidity}%</p>
        </li>

        <li className="flex-1 p-3 bg-[#111] rounded-[12px]">
          <p>Pressure</p>
          <span className="icon-meater"></span>
          {WeatherStore.pressure}
        </li>
        <li className="flex-1 p-3 bg-[#111] rounded-[12px]">UV Index: {WeatherStore.uv}</li>
        <li className="flex-1 p-3 bg-[#111] rounded-[12px]">Wind Speed: {WeatherStore.windSpeed}</li>
      </ul> */}
    </section>
  );
});

export { CurrentWeather };

// Task for Tomorow:

// округлити значення забруднювачів в компоненті AQI.tsx
// виправити вертикальне вирівнювання іконок в WeatherCondition
// виправити відображення годин в hourlyForecast
// виправити відображення дати в CurrentWeather
// додати shimmer-loading до елементів а також додати повідомлення про помилку для користувача
// додати повідомлення про поилку та про загрузку в App.tsx замість main так буде краще
