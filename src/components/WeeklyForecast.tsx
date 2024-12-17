import { getCityData } from "./request";

const forecast = [
  { weatherIcon: "icons/1.svg", maxTemperature: 6, minTemperature: -5, date: "1 December", dayOfWeek: "Sunday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 8, minTemperature: -11, date: "2 December", dayOfWeek: "Monday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 5, minTemperature: 0, date: "3 December", dayOfWeek: "Tuesday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 0, minTemperature: 2, date: "4 December", dayOfWeek: "Wednesday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 2, minTemperature: -3, date: "5 December", dayOfWeek: "Thursday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 0, minTemperature: -4, date: "6 December", dayOfWeek: "Friday" },
  { weatherIcon: "icons/1.svg", maxTemperature: 3, minTemperature: 0, date: "7 December", dayOfWeek: "Saturday" },
];

// Викликаємо функцію для міста Київ
getCityData("Kyiv", "UA");

const WeeklyForecast = () => {
  return (
    <section className="weekly-forecast-section bg-[#1d1c1f] text-[#dddae5] p-6 rounded-3xl">
      <h2 className="text-xl font-bold mb-3">Weekly Forecast</h2>
      <ul className="flex flex-col gap-3">
        {forecast.map((item, index) => (
          <li key={index} className="flex justify-between items-center ">
            <div>
              <p>{item.dayOfWeek}</p>
              <p className="opacity-55">{item.date}</p>
            </div>
            <img src={item.weatherIcon} alt="Weather Icon" className="w-8 h-8" />
            <p className="text-[20px] w-8 text-center">{item.maxTemperature}°</p>
            <p className="text-[20px] w-8 text-center opacity-55">{item.minTemperature}°</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { WeeklyForecast };
