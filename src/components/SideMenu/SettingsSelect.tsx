// import { observer } from "mobx-react-lite";
// import SideMenuStore from "../../store/SideMenuStore";

// const SettingsSelect = observer(() => {
//   const currentSettingKey = SideMenuStore.currentSettings;

//   if (!currentSettingKey) {
//     return null; // Якщо currentSettings є null, не відображаємо нічого
//   }

//   const currentSetting = SideMenuStore.settings[currentSettingKey];

//   return (
//     <div className="flex flex-col gap-3">
//       <button onClick={() => SideMenuStore.toggleSettings()} className="flex items-center gap-3 hover:bg-surface px-6 py-3">
//         <span className="material-symbols-outlined">chevron_left</span> Change {currentSetting.title}
//       </button>
//       <ul>
//         {currentSetting.options.map((option) => (
//           <li key={option}>
//             <RadioButton
//               checked={currentSetting.selected === option}
//               onChange={() => SideMenuStore.setSetting(currentSettingKey, option)}
//               label={option}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// });

// export { SettingsSelect };
