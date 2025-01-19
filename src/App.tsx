import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { SunAndMoon } from "./components/SunAndMoon";
import { AQI } from "./components/AQI";
import { WeeklyForecast } from "./components/WeeklyForecast";

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
