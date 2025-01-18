import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

// const CurrentWeather = observer(() => {
//   return (
//     <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 flex-1">
//       <h2 className="text-[14px] font-bold">
//         Now in {WeatherStore.city}, {WeatherStore.date}
//       </h2>
//       <div className="flex gap-3">
//         <div className="flex items-center">
//           <p className="text-[56px] leading-none">{WeatherStore.temperature}°</p>
//           <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
//         </div>
//         <ul>
//           <li>Тиск: {WeatherStore.pressure} мм</li>
//           <li>Вологість: {WeatherStore.humidity} %</li>
//           <li>Вітер: {WeatherStore.windSpeed} м/с</li>
//         </ul>
//       </div>
//       <p>Відчувається як {WeatherStore.feelsLike}°</p>
//       <p>{WeatherStore.summary}</p>
//     </section>
//   );
// });

export { CurrentWeather };

const CurrentWeather = observer(() => {
  return (
    <section className="current-weather-section bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6">
      <h2 className="text-[20px] font-bold">Погода в {WeatherStore.city} на сьогодні</h2>
      <p>
        Зараз в {WeatherStore.city} - {WeatherStore.date}
      </p>
      <div className="flex gap-3">
        <div className="flex items-center">
          <p className="text-[56px] leading-none">{WeatherStore.temperature}°</p>
          <img src={WeatherStore.icon} alt="Weather Icon" className="h-16" />
        </div>
        <ul className="hourly-forecast flex justify-between p-3">
          <Li />
          <Li />
          <Li />
          <Li />
        </ul>
      </div>
      <p>Відчувається як {WeatherStore.feelsLike}°</p>
      <p>{WeatherStore.summary}</p>
      <ul className="weather-condition flex justify-between w-full p-3 bg-[#ffffff1a] rounded-lg">
        {/* <li>Тиск: {WeatherStore.pressure} мм</li> опис картинки або опис погоди короткий
        <li>Вологість: {WeatherStore.humidity} %</li> має бути максимальна та мінімальна температура
        <li>Вітер: {WeatherStore.windSpeed} м/с</li>  відчувається як */}
        {data.map((item, index) => (
          <li key={index}>
            <span>{item.label}</span>
            <div>
              <span className={item.iconClassName}></span>
              <p className="flex items-end">{item.value}</p>{" "}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
});

const Li = () => {
  return (
    <li className="bg-[#1d1c1f] text-[#dddae5] flex flex-col items-center justify-between rounded-3xl">
      <span className="today-hourly-weather__name">Вночі</span>
      <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="Weather Icon" className="h-14" />
      <span className="today-hourly-weather__temp">-2°</span>
    </li>
  );
};

const data = [
  { label: "Pressure", value: "755 mm", iconClassName: "icon-meater" },
  { label: "Humidity", value: "91 %", iconClassName: "icon-dropp" },
  { label: "Wind", value: "4 m/s", iconClassName: "icon-wind" },
  { label: "UV-index", value: "0/12", iconClassName: "icon-uv" },
  { label: "Precipitation", value: "0.01 mm", iconClassName: "icon-rainfall" },
  { label: "Chance of precipitation", value: "75 %", iconClassName: "icon-rain-drops" },
];
