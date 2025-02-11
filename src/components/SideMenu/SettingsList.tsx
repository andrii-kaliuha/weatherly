import { observer } from "mobx-react-lite";
import SettingStore from "../../store/main/SettingStore";

const SettingsList = observer(() => {
  const { settingsList } = SettingStore;

  return (
    <ul>
      {settingsList.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            SettingStore.toggleSettings();
            // SettingStore.setCurrentSettings(item.key);
          }}
          className="flex items-center justify-between hover:bg-surface"
        >
          <button className="flex justify-between w-full items-center py-3 px-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              <div className="text-start text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{item.value}</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </li>
      ))}
    </ul>
  );
});

export { SettingsList };

// import { useState } from "react";
// import SettingStore from "../../store/main/SettingStore";
// const { settingsList } = SettingStore;

// const SettingsList = () => {
//   // Стан для контролю видимості меню та списку
//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const [currentItemKey, setCurrentItemKey] = useState<string | null>(null);

//   // Функція для обробки натискання на елемент списку
//   const handleItemClick = (itemKey: string) => {
//     setIsMenuVisible(true); // Показуємо меню
//     setCurrentItemKey(itemKey); // Зберігаємо ключ поточного налаштування
//   };

//   return (
//     <div>
//       {/* Список налаштувань */}
//       <ul>
//         {settingsList.map((item, index) => (
//           <li
//             key={index}
//             onClick={() => handleItemClick(item.key)} // Перемикаємо видимість при натисканні
//             className="flex items-center justify-between hover:bg-surface"
//           >
//             <button className="flex justify-between w-full items-center py-3 px-6">
//               <div className="flex items-center gap-3">
//                 <span className="material-symbols-outlined">{item.icon}</span>
//                 <div className="text-start text-sm">
//                   <p className="font-medium">{item.title}</p>
//                   <p className="text-gray-500 dark:text-gray-400">{item.value}</p>
//                 </div>
//               </div>
//               <span className="material-symbols-outlined">chevron_right</span>
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* Меню вибору опцій */}
//       {isMenuVisible && currentItemKey && (
//         <div className="menu">
//           {/* Ти можеш тут вставити своє меню, яке буде відображатись */}
//           <p>Меню для налаштування: {currentItemKey}</p>
//           {/* Наприклад, список опцій для поточного налаштування */}
//           <ul>
//             {settingsList
//               .find((item) => item.key === currentItemKey)
//               ?.options.map((option, index) => (
//                 <li key={index}>{option}</li>
//               ))}
//           </ul>
//           <button onClick={() => setIsMenuVisible(false)}>Закрити меню</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export { SettingsList };
