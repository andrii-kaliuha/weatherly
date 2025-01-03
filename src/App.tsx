import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { AstronomyInfo } from "./components/AstronomyInfo";
import { AQI } from "./components/AQI";
import { DayInHistory } from "./components/DayInHistory";
import { WeeklyForecast } from "./components/WeeklyForecast";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <CurrentWeather />
        <AstronomyInfo />
        <AQI />
        <DayInHistory />
        <WeeklyForecast />
      </main>
    </>
  );
};

export default App;
