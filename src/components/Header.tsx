import { useState } from "react";
import WeatherRequest from "../store/request.ts";
import { SideMenu } from "./SideMenu.tsx";

const Header = () => {
  const [cityName, setCity] = useState("Київ");
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const searchCity = (e: React.FormEvent) => {
    e.preventDefault();
    WeatherRequest.getCityCoordinates(cityName);
  };

  return (
    <header className="sticky top-0 z-10 bg-background max-w-[1024px]">
      <nav className="flex items-center justify-between p-3 gap-3">
        <Button onClick={toggleMenu} icon="menu" additionalClass="bg-surface text-on-surface" />
        <SideMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <form className="relative text-on-surface" onSubmit={searchCity}>
          <input
            type="text"
            placeholder="Search city..."
            name="searchCity "
            value={cityName}
            onChange={(e) => setCity(e.target.value)}
            className="bg-surface text-on-surface pl-3 rounded-[24px] w-full sm:w-64 h-[48px] outline-transparent border-transparent"
          />
          <Button icon="search" additionalClass="absolute right-0 top-0 bg-surface text-on-surface" />
        </form>
        <Button onClick={WeatherRequest.getCurrentLocation} icon="my_location" label="Current Location" additionalClass="bg-primary gap-3" />
      </nav>
    </header>
  );
};

export { Header };

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon: string;
  label?: string;
  additionalClass?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, label, additionalClass = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-3 rounded-full cursor-pointer border-transparent outline-transparent ${additionalClass}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    {label && <p className="md:block hidden">{label}</p>}
  </button>
);
