const HourlyForecast = () => {
  return (
    <section className="hourly-forecast-section">
      <ul className="flex max-w-[648px gap-3">
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
    <li className="bg-[#1d1c1f] p-6 text-[#dddae5] h-[175px] max-w-[150px] w-full justify-between flex flex-col items-center rounded-3xl">
      <span className="today-hourly-weather__name">Вночі</span>
      <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="Weather Icon" className="h-16" />
      <span className="today-hourly-weather__temp">-2°</span>
    </li>
  );
};
