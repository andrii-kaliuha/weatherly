// // import { RadioButton } from "./RadioButton";
// import { observer } from "mobx-react-lite";
// import SettingStore from "../../store/main/SettingStore";

// const SettingItem = observer(() => {
//   return (
//     <div className="flex flex-col gap-3">
//       <button onClick={() => SettingStore.toggleSettings()} className="flex items-center gap-3 hover:bg-surface px-6 py-3">
//         <span className="material-symbols-outlined">chevron_left</span>
//         {/* {SettingStore.currentSettings?.title} */} Back
//       </button>
//       <Li />
//     </div>
//   );
// });

// export { SettingItem };

// const Li = observer(() => {
//   return (
//     <div className="flex flex-col gap-3 px-6">
//       {SettingStore.currentSettings?.options.map((item: string, index: number) => (
//         <label key={index} className="flex items-center gap-3 cursor-pointer">
//           {/* <RadioButton item={SettingStore.currentSettings?.key} value={item} onChange={() => SettingStore.setValue(item)} /> */}
//           <input
//             type="radio"
//             name={SettingStore.currentSettings?.key}
//             value={item}
//             checked={SettingStore.currentSettings?.value === item}
//             onChange={() => SettingStore.setValue(item, SettingStore.currentSettings?.key)}
//             className=""
//           />
//           <span>{item}</span>
//         </label>
//       ))}
//     </div>
//   );
// });
