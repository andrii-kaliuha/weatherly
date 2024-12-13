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

const AstronomyInfo = () => {
  const currentTime: string = "09:32";
  const durationDay: string = "12:18:35";
  const localTime: string = "UTC/GMT +2";
  const sunriseTime: string = "06:41";
  const sunsetTime: string = "19:00";
  const phaseMoon: string = "повна";
  const phaseMoonIcon: string = "🌓";

  return (
    <section className="astronomy-information-section flex flex-col items-center bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl w-[100%]">
      <span className="text-sm">Місцевий час {localTime}</span>
      <p className="text-4xl font-bold">{currentTime}</p>

      <div className="relative flex flex-col items-center mt-[30px]">
        <span className="icon-sun text-[#ffe601] text-[32px] absolute -top-5"></span>
        <img src="images/circle-eclipse.svg" alt="" />

        <div className="absolute bottom-0 flex flex-col items-center">
          <span>Тривалість дня</span>
          <span className="text-[20px] leading-none font-semibold">{durationDay}</span>
        </div>
      </div>

      <div className="flex items-center justify-between w-[100%] ">
        <Icon icon="images/sunrise.svg" status="Схід" time={sunriseTime} />
        <img src="images/earth.svg" alt="" />
        <Icon icon="images/sunset.svg" status="Захід" time={sunsetTime} />
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[32px]">{phaseMoonIcon}</span>
        <span className="text-sm">Фаза місяця</span>
        <span className="text-xs">{phaseMoon}</span>
      </div>
    </section>
  );
};

export { AstronomyInfo };
