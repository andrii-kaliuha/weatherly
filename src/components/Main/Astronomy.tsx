import { observer } from "mobx-react-lite";
import { astronomyStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";
import { AstronomyDataItemProps, AstronomyIconProps } from "../../types";
import { SVG } from "../ui";
import { AstronomyState } from "../../shared/types/store";

const astronomyFallback: AstronomyState = {
  durationDay: "--:--",
  sunrise: "--:--",
  sunset: "--:--",
  moonPhase: "astronomy.moon_phases.undefined",
  moonrise: "--:--",
  moonset: "--:--",
};

export const Astronomy = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-primary p-6 rounded-3xl astronomy-section">
      <h2 className="mb-3">{t("astronomy.title")}</h2>
      <div className="flex flex-col sm:flex-row justify-around gap-3">
        <Sun />
        <Moon />
      </div>
    </section>
  );
};

const Sun = observer(() => {
  const { t } = useTranslation();
  const { sunrise, sunset, durationDay } = astronomyStore.astronomy || astronomyFallback;

  return (
    <div className="relative flex flex-col items-center mt-6">
      <AstronomyIcon style="absolute -top-5" width={40} height={40} icon="sun" />
      <AstronomyIcon style="text-sun" width={212} height={54} icon="ellipse" />

      <div className="flex items-end justify-between w-64 mt-3">
        <AstronomyDataItem icon="sunrise" label={t("astronomy.sunrise")} value={sunrise} />
        <dl className="text-center max-w-32">
          <dt>{t("astronomy.duration_day")}</dt>
          <dd className="text-sm text-sun">{durationDay}</dd>
        </dl>
        <AstronomyDataItem icon="sunset" label={t("astronomy.sunset")} value={sunset} />
      </div>
    </div>
  );
});

const Moon = observer(() => {
  const { t } = useTranslation();
  const { moonset, moonrise, moonPhase } = astronomyStore.astronomy || astronomyFallback;

  return (
    <div className="relative flex flex-col items-center mt-6">
      <AstronomyIcon style="absolute -top-5" width={40} height={40} icon="moon" />
      <AstronomyIcon style="text-moon" width={212} height={54} icon="ellipse" />

      <div className="flex items-end justify-between w-64 mt-3">
        <AstronomyDataItem icon="moonset" label={t("astronomy.moonset")} value={moonset} />
        <dl className="text-center max-w-32">
          <dt>{t("astronomy.moon_phase")}</dt>
          <dd className="text-sm text-moon">{t(moonPhase)}</dd>
        </dl>
        <AstronomyDataItem icon="moonrise" label={t("astronomy.moonrise")} value={moonrise} />
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
