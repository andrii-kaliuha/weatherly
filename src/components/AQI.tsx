import { useEffect } from "react";
import AirQualityStore from "../store/AirQualityStore";

useEffect(() => {
  AirQualityStore.getAirQuality(49.9935, 36.2304);
}, []);

const AQI = () => {
  // const airQualityIndexData = [
  //   {
  //     city: "Харків",
  //     color: "#ffe601",
  //     aqi: 1,
  //     details: [{ pm2_5: 9, pm10: 11, so2: 2, no2: 13 }],
  //     airStatusTitle: "Задовільне повітря",
  //     airStatusDescription:
  //       "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.",
  //   },
  // ];

  type LiProps = {
    value: number;
    iconClassName: string;
    label: string;
  };

  const Li: React.FC<LiProps> = ({ value, iconClassName, label }) => {
    return (
      <li className="flex flex-col items-center">
        <span className={`${iconClassName} text-[${airQualityIndexData[0].color}]`}></span>
        <p>{value}</p>
        <span>{label}</span>
      </li>
    );
  };

  return (
    <section className="aqi__section relative bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6">
      <h2 className="text-center leading-6">Якість повітря в {airQualityIndexData[0].city}</h2>
      <div className="flex flex-col items-center gap-3 py-3">
        <div
          className="flex flex-col border-4 rounded-full h-[108px] w-[108px] items-center justify-center"
          style={{ borderColor: airQualityIndexData[0].color }}
        >
          <div className="flex items-center leading-none gap-1" style={{ color: airQualityIndexData[0].color }}>
            <span className="material-symbols-outlined">air</span>
            <b className="text-[24px]">{airQualityIndexData[0].aqi}</b>
          </div>
          <div className="flex items-center leading-none gap-1">
            <p className="text-[16px]">AQI</p>
            <span className="text-[16px] material-symbols-outlined">info</span>
          </div>
        </div>
        <ul className="flex justify-around w-full">
          <Li value={airQualityIndexData[0].details[0].pm2_5} iconClassName="icon-particles-simetrik" label="PM 2.5" />
          <Li value={airQualityIndexData[0].details[0].pm10} iconClassName="icon-particles" label="PM 10" />
          <Li value={airQualityIndexData[0].details[0].so2} iconClassName="icon-SO2" label="SO2" />
          <Li value={airQualityIndexData[0].details[0].no2} iconClassName="icon-NO2" label="NO2" />
        </ul>
      </div>
      <div>
        <h3 style={{ color: airQualityIndexData[0].color }}>{airQualityIndexData[0].airStatusTitle}</h3>
        <p className="text-sm">{airQualityIndexData[0].airStatusDescription}</p>
      </div>
    </section>
  );
};

export { AQI };

// #a2d043 #f8cc4a #f19342 #d85f38 #903c70
// const airQualityData = [
//   { iconClass: "icon-particles-simetrik", value: 9, label: "PM 2.5" },
//   { iconClass: "icon-particles", value: 11, label: "PM 10" },
//   { iconClass: "icon-SO2", value: 2, label: "SO2" },
//   { iconClass: "icon-NO2", value: 13, label: "NO2", color: "ffe601" },
// ];
