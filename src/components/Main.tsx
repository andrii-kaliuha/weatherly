import { AQI } from "./AQI";
import { CurrentWeather } from "./CurrentWeather";
import { SunAndMoon } from "./SunAndMoon";
import { WeeklyForecast } from "./WeeklyForecast";
import ErrorStore from "../store/ErrorStore";
import { StartScreen } from "./StartScreen";
import { ErrorScreen } from "./ErrorScreen";
import request from "../store/request";
import { observer } from "mobx-react-lite";
import { LoadingScreen } from "./LoadingScreen";
import StartScreenStore from "../store/StartScreenStore";

const Main = observer(() => {
  const { isStartScreenVisible } = StartScreenStore;
  const { loading } = request;
  const { errors } = ErrorStore;

  if (isStartScreenVisible === true) return <StartScreen />;
  if (loading) return <LoadingScreen />;
  if (errors.length > 0) return <ErrorScreen />;

  return (
    <main className="mx-3 mb-3">
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
    </main>
  );
});

export { Main };
