import AirQualityStore from "../store/AirQualityStore.ts";

const AQIPopup = () => {
  const { airQualityLevels } = AirQualityStore;

  return (
    <section className="fixed top-[10vh] bg-[#1d1c1f] text-[#dddae5] max-w-xl md:rounded-3xl border-gray-700 border-2">
      <div className="flex justify-between p-6">
        <h2 className="text-lg leading-6">Які бувають рівні забруднення повітря?</h2>
        <span className="material-symbols-outlined cursor-pointer">close</span>
      </div>
      <div className="border-t border-gray-700"></div>
      <ul className="flex flex-col gap-3 p-6">
        {airQualityLevels.map((item) => (
          <li key={item.id} className="flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1" style={{ color: item.color || "inherit" }}>
                <span className="material-symbols-outlined">air</span>
                <p className="text-[24px] leading-none">{item.id}</p>
              </div>
              <span className="text-xs">{item.range}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: item.color || "inherit" }}>
                {item.title}
              </h3>
              <p className="text-xs leading-5">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { AQIPopup };
