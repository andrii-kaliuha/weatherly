const CurrentWeather = () => {
  const cityName: string = "Тернопіль";
  const currentDate: string = "20 листопада, Середа";
  const currentTime: string = "16:31";
  const currentTemperature: number = 21;
  const feelsLike: number = 19;
  const weatherIcon: string = "icons/1.svg";
  const currentWeatherDescription: string = "Хмарно з проясненнями, невеликий дощ";
  const todayWeatherDescription: string =
    "Погода у Тернополі обіцяє бути хмарною, але вечірнє небо стане ясним. Залишаємо парасольки вдома. Опадів не передбачається. Варто готуватися до холодів.";

  return (
    <section className="max-w-[296px] current-weather-section bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6 flex flex-col ">
      <h2 className="text-xl font-bold">Погода {cityName}</h2>
      <span>{currentDate}</span>
      <span>Прогноз на найближчу годину</span>
      <div className="grid grid-cols-2 justify-center gap-2">
        <b className="text-[64px] leading-none">{currentTemperature}°</b>
        <img src={weatherIcon} alt="Weather Icon" className="h-16" />

        <p>Відчувається як {feelsLike}°</p>
        <p className="leading-none font-size-[14px]">{currentWeatherDescription}</p>
      </div>

      <p>{todayWeatherDescription}</p>
      {/* <p className="flex items-center gap-2">
        Прогноз погоди оновлено в {currentTime}
        <span className="material-symbols-outlined transform scale-x-[-1]">update</span>
      </p> */}
    </section>
  );
};

export { CurrentWeather };
