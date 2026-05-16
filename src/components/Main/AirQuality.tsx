import { observer } from "mobx-react-lite";
import { airQualityStore } from "../../store/forecast.ts";
import { useTranslation } from "react-i18next";
import { Icon } from "../ui.tsx";
import { AirPollutantsListProps, CircleProps } from "../../types.ts";

export const AirQuality = observer(() => {
  const { cityName, color, aqi, airPollutants, title, description } = airQualityStore;
  const { t } = useTranslation();

  return (
    <section className="relative bg-surface text-primary rounded-3xl p-6 air-quality-section">
      <h2>
        {t("air_quality_section_title")} {cityName}
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-3 py-3">
        <Circle color={color} aqi={aqi} />
        <AirPollutantsList color={color} list={airPollutants} />
      </div>
      <div>
        <h3 style={{ color: color }}>{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </section>
  );
});

const Circle = ({ color, aqi }: CircleProps) => {
  return (
    <div className="flex flex-col items-center justify-center border-4 rounded-full h-24 w-24 flex-shrink-0" style={{ borderColor: color }}>
      <Icon name={"air"} color={color} width={32} height={32} />
      <div className="text-sm uppercase">
        AQI <span style={{ color: color }}>{aqi}</span>
      </div>
    </div>
  );
};

const AirPollutantsList = ({ color, list }: AirPollutantsListProps) => {
  const { t } = useTranslation();

  return (
    <ul className="flex justify-around w-full">
      {list.map((item, index) => (
        <li key={index} className="flex flex-col items-center leading-none gap-2">
          <span className="sr-only">{t("air_quality.pollutant", { name: item.name, value: item.value })}</span>

          <div aria-hidden="true" className="flex flex-col items-center gap-1">
            <Icon name={item.icon} color={color} width={20} height={20} />
            <span>{item.value}</span>
            <span className="text-xs opacity-70 uppercase">{item.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
