import { observer } from "mobx-react-lite";
import { airQualityStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";
import { SVG } from "../ui.tsx";

export const AirQualityIndex = observer(() => {
  const { airPollutants } = airQualityStore;
  const { t } = useTranslation();

  return (
    <section className="relative bg-surface text-on-surface rounded-3xl p-6 flex-1">
      <h2 className="text-center sm:text-left leading-6">
        {t("air_quality_title")} {airQualityStore.cityName}
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 py-3">
        <div
          className="flex flex-col items-center justify-center border-4 rounded-full h-[90px] w-[90px] flex-shrink-0"
          style={{ borderColor: airQualityStore.color || "inherit" }}
        >
          <div className="flex items-center leading-none gap-1" style={{ color: airQualityStore.color || "inherit" }}>
            <SVG name={"air"} size={20} />
            <b className="text-[24px]">{airQualityStore.aqi}</b>
          </div>
          <div className="flex items-center leading-none gap-1">
            <p className="text-[16px]">AQI</p>
            <SVG name={"info"} size={14} />
          </div>
        </div>
        <ul className="flex justify-around w-full">
          {airPollutants.map((item, index) => (
            <li key={index} className="flex flex-col items-center leading-none gap-2">
              <SVG name={item.icon} color={airQualityStore.color || "inherit"} size={20} />
              <p>{item.value}</p>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 style={{ color: airQualityStore.color || "inherit" }}>{airQualityStore.title}</h3>
        <p className="text-sm">{airQualityStore.description}</p>
      </div>
    </section>
  );
});
