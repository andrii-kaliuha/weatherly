import { observer } from "mobx-react-lite";
import SunAndMoonStore from "../store/SunAndMoonStore";

const Sun = observer(() => {
  return (
    <div className="relative flex flex-col items-center mt-6">
      <img className="absolute -top-5" src="./src/assets/images/sun.svg" alt="" />
      <img src="./src/assets/images/sun-circle-eclipse.svg" alt="" />
      <div className="absolute bottom-0 flex flex-col items-center">
        <span>Тривалість дня</span>
        <span className="text-[20px] leading-none font-semibold">{SunAndMoonStore.durationDay}</span>
      </div>
      <div className="flex items-center justify-between w-[232px] mt-3">
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/sunrise.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Схід</span>
          <span className="text-xs">{SunAndMoonStore.sunrise}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/sunset.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Захід</span>
          <span className="text-xs">{SunAndMoonStore.sunset}</span>
        </div>
      </div>
    </div>
  );
});

const Moon = observer(() => {
  return (
    <div className="relative flex flex-col items-center mt-6 ">
      <img className="absolute -top-5" src="./src/assets/images/moon.svg" alt="" />
      <img src="./src/assets/images/moon-circle-eclipse.svg" alt="" />
      <div className="absolute bottom-0 flex flex-col items-center">
        <span>Місячна фаза</span>
        <span className="text-sm text-center text-[#80afca] leading-none max-w-32">{SunAndMoonStore.moonPhase}</span>
      </div>
      <div className="flex items-center justify-between w-[232px] mt-3">
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/moonset.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Захід</span>
          <span className="text-xs">{SunAndMoonStore.moonset}</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="./src/assets/images/moonrise.svg" alt="" className="w-8 h-8" />
          <span className="text-sm">Схід</span>
          <span className="text-xs">{SunAndMoonStore.moonrise}</span>
        </div>
      </div>
    </div>
  );
});

const SunAndMoon = () => {
  return (
    <section className="bg-surface text-on-surface p-6 rounded-3xl flex-1">
      <h2 className="mb-3">Сонце та Місяць</h2>
      <div className="flex flex-col sm:flex-row justify-around gap-3">
        <Sun />
        <Moon />
      </div>
    </section>
  );
};

export { SunAndMoon };
