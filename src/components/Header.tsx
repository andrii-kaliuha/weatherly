import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SideMenu } from "./SideMenu";
import { useTranslation } from "react-i18next";
import { Icon } from "../shared/ui/Icons";
import settings from "../store/settings";
import requestStore from "../store/request/requestStore";

export const Header = observer(() => {
  const [cityName, setCity] = useState("");
  const { t } = useTranslation();

  const searchCityByName = (e: React.FormEvent) => {
    e.preventDefault();
    requestStore.fetchForecastByCityName(cityName, settings.settings);
    requestStore.hideStartScreen();
  };

  const searchCityByLocation = () => {
    requestStore.fetchForecastByLocation(settings.settings);
    requestStore.hideStartScreen();
  };

  return (
    <header className="sticky top-0 z-1 bg-background">
      <nav className="flex items-center justify-between gap-3 p-3">
        <button
          onClick={() => settings.toggleSideMenu()}
          aria-label={t("header.menu_button")}
          aria-expanded={settings.sideMenuOpen}
          aria-controls="side-menu"
          className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent bg-surface text-primary"
        >
          <Icon name="menu" height={24} width={24} />
        </button>

        <form
          role="search"
          aria-label={t("header.search_form")}
          className="group relative flex items-center bg-surface text-primary w-full sm:w-80 h-12 rounded-full border border-transparent transition-all focus-within:border-accent focus-within:ring-1 focus-within:ring-accent hover:bg-opacity-80"
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
            className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-none outline-none absolute
             right-1 top-1/2 -translate-y-1/2 bg-transparent"
          >
            <Icon name="search" height={24} width={24} color="var(--color-secondary)" />
          </button>
        </form>

        <button
          onClick={searchCityByLocation}
          aria-label={t("header.geolocation_button")}
          className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent text-on-accent bg-accent gap-3"
        >
          <Icon name="my-location" height={24} width={24} />
          <p className="hidden md:block">{t("header.geolocation_button")}</p>
        </button>
      </nav>
      <SideMenu id="side-menu" isOpen={settings.sideMenuOpen} onClose={() => settings.toggleSideMenu()} />
    </header>
  );
});
