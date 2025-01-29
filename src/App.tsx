import "./App.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { SunAndMoon } from "./components/SunAndMoon";
import { AQI } from "./components/AQI";
import { WeeklyForecast } from "./components/WeeklyForecast";
import { StartScreen } from "./components/StartScreen";
import { Error } from "./components/ErrorScreen.tsx";
import ErrorStore from "./store/ErrorStore";

const App = observer(() => {
  const [showStartScreen, setShowStartScreen] = useState(true);

  return (
    <div className="container">
      <Header onHideStartScreen={() => setShowStartScreen(false)} />
      <main>
        {ErrorStore.errors.length > 0 ? (
          <Error />
        ) : showStartScreen ? (
          <StartScreen />
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <CurrentWeather />
              <div className="flex flex-col gap-3 flex-1">
                <SunAndMoon />
                <AQI />
              </div>
            </div>
            <WeeklyForecast />
          </div>
        )}
      </main>
    </div>
  );
});

export default App;
