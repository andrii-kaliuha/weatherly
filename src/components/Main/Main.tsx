import { CurrentWeather } from "./CurrentWeather";
import { AirQualityIndex } from "./AirQualityIndex";
import { Astronomy } from "./Astronomy";
import { WeeklyForecast } from "./WeeklyForecast";
import { StartScreen, LoadingScreen, ErrorScreen } from "../AppScreens";
import { observer } from "mobx-react-lite";
import { request } from "../../store/request";
import rootStore from "../../store/rootStore";

const Main = observer(() => {
  const { isStartScreenVisible } = rootStore;
  const { loading } = request;
  const { error } = request;

  if (isStartScreenVisible === true) return <StartScreen />;
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <main className="mx-3 mb-3">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-3">
          <CurrentWeather />
          <div className="flex flex-col gap-3 flex-1">
            <Astronomy />
            <AirQualityIndex />
          </div>
        </div>
        <WeeklyForecast />
      </div>
    </main>
  );
});

export { Main };
