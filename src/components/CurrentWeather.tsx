import { observer } from "mobx-react-lite";
import CurrentWeatherStore from "../store/CurrentWeatherStore";

const CurrentWeather = observer(() => {
  const { hourlyForecast, weatherConditions } = CurrentWeatherStore;
  return (
    <section className=" bg-surface text-on-surface text-[14px] rounded-3xl p-6 lg:w-[296px] flex-shrink flex flex-col justify-between gap-3">
      <div>
        <h2 className="text-[16px]">Прогноз на найближчу годину</h2>
        <p>
          Погода {CurrentWeatherStore.city}, {CurrentWeatherStore.date}
        </p>
      </div>
      <div className="flex justify-between gap-3">
        <div className="flex items-center">
          <p className="text-[56px] leading-none">{CurrentWeatherStore.temperature}&deg;</p>
          <img src={CurrentWeatherStore.icon} alt="" className="h-16" />
        </div>
        <ul className="text-right flex flex-col justify-center">
          <li>{CurrentWeatherStore.description}</li>
          <li>
            {CurrentWeatherStore.maxTempDay}°/{CurrentWeatherStore.minTempDay}°
          </li>
        </ul>
      </div>
      <p>{CurrentWeatherStore.summary}</p>

      <ul className="flex justify-between overflow-x-auto gap-3 scroll-px-40">
        {hourlyForecast.map((item, index) => (
          <li
            key={index}
            className="bg-surface text-on-surface flex flex-col items-center justify-between rounded-3xl min-w-[48px] flex-shrink-0"
          >
            <span>{item.time}</span>
            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="" className="h-12 w-12 object-contain" />
            <p>{item.temperature}°</p>
          </li>
        ))}
      </ul>

      <ul className="grid gap-3 grid-cols-3 sm:grid-cols-6 lg:grid-cols-3">
        {weatherConditions.map((item, index) => (
          <li key={index} className="rounded-lg flex items-center flex-col">
            <span className={item.icon}></span>
            <p className="flex items-end">{item.value}</p>
            <span className="text-[12px]">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export { CurrentWeather };
