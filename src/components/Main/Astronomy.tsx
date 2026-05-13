import { observer } from "mobx-react-lite";
import { astronomyStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";
import { AstronomyDataItemProps, AstronomyIconProps } from "../../types";
import { SVG } from "../ui";

export const Astronomy = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-primary p-6 rounded-3xl astronomy-section">
      <h2 className="mb-3">{t("astronomy_section_title")}</h2>
      <div className="flex flex-col sm:flex-row justify-around gap-3">
        <Sun />
        <Moon />
      </div>
    </section>
  );
};

const Sun = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center mt-6">
      <AstronomyIcon style="absolute -top-5" width={40} height={40} icon="sun" />
      <AstronomyIcon style="text-sun" width={212} height={54} icon="ellipse" />

      <div className="flex items-end justify-between w-64 mt-3">
        <AstronomyDataItem icon="sunrise" label={t("sunrise")} value={astronomyStore.sunrise} />
        <dl className="text-center max-w-32">
          <dt>{t("duration_day")}</dt>
          <dd className="text-sm text-sun">{astronomyStore.durationDay}</dd>
        </dl>
        <AstronomyDataItem icon="sunset" label={t("sunset")} value={astronomyStore.sunset} />
      </div>
    </div>
  );
});

const Moon = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center mt-6">
      <AstronomyIcon style="absolute -top-5" width={40} height={40} icon="moon" />
      <AstronomyIcon style="text-moon" width={212} height={54} icon="ellipse" />

      <div className="flex items-end justify-between w-64 mt-3">
        <AstronomyDataItem icon="moonset" label={t("moonset")} value={astronomyStore.moonset} />
        <dl className="text-center max-w-32">
          <dt>{t("moon_phase")}</dt>
          <dd className="text-sm text-moon">{astronomyStore.moonPhase}</dd>
        </dl>
        <AstronomyDataItem icon="moonrise" label={t("moonrise")} value={astronomyStore.moonrise} />
      </div>
    </div>
  );
});

const AstronomyIcon = ({ style, width, height, icon }: AstronomyIconProps) => (
  <SVG source={`/weather-icons/astronomy/${icon}.svg`} width={width} height={height} style={style} />
);

const AstronomyDataItem = ({ icon, label, value }: AstronomyDataItemProps) => (
  <dl className="flex flex-col items-center">
    <AstronomyIcon icon={icon} width={32} height={32} />
    <dt className="text-sm text-center w-16">{label}</dt>
    <dd className="text-sm">{value}</dd>
  </dl>
);
