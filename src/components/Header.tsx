import { useState } from "react";
import { observer } from "mobx-react-lite";
import { SideMenu } from "./SideMenu";
import rootStore from "../store/rootStore";
import request from "../store/request";
import { settingsProps } from "../store/forecast";

export const Header = observer(() => {
  const [cityName, setCity] = useState("Київ");

  const settings: settingsProps = {
    temperatureUnit: "celsius",
    windSpeedUnit: "m/s",
    pressureUnit: "mmHg",
    language: "uk",
    format: "24-hour format",
  };

  const searchCityByName = (e: React.FormEvent) => {
    e.preventDefault();
    request.fetchForecastByCityName(cityName, settings);
    rootStore.hideStartScreen();
  };

  const searchCityByLocation = () => {
    request.fetchForecastByLocation(settings);
    rootStore.hideStartScreen();
  };

  return (
    <header className="sticky top-0 z-10 bg-background max-w-[1024px]">
      <nav className="flex items-center justify-between p-3 gap-3">
        <Button onClick={() => rootStore.toggleSideMenu()} icon="menu" additionalClass="bg-surface text-on-surface" />
        <SideMenu />
        <form className="relative text-on-surface" onSubmit={searchCityByName}>
          <input
            type="text"
            placeholder="Search city..."
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface text-on-surface pl-3 rounded-[24px] w-full sm:w-64 h-[48px] outline-transparent border-transparent"
          />
          <Button icon="search" additionalClass="absolute right-0 top-0" />
        </form>
        <Button onClick={searchCityByLocation} icon="my_location" label="Current Location" additionalClass="bg-primary gap-3" />
      </nav>
    </header>
  );
});

type ButtonProps = {
  icon: string;
  label?: string;
  additionalClass?: string;
  onClick?: () => void;
};

const Button = ({ icon, label, additionalClass = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-3 rounded-full cursor-pointer border-transparent outline-transparent ${additionalClass}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    {label && <p className="md:block hidden">{label}</p>}
  </button>
);
