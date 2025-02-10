import { makeAutoObservable } from "mobx";

class SunAndMoonStore {
  durationDay: string | null = null;
  sunrise: string | null = null;
  sunset: string | null = null;
  moonPhase: string | null = null;
  moonrise: string | null = null;
  moonset: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateSunAndMoon(data: any) {
    function getMoonPhase(moonPhase: number | null): string {
      if (moonPhase === null) {
        return "Фаза Місяця не визначена";
      }

      const moonPhases = [
        { phase: "Новий Місяць", range: [0, 0.03] },
        { phase: "Зростаючий Місяць", range: [0.04, 0.24] },
        { phase: "Перша чверть", range: [0.25, 0.25] },
        { phase: "Зростаючий опуклий", range: [0.26, 0.49] },
        { phase: "Повний Місяць", range: [0.5, 0.5] },
        { phase: "Спадаючий опуклий", range: [0.51, 0.74] },
        { phase: "Остання чверть", range: [0.75, 0.75] },
        { phase: "Спадаючий серп", range: [0.76, 0.99] },
      ];

      for (const { phase, range } of moonPhases) {
        const [min, max] = range;
        if (moonPhase >= min && moonPhase <= max) {
          return phase;
        }
      }

      return "Невідома фаза Місяця";
    }

    function formatTime(timestamp: number) {
      return new Date(timestamp * 1000).toLocaleTimeString("uk-UA", {
        hour: "numeric",
        minute: "numeric",
      });
    }

    function calculateDuration(start: number, end: number) {
      const durationInSeconds = end - start;
      return new Date(durationInSeconds * 1000).toISOString().slice(11, 19);
    }

    this.sunrise = formatTime(data.daily[0].sunrise);
    this.sunset = formatTime(data.daily[0].sunset);
    this.moonrise = formatTime(data.daily[0].moonrise);
    this.moonset = formatTime(data.daily[0].moonset);
    this.moonPhase = getMoonPhase(data.daily[0].moon_phase);
    this.durationDay = calculateDuration(data.daily[0].sunrise, data.daily[0].sunset);
  }
}

export default new SunAndMoonStore();
