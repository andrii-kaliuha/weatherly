const AQI = () => {
  const airQualityData = [
    { iconClass: "icon-particles-simetrik", value: 9, label: "PM 2.5" },
    { iconClass: "icon-particles", value: 11, label: "PM 10" },
    { iconClass: "icon-SO2", value: 2, label: "SO2" },
    { iconClass: "icon-NO2", value: 13, label: "NO2" },
  ];

  return (
    <section className="AQI-section relative bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6">
      <h2 className="text-center leading-6">Якість повітря в Києві</h2>
      <div className="flex flex-col items-center gap-3 py-3">
        <div className="flex flex-col border-4 border-[#ffe601] rounded-full h-[108px] w-[108px] items-center justify-center">
          {/* text-[#ffe601] text-[#a2d043] */}
          <div className="flex text-[#ffe601] leading-none">
            <svg className="w-8 h-8">
              <use xlinkHref="icons/air-quality-index.svg#example-icon"></use>
            </svg>
            <b className="text-[32px]">1</b>
          </div>
          <div className="flex items-center leading-none gap-1">
            <p className="text-[16px]">AQI</p>
            <span className="text-[16px] material-symbols-outlined">info</span>
          </div>
        </div>
        <ul className="flex justify-around w-full">
          {airQualityData.map((item, index) => (
            <li key={index} className="flex flex-col items-center">
              <span className={`${item.iconClass} text-[#ffe601]`}></span>
              <p>{item.value}</p>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-[#ffe601]">Задовільне повітря</h3>
        <p className="text-sm">
          Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для
          здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.
        </p>
      </div>
    </section>
  );
};

export { AQI };
