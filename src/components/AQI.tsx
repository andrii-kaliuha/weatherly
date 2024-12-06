const AQI = () => {
  return (
    <section className="AQI-section relative bg-[#1d1c1f] text-[#dddae5] w-96 rounded-3xl p-6">
      <h2 className="text-center leading-6">Якість повітря в Києві</h2>
      <div className="flex flex-col items-center gap-2.5 py-2.5">
        <div className="flex flex-col items-center justify-center border-4 border-[#ffe601] rounded-full h-28 w-28">
          <div className="flex items-center justify-center gap-1">
            <img src="images/air-quality-index.svg" alt="Індекс якості повітря" />
            <b className="text-[#ffe601] text-3xl leading-none">1</b>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-lg">AQI</p>
            <span className="h-4 cursor-pointer"></span>
          </div>
        </div>
        <ul className="flex gap-7 mt-4">
          <li className="flex flex-col items-center gap-1.5">
            <span className="icon-particles-simetrik text-[#ffe601] text-lg"></span>
            <p className="text-lg">9</p>
            <span className="text-sm leading-none">PM 2.5</span>
          </li>
          <li className="flex flex-col items-center gap-1.5">
            <span className="icon-particles text-[#ffe601] text-lg"></span>
            <p className="text-lg">11</p>
            <span className="text-sm leading-none">PM 10</span>
          </li>
          <li className="flex flex-col items-center gap-1.5">
            <span className="icon-SO2 text-[#ffe601] text-lg"></span>
            <p className="text-lg">2</p>
            <span className="text-sm leading-none">SO2</span>
          </li>
          <li className="flex flex-col items-center gap-1.5">
            <span className="icon-NO2 text-[#ffe601] text-lg"></span>
            <p className="text-lg">13</p>
            <span className="text-sm leading-none">NO2</span>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-[#ffe601] text-base leading-5 pb-1">Задовільне повітря</h3>
        <p className="text-sm leading-5">
          Якість повітря в цілому є прийнятною для більшості людей, проте деякі забруднювальні речовини можуть становити помірну загрозу для
          здоров'я дуже невеликої кількості людей, які надзвичайно чутливі до забруднення повітря.
        </p>
        <br />
        <p className="text-sm leading-5">
          Концентрація PM 2.5 в Тернополі наразі в 1.8 разів вища за рекомендоване ВООЗ середньорічне значення якості повітря.
        </p>
      </div>
    </section>
  );
};

export { AQI };
