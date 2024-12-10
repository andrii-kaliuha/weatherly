const weatherConditions = [
  {
    icon: "icon-feels-like",
    condition: "+20°C",
    description: "Температура",
  },
  {
    icon: "icon-feels-like",
    condition: "+20°C",
    description: "Відчувається як",
  },
  {
    icon: "icon-meater",
    condition: "730 mm",
    description: "Тиск",
  },
  {
    icon: "icon-wind",
    condition: "1 m/s",
    description: "Вітер",
  },
  {
    icon: "icon-rain-drops",
    condition: "68 %",
    description: "Імовірність опадів",
  },
  {
    icon: "icon-dropp",
    condition: "60 mm",
    description: "Опади",
  },
  {
    icon: "icon-dropp",
    condition: "60 mm",
    description: "Вологість",
  },
  // {
  //   icon: "icon-waves",
  //   condition: "60 mm",
  //   description: "УФ-індекс",
  // },
  {
    icon: "icon-rain-drops",
    condition: "68 %",
    description: "Видимість",
  },
];

const WeatherConditions = () => {
  return (
    <ul className="grid grid-cols-4 gap-3">
      {weatherConditions.map((item, index) => (
        <li key={index} className="bg-[#ffffff1a] rounded-md p-[10px] flex flex-col items-center w-[200px]">
          <span className={item.icon}></span>
          <p>{item.condition}</p>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

const TodaysHighlights = () => {
  return (
    <section className="today-highlights-section bg-[#1d1c1f] text-[#dddae5] w-max p-6 rounded-3xl">
      <WeatherConditions />
      <WeatherLineChart />
    </section>
  );
};

const WeatherLineChart = () => {
  return (
    <div className="flex">
      <ul className="w-10 bg-black"></ul>
      <div>
        <div className="h-10 w-10 bg-black"></div>
        <ul className="w-10 bg-black"></ul>
      </div>
    </div>
  );
};

export { TodaysHighlights };
