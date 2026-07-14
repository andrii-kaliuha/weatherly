import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";
import requestStore from "../../store/request/requestStore";
import settings from "../../store/settings";

export const CitySearchForm = observer(() => {
  const [cityName, setCity] = useState("");
  const { t } = useTranslation();

  const searchCityByName = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestStore.loading === true || !cityName.trim()) return;
    requestStore.fetchForecastByCityName(cityName, settings.settings);
    requestStore.hideStartScreen();
  };

  return (
    <form
      role="search"
      aria-label={t("header.search_form")}
      className="group relative flex items-center bg-surface text-primary w-full sm:w-80 h-12 rounded-full border border-transparent focus-within:border-accent focus-within:ring-1 focus-within:ring-accent hover:bg-opacity-80"
      onSubmit={searchCityByName}
    >
      <input
        type="text"
        aria-label={t("header.search_placeholder")}
        placeholder={t("header.search_placeholder")}
        name="searchCity"
        value={cityName}
        onChange={(e) => setCity(e.target.value)}
        className="bg-transparent text-primary w-full h-full pl-6 pr-14 outline-none border-none"
        maxLength={32}
      />
      <button
        type="submit"
        tabIndex={-1}
        className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-none outline-none absolute right-1 top-1/2 -translate-y-1/2 bg-transparent"
      >
        <Icon name="search" height={24} width={24} color="var(--color-secondary)" />
      </button>
    </form>
  );
});
