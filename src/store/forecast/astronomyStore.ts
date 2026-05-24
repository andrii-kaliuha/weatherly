import { makeAutoObservable } from "mobx";
import { formatTime } from "../../shared/utils/converters";
import { WeatherResponse } from "../../shared/types/api";
import { TimeFormat } from "../../shared/types/settings";
import { AstronomyState } from "../../shared/types/store";

const getMoonPhase = (moonPhase: number | null): string => {
  if (moonPhase === null) return "astronomy.moon_phases.undefined";

  switch (true) {
    case moonPhase <= 0.03:
      return "astronomy.moon_phases.new_moon";
    case moonPhase <= 0.24:
      return "astronomy.moon_phases.waxing_crescent";
    case moonPhase === 0.25:
      return "astronomy.moon_phases.first_quarter";
    case moonPhase <= 0.49:
      return "astronomy.moon_phases.waxing_gibbous";
    case moonPhase === 0.5:
      return "astronomy.moon_phases.full_moon";
    case moonPhase <= 0.74:
      return "astronomy.moon_phases.waning_gibbous";
    case moonPhase === 0.75:
      return "astronomy.moon_phases.last_quarter";
    case moonPhase <= 0.99:
      return "astronomy.moon_phases.waning_crescent";
    default:
      return "astronomy.moon_phases.unknown";
  }
};

class AstronomyStore {
  astronomy: AstronomyState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAstronomy(data: WeatherResponse, format: TimeFormat) {
    const daily = data?.daily?.[0];

    if (!daily) {
      this.astronomy = null;
      return;
    }

    this.astronomy = {
      sunrise: formatTime(daily.sunrise, format),
      sunset: formatTime(daily.sunset, format),
      moonrise: formatTime(daily.moonrise, format),
      moonset: formatTime(daily.moonset, format),
      moonPhase: getMoonPhase(daily.moon_phase),
      durationDay: new Date((daily.sunset - daily.sunrise) * 1000).toISOString().slice(11, 19),
    };
  }
}

export const astronomyStore = new AstronomyStore();
