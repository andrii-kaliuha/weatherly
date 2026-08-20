import { makeAutoObservable } from "mobx";
import { formatTime } from "../../shared/utils/converters";
import { AstronomyState } from "../../shared/types/store";
import requestStore from "../request/requestStore";
import settingsStore from "../settingsStore";

const getMoonPhase = (moonPhase: number | undefined): string => {
  if (moonPhase === undefined) return "astronomy.moon_phases.undefined";

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
  constructor() {
    makeAutoObservable(this);
  }

  get astronomy(): AstronomyState | null {
    const daily = requestStore.forecast?.daily?.[0];
    const timeFormat = settingsStore.settings.timeFormat;

    if (!daily) return null;

    return {
      sunrise: formatTime(daily.sunrise, timeFormat),
      sunset: formatTime(daily.sunset, timeFormat),
      moonrise: formatTime(daily.moonrise, timeFormat),
      moonset: formatTime(daily.moonset, timeFormat),
      moonPhase: getMoonPhase(daily.moon_phase),
      durationDay: new Date((daily.sunset - daily.sunrise) * 1000).toISOString().slice(11, 19),
    };
  }
}

export const astronomyStore = new AstronomyStore();
