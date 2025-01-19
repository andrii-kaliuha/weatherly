import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { AstronomyInfo } from "./components/AstronomyInfo";
import { AQI } from "./components/AQI";
import { WeeklyForecast } from "./components/WeeklyForecast";
import { SunAndMoon } from "./components/SunAndMoon";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="flex flex-col lg:flex-row gap-3">
          <CurrentWeather />
          <div className="flex flex-col gap-3">
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

// Add a start screen
// Add Error notification
// Add Sun and Moon section
// Transfer data from the weekly forecast to the storage
