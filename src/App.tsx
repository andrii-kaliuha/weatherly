import "./App.css";
import { useState } from "react";
import { Header } from "./components/Header";
import { SideMenu } from "./components/SideMenu";
import { CurrentWeather } from "./components/CurrentWeather";
import { SunAndMoon } from "./components/SunAndMoon";
import { AQI } from "./components/AQI";
import { WeeklyForecast } from "./components/WeeklyForecast";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      className="wrapper"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (isMenuOpen && target && !target.closest(".side-menu")) {
          closeMenu();
        }
      }}
    >
      <Header toggleMenu={toggleMenu} />
      {isMenuOpen && <SideMenu />}
      <main>
        <div className="flex flex-col lg:flex-row gap-3">
          <CurrentWeather />
          <div className="flex flex-col gap-3 flex-1">
            <SunAndMoon />
            <AQI />
          </div>
        </div>
        <WeeklyForecast />
      </main>
    </div>
  );
};

export default App;
