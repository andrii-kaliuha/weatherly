const CurrentWeather = () => {
  const cityName: string = "Тернопіль";
  const currentDate: string = "20 листопада, Середа";
  const currentTime: string = "16:31";
  const currentTemperature: number = 21;
  const weatherIcon: string = "icons/1.svg";
  const currentWeatherDescription: string = "Хмарно з проясненнями, невеликий дощ";

  return (
    <section className="bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6 max-w-max flex flex-col gap-3">
      <h2 className="text-xl font-bold">Зараз</h2>

      <div className="flex items-center gap-3">
        <b className="text-[64px] leading-none">{currentTemperature}°</b>
        <img src={weatherIcon} alt="Weather Icon" className="h-16" />
      </div>

      <p>{currentWeatherDescription}</p>

      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined">calendar_today</span>
        <p>
          <time dateTime="2024-09-09">{currentDate}</time>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined">location_on</span>
        <p>{cityName}</p>
      </div>

      <p className="flex items-center gap-2">
        Прогноз погоди оновлено в {currentTime}
        <span className="material-symbols-outlined transform scale-x-[-1]">update</span>
      </p>
    </section>
  );
};

export { CurrentWeather };
