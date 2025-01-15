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
        <AstronomyInfo />
        <AQI />
        <WeeklyForecast />
      </main>
    </div>
  );
};

export default App;
