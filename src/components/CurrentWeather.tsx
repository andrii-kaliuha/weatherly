import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import CurrentWeatherStore from "../store/CurrentWeatherStore";

const CurrentWeather = observer(() => {
  useEffect(() => {
    CurrentWeatherStore.getWeather("Kyiv");
  }, []);

  return (
    <section className="max-w-[296px] current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col">
      <h2 className="text-[14px] font-bold">
        Погода {CurrentWeatherStore.city},<br />
        <span>{CurrentWeatherStore.date}</span>
      </h2>
      <span className="text-[12px]">Прогноз на найближчу годину</span>
      <div className="leading-none grid grid-cols-2 justify-items-center text-center gap-3 my-3">
        <b className="text-[64px]">{CurrentWeatherStore.temperature}°</b>

        <p className="leading-tight">Відчувається як {CurrentWeatherStore.feelsLike}°</p>
        <p>{CurrentWeatherStore.description}</p>
      </div>
      <p>{CurrentWeatherStore.description}</p>
    </section>
  );
});

export { CurrentWeather };
