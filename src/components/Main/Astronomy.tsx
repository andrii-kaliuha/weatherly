import { observer } from "mobx-react-lite";
import { astronomyStore } from "../../store/forecast";
import { useTranslation } from "react-i18next";

export const Astronomy = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-surface text-on-surface p-6 rounded-3xl astronomy-section">
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
      <AstronomySVG style="absolute -top-5" width={40} height={40} icon="sun" />
      <AstronomySVG style="text-[#FCCF2E]" width={212} height={54} icon="ellipse" />

      <div className="absolute bottom-0 flex flex-col items-center">
        <span>{t("duration_day")}</span>
        <span className="leading-none text-[#FCCF2E]">{astronomyStore.durationDay}</span>
      </div>

      <div className="flex items-center justify-between w-[232px] mt-3">
        <AstronomyColumn icon="sunrise" label={t("sunrise")} value={astronomyStore.sunrise} />
        <AstronomyColumn icon="sunset" label={t("sunset")} value={astronomyStore.sunset} />
      </div>
    </div>
  );
});

const Moon = observer(() => {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col items-center mt-6 ">
      <AstronomySVG style="absolute -top-5" width={40} height={40} icon="moon" />
      <AstronomySVG style="text-[#A9B2CE]" width={212} height={54} icon="ellipse" />

      <div className="absolute bottom-0 flex flex-col items-center">
        <span>{t("moon_phase")}</span>
        <span className="text-sm text-center text-[#80afca] leading-none max-w-32">{astronomyStore.moonPhase}</span>
      </div>

      <div className="flex items-center justify-between w-[232px] mt-3">
        <AstronomyColumn icon="moonset" label={t("moonset")} value={astronomyStore.moonset} />
        <AstronomyColumn icon="moonrise" label={t("moonrise")} value={astronomyStore.moonrise} />
      </div>
    </div>
  );
});

const AstronomySVG = ({ style, width, height, icon }: { style?: string; width: number; height: number; icon: string }) => {
  return (
    <svg className={style} width={width} height={height}>
      <use href={`./src/assets/weather-icons/astronomy/${icon}.svg`}></use>
    </svg>
  );
};

const AstronomyColumn = ({ icon, label, value }: { icon: string; label: string; value: string | null }) => {
  return (
    <div className="flex flex-col items-center">
      <svg width={32} height={32}>
        <use href={`./src/assets/weather-icons/astronomy/${icon}.svg`}></use>
      </svg>
      <span className="text-sm">{label}</span>
      <span className="text-xs">{value}</span>
    </div>
  );
};
