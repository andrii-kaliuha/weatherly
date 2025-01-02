const DayInHistory = () => {
  const day: string = "23 Вересня";
  const city: string = "Тернопіль";
  const maxTemperature: number = 29.4;
  const maxTemperatureDate: number = 2003;
  const minTemperature: number = 1.2;
  const minTemperatureDate: number = 1961;
  const highestRainfall: number = 22.8;
  const highestRainfallDate: number = 2002;
  const maxWindGusts: number = 17.14;
  const maxWindGustsDate: number = 2021;

  return (
    <section className="day-in-history-section relative bg-[#1d1c1f] text-[#dddae5] text-[14px] w-full max-w-full rounded-3xl p-6">
      <div className="flex justify-between pb-3">
        <div>
          <h3 className="font-bold text-[16px]">День в історії</h3>
          <p>{day}</p>
        </div>
        <img src="images/day-in-history.svg" alt="Іконка День в історії" className="h-12" />
      </div>
      <div className="border-t border-[#dddae5]/20"></div>
      <div className="flex flex-col gap-3 mt-3">
        <p>
          Максимальна температура повітря в місті {city} цього дня за останні 75 років спостережень становить {maxTemperature}°C, була
          зафіксована в {maxTemperatureDate} році.
        </p>
        <p>
          Абсолютний мінімум цього дня {minTemperature}°C був у {minTemperatureDate} році.
        </p>
        <p>
          Найсильніша кількість опадів ({highestRainfall} мм) в цей день в {city} була зафіксована в {highestRainfallDate} році.
        </p>
        <p>
          Максимальні пориви вітру становили до {maxWindGusts} м/с у {maxWindGustsDate} році.
        </p>
      </div>
    </section>
  );
};

export { DayInHistory };
