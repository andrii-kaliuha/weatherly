import { CurrentWeather } from "./CurrentWeather";
import { AirQuality } from "./AirQuality";
import { Astronomy } from "./Astronomy";
import { WeeklyForecast } from "./WeeklyForecast";
import { HomePage, LoadingPage, ErrorPage } from "../../shared/ui/Srcreens";
import { observer } from "mobx-react-lite";
import requestStore from "../../store/request/requestStore";
import { weeklyForecastStore } from "../../store/forecast/weeklyForecastStore";

export const Main = observer(() => {
  const { startScreen, loading, error } = requestStore;
  const { weeklyForecast } = weeklyForecastStore;

  if (startScreen === true) return <HomePage />;
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage errorCode={error} />;

  return (
    <>
      <main className="mx-3 mb-3">
        <CurrentWeather />
        <Astronomy />
        <AirQuality />
        <WeeklyForecast weeklyForecastList={weeklyForecast} />
      </main>
    </>
  );
});
