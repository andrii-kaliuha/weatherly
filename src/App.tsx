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
import { SunAndMoonInfo } from "./components/SunAndMoon";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <CurrentWeather />
        <AstronomyInfo />
        <AQI />
        <AQIPopup />
        {/* <TodaysHighlights /> */}
        {/* <WeeklyForecast /> */}
        {/* <GeographyInfo />
          <DayInHistory />
          <SunAndMoonInfo /> */}
      </main>
    </>
  );
};

export default App;
