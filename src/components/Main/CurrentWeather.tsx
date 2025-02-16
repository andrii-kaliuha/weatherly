import { observer } from "mobx-react-lite";
import { useRef, useEffect } from "react";
import { currentWeatherStore } from "../../store/forecast";

const CurrentWeather = observer(() => {
  return (
    <section className="bg-surface text-on-surface text-[14px] rounded-3xl p-6 lg:w-[296px] flex-shrink flex flex-col justify-between gap-3">
      <div>
        <h2 className="text-[16px]">Прогноз на найближчу годину</h2>
        <p>
          Погода {currentWeatherStore.cityName}, {currentWeatherStore.weekday}, {currentWeatherStore.date}
        </p>
      </div>
      <CurrentTemperature />
      <p>{currentWeatherStore.summary}</p>
      <HourlyForecast />
      <WeatherConditions />
    </section>
  );
});

export { CurrentWeather };

const CurrentTemperature = observer(() => {
  return (
    <div className="flex justify-between gap-3">
      <div className="flex items-center">
        <p className="text-[56px] leading-none">{currentWeatherStore.temperature}&deg;</p>
        <img src={currentWeatherStore.icon} alt="" height={64} width={64} />
      </div>
      <ul className="text-right flex flex-col justify-center">
        <li>{currentWeatherStore.description}</li>
        <li>
          {currentWeatherStore.maxTemp}°/{currentWeatherStore.minTemp}°
        </li>
      </ul>
    </div>
  );
});

const HourlyForecast = observer(() => {
  const { hourlyForecast } = currentWeatherStore;

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (listRef.current) {
        listRef.current.scrollLeft += event.deltaY;
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <ul ref={listRef} className="flex justify-between overflow-x-auto gap-4">
      {hourlyForecast.map((item, index) => (
        <li key={index} className="flex flex-col items-center justify-between gap-3 rounded-3xl min-w-[48px] flex-shrink-0">
          <span>{item.time}</span>
          <img src={item.icon} alt="" className="h-8 w-8" />
          <p>{item.temperature}°</p>
        </li>
      ))}
    </ul>
  );
});

const WeatherConditions = observer(() => {
  const { weatherConditions } = currentWeatherStore;
  return (
    <ul className="grid gap-3 grid-cols-3 sm:grid-cols-6 lg:grid-cols-3">
      {weatherConditions.map((item, index) => (
        <li key={index} className="rounded-lg flex items-center flex-col">
          <span className="material-symbols-outlined">{item.icon}</span>
          {/* <span className="weatherly-icon-pack text-[16x]">{item.icon}</span> */}
          <p className="flex text-[14px]">{item.value}</p>
          <span className="text-[12px]">{item.name}</span>
        </li>
      ))}
    </ul>
  );
});
