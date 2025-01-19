import { observer } from "mobx-react-lite";
import AirQualityStore from "../store/AirQualityStore";

// const AQI = observer(() => {
//   const { airPollutants } = AirQualityStore;

//   return (
//     <section className="relative bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6">
//       <h2 className="text-center leading-6">Якість повітря в {AirQualityStore.city}</h2>
//       <div className="flex flex-col items-center gap-3 py-3">
//         <div
//           className="flex flex-col items-center justify-center border-4 rounded-full h-[108px] w-[108px]"
//           style={{ borderColor: AirQualityStore.color || "inherit" }}
//         >
//           <div className="flex items-center leading-none gap-1" style={{ color: AirQualityStore.color || "inherit" }}>
//             <span className="material-symbols-outlined">air</span>
//             <b className="text-[24px]">{AirQualityStore.aqi}</b>
//           </div>
//           <div className="flex items-center leading-none gap-1">
//             <p className="text-[16px]">AQI</p>
//             <span className="text-[16px] material-symbols-outlined">info</span>
//           </div>
//         </div>
//         <ul className="flex justify-around w-full">
//           {airPollutants && airPollutants.length > 0 ? (
//             airPollutants.map((item, index) => (
//               <li key={index} className="flex flex-col items-center">
//                 <span className={item.iconClassName} style={{ color: AirQualityStore.color || "inherit" }}></span>
//                 <p>{item.value}</p>
//                 <span>{item.label}</span>
//               </li>
//             ))
//           ) : (
//             <p>Немає даних про забруднювачі</p>
//           )}
//         </ul>
//       </div>
//       <div>
//         <h3 style={{ color: AirQualityStore.color || "inherit" }}>{AirQualityStore.title}</h3>
//         <p className="text-sm">{AirQualityStore.description}</p>
//       </div>
//     </section>
//   );
// });

export { AQI };

const AQI = observer(() => {
  return (
    <section className="relative bg-[#1d1c1f] text-[#dddae5] rounded-3xl p-6 flex-1">
      <h2 className="text-center sm:text-left">Якість повітря</h2>
      <div className="flex justify-between gap-6 items-center">
        <DIvPOP />
        <ULPOP />
        <div className="max-w-[330px]">
          <h3 style={{ color: AirQualityStore.color || "inherit" }}>{AirQualityStore.title}</h3>
          <p className="text-sm">{AirQualityStore.description}</p>
        </div>
      </div>
    </section>
  );
});

const ULPOP = () => {
  const { airPollutants } = AirQualityStore;
  return (
    <ul className="grid grid-cols-2 gap-3 max-w-[108px] max-h-[108px]">
      {airPollutants && airPollutants.length > 0 ? (
        airPollutants.map((item, index) => (
          <li key={index}>
            <span className="text-[14px]">{item.label}</span>
            <div className="flex items-center gap-3">
              <span className={item.iconClassName} style={{ color: AirQualityStore.color || "inherit" }}></span>
              <p>{item.value}</p>
            </div>
          </li>
        ))
      ) : (
        <p>Немає даних про забруднювачі</p>
      )}
    </ul>
  );
};

const DIvPOP = () => {
  return (
    <div
      className="flex flex-col items-center justify-center border-4 rounded-full h-[108px] w-[108px]"
      style={{ borderColor: AirQualityStore.color || "inherit" }}
    >
      <div className="flex items-center leading-none gap-1" style={{ color: AirQualityStore.color || "inherit" }}>
        <span className="material-symbols-outlined">air</span>
        <b className="text-[24px]">{AirQualityStore.aqi}</b>
      </div>
      <div className="flex items-center leading-none gap-1">
        <p className="text-[16px]">AQI</p>
        <span className="text-[16px] material-symbols-outlined">info</span>
      </div>
    </div>
  );
};
