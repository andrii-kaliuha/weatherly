import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";
import requestStore from "../../store/request/requestStore";
import settingsStore from "../../store/settingsStore";

export const GeolocationButton = observer(() => {
  const { t } = useTranslation();

  const searchCityByLocation = () => {
    if (requestStore.loading === true) return;
    requestStore.fetchForecastByLocation(settingsStore.settings);
    requestStore.hideStartScreen();
  };

  return (
    <button
      onClick={searchCityByLocation}
      aria-label={t("header.geolocation_button")}
      className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent text-on-accent bg-accent gap-3"
    >
      <Icon name="my-location" height={24} width={24} />
      <p className="hidden md:block">{t("header.current_location")}</p>
    </button>
  );
});
