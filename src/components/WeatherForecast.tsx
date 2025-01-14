const array = [
  {
    dayOfWeek: "Понеділок",
    date: "13 січня",
    tempMax: -2,
    tempMin: -6,
  },
  {
    dayOfWeek: "Вівторок",
    date: "14 січня",
    tempMax: -3,
    tempMin: -7,
  },
  {
    dayOfWeek: "Середа",
    date: "15 січня",
    tempMax: -1,
    tempMin: -4,
  },
  {
    dayOfWeek: "Четвер",
    date: "16 січня",
    tempMax: 0,
    tempMin: -3,
  },
  {
    dayOfWeek: "П'ятниця",
    date: "17 січня",
    tempMax: 1,
    tempMin: -2,
  },
  {
    dayOfWeek: "Субота",
    date: "18 січня",
    tempMax: 2,
    tempMin: -1,
  },
  {
    dayOfWeek: "Неділя",
    date: "19 січня",
    tempMax: 3,
    tempMin: 0,
  },
];

const WeatherForecast = () => {
  return (
    <section className="weather-forecast-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex flex-col ">
      <ul className="flex gap-3">
        {array.map((item, index) => (
          <li key={index} className="flex flex-col items-center p-3 bg-[#0000001a] rounded-lg ">
            <h6>{item.dayOfWeek}</h6>
            <p>{item.date}</p>
            <div className="flex">
              <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="Weather Icon" className="h-8" />
              <div className="flex flex-col items-center">
                <span className="">{item.tempMax}</span>
                <span className="">{item.tempMin}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WeatherForecast };
