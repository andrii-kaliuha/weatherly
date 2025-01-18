const SunAndMoon = () => {
  const durationDay: string = "12:18:35";
  const sunriseTime: string = "06:41";
  const sunsetTime: string = "19:00";
  const moonPhase: string = "повна";
  const moonriseTime: string = "10:12";
  const moonsetTime: string = "22:03";

  return (
    <section className="sun-and-moon bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl flex-1">
      <h2 className="hidden">Сонце та Місяць</h2>
      <div className="flex gap-6">
        <div className="relative flex flex-col items-center mt-6">
          <img className="absolute -top-5" src="./src/assets/images/sun.svg" alt="" />
          <img src="./src/assets/images/sun-circle-eclipse.svg" alt="" />
          <div className="absolute bottom-0 flex flex-col items-center">
            <span>Тривалість дня</span>
            <span className="text-[20px] leading-none font-semibold">{durationDay}</span>
          </div>
          <div className="flex items-center justify-between w-[232px] mt-3">
            <Icon icon="./src/assets/images/sunrise.svg" status="Схід" time={sunriseTime} />
            <Icon icon="./src/assets/images/sunset.svg" status="Захід" time={sunsetTime} />
          </div>
        </div>
        <div className="relative flex flex-col items-center mt-6 ">
          <img className="absolute -top-5" src="./src/assets/images/moon.svg" alt="" />
          <img src="./src/assets/images/moon-circle-eclipse.svg" alt="" />
          <div className="absolute bottom-0 flex flex-col items-center">
            <span>Місячна фаза</span>
            <span className="text-[20px] leading-none font-semibold">{moonPhase}</span>
          </div>
          <div className="flex items-center justify-between w-[232px] mt-3">
            <Icon icon="./src/assets/images/moonset.svg" status="Захід" time={moonriseTime} />
            <Icon icon="./src/assets/images/moonrise.svg" status="Схід" time={moonsetTime} />
          </div>
        </div>
      </div>
    </section>
  );
};

type IconProps = {
  status: string;
  time: string;
  icon: string;
};

const Icon: React.FC<IconProps> = ({ status, time, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={icon} alt="" className="w-8 h-8" />
      <span className="text-sm">{status}</span>
      <span className="text-xs">{time}</span>
    </div>
  );
};

export { SunAndMoon };
