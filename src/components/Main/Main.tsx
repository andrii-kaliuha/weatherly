import { CurrentWeather } from "./CurrentWeather";
import { AirQuality } from "./AirQuality";
import { Astronomy } from "./Astronomy";
import { WeeklyForecast } from "./WeeklyForecast";
import { StartScreen, LoadingScreen, ErrorScreen } from "../ui";
import { observer } from "mobx-react-lite";
import request from "../../store/request";
import { weeklyForecastStore } from "../../store/forecast";
import settings from "../../store/settings";

export const Main = observer(() => {
  const { startScreen, loading, error } = request;

  const { weeklyForecast } = weeklyForecastStore;

  if (startScreen === true) return <StartScreen />;
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <main className="mx-3 mb-3">
      <CurrentWeather />
      <Astronomy />
      <AirQuality />
      <WeeklyForecast theme={settings.settings.theme} weeklyForecastList={weeklyForecast} />
    </main>
  );
});
