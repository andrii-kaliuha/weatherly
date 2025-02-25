import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SideMenu } from "./SideMenu";
import request from "../store/request";
import { useTranslation } from "react-i18next";
import { Button } from "./ui";
import settings from "../store/settings";

export const Header = observer(() => {
  const [cityName, setCity] = useState("Київ");
  const { t } = useTranslation();

  const [sideMenu, openSideMenu] = useState(false);

  const toggleSideMenu = () => {
    openSideMenu(!sideMenu);
  };

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
    <header className="sticky top-0 z-10 bg-background max-w-[1024px]">
      <nav className="flex items-center justify-between p-3 gap-3">
        <Button onClick={() => toggleSideMenu()} icon={"menu"} additionalClass="bg-surface text-on-surface" />
        <SideMenu sideMenu={sideMenu} toggleSideMenu={toggleSideMenu} />
        <form className="relative text-on-surface" onSubmit={searchCityByName}>
          <input
            type="text"
            placeholder={t("search_city")}
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface text-on-surface pl-3 rounded-[24px] w-full sm:w-64 h-[48px] outline-transparent border-transparent"
          />
          <Button icon="search" additionalClass="absolute right-0 top-0" />
        </form>
        <Button onClick={searchCityByLocation} icon="my_location" label={t("current_location")} additionalClass="bg-primary gap-3" />
      </nav>
    </header>
  );
});
