import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { AstronomyInfo } from "./components/AstronomyInfo";
import { AQI } from "./components/AQI";
import { DayInHistory } from "./components/DayInHistory";
import { WeeklyForecast } from "./components/WeeklyForecast";
import { AQIPopup } from "./components/AQIPopup";
import { WeatherForecast } from "./components/WeatherForecast";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <main>
        {/* <CurrentWeather /> */}
        <WeeklyForecast />
        <AstronomyInfo />
        <AQI />
      </main>
    </div>
  );
};

export default App;
