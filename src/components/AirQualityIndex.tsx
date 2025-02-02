import { observer } from "mobx-react-lite";
import AirQualityStore from "../store/AirQualityStore";

const AirQualityIndex = observer(() => {
  const { airPollutants } = AirQualityStore;

  return (
    <section className="relative bg-surface text-on-surface rounded-3xl p-6 flex-1">
      <h2 className="text-center sm:text-left leading-6">Якість повітря в {AirQualityStore.cityName}</h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 py-3">
        <div
          className="flex flex-col items-center justify-center border-4 rounded-full h-[90px] w-[90px] flex-shrink-0"
          style={{ borderColor: AirQualityStore.color || "inherit" }}
        >
          <div className="flex items-center leading-none gap-1" style={{ color: AirQualityStore.color || "inherit" }}>
            <span className="material-symbols-outlined">air</span>
            <b className="text-[24px]">{AirQualityStore.aqi}</b>
          </div>
          <div className="flex items-center leading-none gap-1">
            <p className="text-[16px]">AQI</p>
            <span className="text-[16px] material-symbols-outlined">info</span>
          </div>
        </div>
        <ul className="flex justify-around w-full">
          {airPollutants.map((item, index) => (
            <li key={index} className="flex flex-col items-center">
              <svg fill={AirQualityStore.color || "inherit"} width="24" height="24">
                <use href={`./src/assets/images/airPollutants.svg#${item.icon}`}></use>
              </svg>
              <p>{item.value}</p>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ color: AirQualityStore.color || "inherit" }}>{AirQualityStore.title}</h3>
        <p className="text-sm">{AirQualityStore.description}</p>
      </div>
    </section>
  );
});

export { AirQualityIndex };
