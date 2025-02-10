import AirQualityStore from "../../store/main/AirQualityStore.ts";

const AQIPopup = () => {
  const { airQualityLevels } = AirQualityStore;

  return (
    // <section className="fixed z-30 top-0 w-full md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bg-surface text-on-surface max-w-3xl md:rounded-3xl ">
    <section className="fixed inset-0 z-30 bg-surface text-on-surface max-w-3xl md:rounded-3xl ">
      <div className="flex justify-between p-6">
        <h2 className="text-lg leading-6">Які бувають рівні забруднення повітря?</h2>
        <span className="material-symbols-outlined cursor-pointer">close</span>
      </div>
      <div className="border-[2px] border-[#222]"></div>
      <ul className="flex flex-col gap-3 p-6 overflow-y-auto scroll-px-40 bg-surface">
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
              <h3 className="text-md font-semibold" style={{ color: item.color || "inherit" }}>
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
