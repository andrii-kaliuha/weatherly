import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SideMenu } from "./SideMenu";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "./ui";
import request from "../store/request";
import settings from "../store/settings";

export const Header = observer(() => {
  const [cityName, setCity] = useState("");
  const { t } = useTranslation();

  const searchCityByName = (e: React.FormEvent) => {
    e.preventDefault();
    request.fetchForecastByCityName(cityName, settings.settings);
    request.hideStartScreen();
  };

  const searchCityByLocation = () => {
    request.fetchForecastByLocation(settings.settings);
    request.hideStartScreen();
  };

  return (
    <header className="sticky top-0 z-1 bg-background">
      <nav className="flex items-center justify-between gap-3 p-3">
        <Button onClick={() => settings.toggleSideMenu()} icon={"menu"} style="bg-surface text-primary" />
        {/* <form className="relative text-primary" onSubmit={searchCityByName}>
          <input
            type="text"
            placeholder={t("search_city")}
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            maxLength={32}
            className="bg-surface text-primary w-full sm:w-64 h-12 pl-3 pr-12 rounded-3xl outline-transparent border-transparent"
          />
          <Button icon="search" style="absolute right-0 top-0" />
        </form> */}
        <form
          className="group relative flex items-center bg-surface text-primary w-full sm:w-80 h-12 rounded-full border border-transparent transition-all focus-within:border-accent focus-within:ring-1 focus-within:ring-accent hover:bg-opacity-80"
          onSubmit={searchCityByName}
        >
          <input
            type="text"
            placeholder={t("search_city")}
            name="searchCity"
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent text-primary w-full h-full pl-6 pr-14 outline-none border-none"
            maxLength={32}
          />

          <button
            tabIndex={-1}
            className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-none outline-none absolute 
            right-1 top-1/2 -translate-y-1/2 bg-transparent"
          >
            <Icon name="search" height={24} width={24} color="var(--color-secondary)" />
          </button>
        </form>

        <Button onClick={searchCityByLocation} icon="my-location" label={t("current_location")} style="bg-accent gap-3" />
      </nav>
      <SideMenu />
    </header>
  );
});
