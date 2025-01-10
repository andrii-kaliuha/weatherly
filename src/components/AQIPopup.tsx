const AQIPopup = () => {
  const airQualityLevels = [
    {
      index: "0",
      range: "AQI 0-50",
      title: "Хороше повітря",
      description:
        "Повітря чисте, а забруднення становить невеликий ризик або взагалі не становить жодного ризику. Прийнятно для більшості людей.",
    },
    {
      index: "1",
      range: "AQI 51-100",
      title: "Задовільне повітря",
      description:
        "Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для здоров'я дуже невеликої кількості людей.",
    },
    {
      index: "2",
      range: "AQI 101-150",
      title: "Шкідливо для чутливих груп",
      description:
        "Забруднення повітря небезпечне для людей з підвищеною чутливістю. Скоротіть час перебування на вулиці, якщо відчуєте утруднене дихання.",
    },
    {
      index: "3",
      range: "AQI 151-200",
      title: "Нездорове повітря",
      description: "Члени чутливих груп можуть відчути значні наслідки для здоров'я. Скоротіть час перебування на свіжому повітрі.",
    },
    {
      index: "4",
      range: "AQI 201-300",
      title: "Погане повітря",
      description: "Кожен може почати відчувати наслідки для здоров'я. Рекомендується обмежити перебування на свіжому повітрі.",
    },
  ];

  return (
    <section className="relative bg-[#1d1c1f] text-[#dddae5] max-w-2xl rounded-3xl">
      <div className="flex justify-between p-6">
        <h2 className="text-lg leading-6">Які бувають рівні забруднення повітря?</h2>
        <span className="material-symbols-outlined cursor-pointer">close</span>
      </div>
      <div className="border-t border-gray-700"></div>
      <ul className="flex flex-col gap-4 p-6">
        {airQualityLevels.map((level, index) => (
          <li key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="images/air-quality-index.svg" alt={`Індекс якості повітря ${level.index}`} />
                <p className="text-3xl leading-none">{level.index}</p>
              </div>
              <span className="text-xs">{level.range}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#ffe601]">{level.title}</h3>
              <p className="text-xs leading-5">{level.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { AQIPopup };
