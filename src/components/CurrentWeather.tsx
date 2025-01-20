import { observer } from "mobx-react-lite";
import WeatherStore from "../store/WeatherStore";

const CurrentWeather = observer(() => {
  return (
    <section className=" bg-[#1d1c1f] text-[#dddae5] text-[14px] rounded-3xl p-6 lg:max-w-[296px] flex-shrink flex flex-col justify-between gap-3">
      <div>
        <h2 className="text-[16px]">Прогноз на найближчу годину</h2>
        <p>
          Погода {WeatherStore.city}, {WeatherStore.date}
        </p>
      </div>
      <div className="flex gap-3 justify-between">
        <div className="flex items-center">
          <p className="text-[56px] leading-none">{WeatherStore.temperature}&deg;</p>
          <img src={WeatherStore.icon} alt="" className="h-16" />
        </div>
        <ul className="text-right flex flex-col justify-center">
          <li>{WeatherStore.description}</li>
          <li>
            {WeatherStore.maxTempDay}&deg;/{WeatherStore.minTempDay}&deg;
          </li>
        </ul>
      </div>
      <p>{WeatherStore.summary}</p>
      <ul className="flex justify-between">
        <Li />
        <Li />
        <Li />
        <Li />
      </ul>
      <ul className="grid gap-3 grid-cols-3">
        {data.map((item, index) => (
          <li key={index} className="rounded-lg flex items-center flex-col">
            <span className={item.iconClassName}></span>
            <p className="flex items-end">{item.value}</p>
            <span className="text-[12px]">{item.label}</span>
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
      <img src="https://openweathermap.org/img/wn/04n@2x.png" alt="Weather Icon" className="h-12" />
      <span className="today-hourly-weather__temp">-2&deg;</span>
    </li>
  );
};

const data = [
  { label: "Pressure", value: "755 mm", iconClassName: "icon-meater" },
  { label: "Humidity", value: "91 %", iconClassName: "icon-dropp" },
  { label: "Wind", value: "4 m/s", iconClassName: "icon-wind" },
  { label: "UV index", value: "0/12", iconClassName: "icon-uv" },
  { label: "Precipitation", value: "0.01 mm", iconClassName: "icon-rainfall" },
  { label: "Feels like", value: "-3°", iconClassName: "icon-feels-like" },
];

export { CurrentWeather };
