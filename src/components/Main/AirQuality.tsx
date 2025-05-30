import { observer } from "mobx-react-lite";
import { airQualityStore } from "../../store/forecast.ts";
import { useTranslation } from "react-i18next";
import { SVG } from "../ui.tsx";

export const AirQuality = observer(() => {
  const { airPollutants } = airQualityStore;
  const { t } = useTranslation();

  return (
    <section className="relative bg-surface text-on-surface rounded-3xl p-6 air-quality-section">
      <h2 className="leading-6">
        {t("air_quality_title")} {airQualityStore.cityName}
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 py-3">
        <div
          className="flex flex-col items-center justify-center border-4 rounded-full h-[90px] w-[90px] flex-shrink-0"
          style={{ borderColor: airQualityStore.color || "inherit" }}
        >
          <SVG name={"air"} size={32} color={airQualityStore.color || "inherit"} />
          <div className="flex items-center leading-none gap-1">
            <p>AQI</p>
            <strong style={{ color: airQualityStore.color || "inherit" }}>{airQualityStore.aqi}</strong>
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
