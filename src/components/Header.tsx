import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SideMenu } from "./SideMenu";
import { useTranslation } from "react-i18next";
import { Button } from "./ui";
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
        <Button onClick={() => settings.toggleSideMenu()} icon={"menu"} style="bg-surface text-on-surface" />
        <form className="relative text-on-surface" onSubmit={searchCityByName}>
          <input
            type="text"
            placeholder={t("search_city")}
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface text-on-surface w-full sm:w-64 h-12 pl-3 rounded-3xl outline-transparent border-transparent"
          />
          <Button icon="search" style="absolute right-0 top-0" />
        </form>
        <Button onClick={searchCityByLocation} icon="my-location" label={t("current_location")} style="bg-primary gap-3" />
      </nav>
      <SideMenu />
    </header>
  );
});
