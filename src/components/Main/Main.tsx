import { CurrentWeather } from "./CurrentWeather";
import { AirQuality } from "./AirQuality";
import { Astronomy } from "./Astronomy";
import { WeeklyForecast } from "./WeeklyForecast";
import { HomePage, LoadingPage, ErrorPage } from "../../shared/ui/Srcreens";
import { observer } from "mobx-react-lite";
import requestStore from "../../store/requestStore";

export const Main = observer(() => {
  const { startScreen, loading, error } = requestStore;

  if (startScreen === true) return <HomePage />;
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorCode={error} />;

  return (
    <main className="weather-page mx-3 mb-3">
      <CurrentWeather />
      <Astronomy />
      <AirQuality />
      <WeeklyForecast />
    </main>
  );
});
