import { AirQualityIndex } from "../Main/AirQualityIndex";
import { CurrentWeather } from "../Main/CurrentWeather";
import { SunAndMoon } from "../Main/SunAndMoon";
import { WeeklyForecast } from "../Main/WeeklyForecast";
import ErrorStore from "../../store/ui/ErrorStore";
import { StartScreen } from "../UI/StartScreen";
import { ErrorScreen } from "../UI/ErrorScreen";
import request from "../../store/request/request";
import { observer } from "mobx-react-lite";
import { LoadingScreen } from "../UI/LoadingScreen";
import StartScreenStore from "../../store/ui/StartScreenStore";

const Main = observer(() => {
  const { isStartScreenVisible } = StartScreenStore;
  const { loading } = request;
  const { error } = ErrorStore;

  if (isStartScreenVisible === true) return <StartScreen />;
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <main className="mx-3 mb-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <CurrentWeather />
          <div className="flex flex-col gap-3 flex-1">
            <SunAndMoon />
            <AirQualityIndex />
          </div>
        </div>
        <WeeklyForecast />
      </div>
    </main>
  );
});

export { Main };
