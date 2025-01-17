import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { AstronomyInfo } from "./components/AstronomyInfo";
import { AQI } from "./components/AQI";
import { WeeklyForecast } from "./components/WeeklyForecast";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <CurrentWeather />
        <div className="flex flex-col md:flex-row gap-3">
          <AstronomyInfo />
          <AQI />
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
