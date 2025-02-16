import { useState } from "react";
import { request } from "../store/request";
import { SideMenu } from "./SideMenu";
import { observer } from "mobx-react-lite";
import rootStore from "../store/rootStore";

const Header = observer(() => {
  const [cityName, setCity] = useState("Київ");

  const searchCity = (e: React.FormEvent) => {
    e.preventDefault();
    request.clearError();
    request.getCityCoordinates(cityName, "uk");
  };

  const hideStartScreen = () => {
    rootStore.hideStartScreen();
  };

  return (
    <header className="sticky top-0 z-10 bg-background max-w-[1024px]">
      <nav className="flex items-center justify-between p-3 gap-3">
        <Button onClick={() => rootStore.toggleSideMenu()} icon="menu" additionalClass="bg-surface text-on-surface" />

        <SideMenu />
        <form className="relative text-on-surface" onSubmit={searchCity}>
          <input
            type="text"
            placeholder="Search city..."
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface text-on-surface pl-3 rounded-[24px] w-full sm:w-64 h-[48px] outline-transparent border-transparent"
          />
          <Button onHide={hideStartScreen} icon="search" additionalClass="absolute right-0 top-0 bg-surface text-on-surface" />
        </form>
        <Button
          onHide={hideStartScreen}
          onClick={() => {
            request.clearError();
            request.getCurrentLocation();
          }}
          icon="my_location"
          label="Current Location"
          additionalClass="bg-primary gap-3"
        />
      </nav>
    </header>
  );
});

export { Header };

type ButtonProps = {
  icon: string;
  label?: string;
  additionalClass?: string;
  onClick?: () => void;
  onHide?: () => void;
};

const Button: React.FC<ButtonProps> = ({ icon, label, additionalClass = "", onClick, onHide }) => (
  <button
    onClick={() => {
      if (onClick) onClick();
      if (onHide) onHide();
    }}
    className={`flex items-center justify-center p-3 rounded-full cursor-pointer border-transparent outline-transparent ${additionalClass}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    {label && <p className="md:block hidden">{label}</p>}
  </button>
);
