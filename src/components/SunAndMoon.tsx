import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const Sun = observer(() => {
  const durationDay: string = "12:18:35";
  const sunriseTime: string = "06:41";
  const sunsetTime: string = "19:00";

  return (
    <div className="relative flex flex-col items-center mt-6">
      <img className="absolute -top-5" src="./src/assets/images/sun.svg" alt="" />
      <img src="./src/assets/images/sun-circle-eclipse.svg" alt="" />
      <div className="absolute bottom-0 flex flex-col items-center">
        <span>Тривалість дня</span>
        <span className="text-[20px] leading-none font-semibold">{WeatherStore.durationDay}</span>
      </div>
      <div className="flex items-center justify-between w-[232px] mt-3">
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/sunrise.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Схід</span>
          <span className="text-xs">{WeatherStore.sunriseTime}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/sunset.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Захід</span>
          <span className="text-xs">{WeatherStore.sunsetTime}</span>
        </div>
      </div>
    </div>
  );
});

const Moon = observer(() => {
  const moonPhase: string = "повна";
  const moonriseTime: string = "10:12";
  const moonsetTime: string = "22:03";

  return (
    <div className="relative flex flex-col items-center mt-6 ">
      <img className="absolute -top-5" src="./src/assets/images/moon.svg" alt="" />
      <img src="./src/assets/images/moon-circle-eclipse.svg" alt="" />
      <div className="absolute bottom-0 flex flex-col items-center">
        <span>Місячна фаза</span>
        <span className="text-[20px] leading-none font-semibold">{WeatherStore.moonPhase}</span>
      </div>
      <div className="flex items-center justify-between w-[232px] mt-3">
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/moonset.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Захід</span>
          <span className="text-xs">{WeatherStore.moonsetTime}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/moonrise.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Схід</span>
          <span className="text-xs">{WeatherStore.moonriseTime}</span>
        </div>
      </div>
    </div>
  );
});

const SunAndMoon = () => {
  return (
    <section className="sun-and-moon bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl ">
      <h2>Сонце та Місяць</h2>
      <div className="flex flex-col sm:flex-row justify-around gap-3">
        <Sun />
        <Moon />
      </div>
    </section>
  );
};

export { SunAndMoon };
