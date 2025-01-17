const HourlyForecast = () => {
  return (
    <section className="hourly-forecast-section flex-1">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Li />
        <Li />
        <Li />
        <Li />
      </ul>
    </section>
  );
};

export { HourlyForecast };

const Li = () => {
  return (
    <li className="bg-[#1d1c1f] p-6 text-[#dddae5] flex flex-col items-center justify-between h-[175px] rounded-3xl">
      <span className="today-hourly-weather__name">Вночі</span>
      <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="Weather Icon" className="h-16" />
      <span className="today-hourly-weather__temp">-2°</span>
    </li>
  );
};
