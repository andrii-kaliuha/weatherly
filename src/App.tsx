import "./App.css";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { TodaysHighlights } from "./components/TodaysHighlights";
import { WeeklyForecast } from "./components/WeeklyForecast";
import { AstronomyInfo } from "./components/AstronomyInfo";
import { GeographyInfo } from "./components/GeographyInfo";
import { DayInHistory } from "./components/DayInHistory";
import { AQI } from "./components/AQI";
import { AQIPopup } from "./components/AQIPopup";

const App = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <main>
          <CurrentWeather />
          <TodaysHighlights />
          <WeeklyForecast />
          <AstronomyInfo />
          <GeographyInfo />
          <DayInHistory />
          <AQI />
          <AQIPopup />
        </main>
      </div>
    </>
  );
};

export default App;
