const forecast = [
  { weatherIcon: "icons/1.svg", temperature: 6, date: "1 December", dayOfWeek: "Sunday" },
  { weatherIcon: "icons/1.svg", temperature: 8, date: "2 December", dayOfWeek: "Monday" },
  { weatherIcon: "icons/1.svg", temperature: 5, date: "3 December", dayOfWeek: "Tuesday" },
  { weatherIcon: "icons/1.svg", temperature: 0, date: "4 December", dayOfWeek: "Wednesday" },
  { weatherIcon: "icons/1.svg", temperature: 2, date: "5 December", dayOfWeek: "Thursday" },
  { weatherIcon: "icons/1.svg", temperature: 0, date: "6 December", dayOfWeek: "Friday" },
  { weatherIcon: "icons/1.svg", temperature: 3, date: "7 December", dayOfWeek: "Saturday" },
];

const WeeklyForecast = () => {
  return (
    <section className="bg-[#1d1c1f] text-[#dddae5] max-w-[388px] p-6 rounded-3xl">
      <h2 className="text-xl font-bold mb-6">Weekly Forecast</h2>
      <ul className="flex flex-col gap-6">
        {forecast.map((item, index) => (
          <li key={index} className="flex items-center text-right gap-4">
            <img src={item.weatherIcon} alt="Weather Icon" className="w-9 h-9" />
            <p className="text-lg flex-[1]">{item.temperature}°</p>
            <p className="flex-[5]">{item.date}</p>
            <p className="flex-[4]">{item.dayOfWeek}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WeeklyForecast };
