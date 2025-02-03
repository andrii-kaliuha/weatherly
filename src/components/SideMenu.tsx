import React, { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import SideMenuStore from "../store/SideMenuStore";

const SideMenu = observer(() => {
  return (
    <div
      className="fixed top-0 left-0 bg-background text-on-surface md:w-[30vw] p-6 h-full z-20 "
      style={{
        display: SideMenuStore.isSideMenuVisible ? "block" : "none",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <img src="./src/assets/images/logo.svg" alt="Weatherly logo" className="w-8 h-8" />
        <h1 className="text-[20px] font-bold leading-none">Weatherly</h1>
        <button className="flex" onClick={() => SideMenuStore.toggleSideMenu()}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex flex-col justify-between h-full pb-10">
        <div>
          <h2 className="text-[16px]">Your history</h2>
          <ul className="flex flex-col gap-3">
            <LiHistory />
            <LiHistory />
            <LiHistory />
            <LiHistory />
            <LiHistory />
          </ul>
        </div>

        {/* <ul className="flex flex-col gap-3">
        <LiSelect title="Language" options={["English", "Ukrainian"]} />
        <LiSelect title="Interface theme" options={["Dark", "Light"]} />
        <LiSelect title="Wind speed" options={["m/s", "km/h", "mph"]} />
      </ul> */}

        <ul className="text-[14px]">
          <li>About us</li>
          <li>User Agreement</li>
          <li>Legal information</li>
        </ul>
      </div>
    </div>
  );
});

export { SideMenu };

const LiHistory = () => {
  return (
    // <li className="flex flex-col gap-3 border-y-2 border-on-surface py-3">
    //   <div className="flex items-center gap-1">
    //     <span className="material-symbols-outlined">location_on</span>
    //     <p>Тернопіль</p>
    //   </div>
    //   <div className="flex items-center gap-3">
    //     <img width={32} src="./src/assets/icons/01d.svg" alt="" />
    //     {/* <p>чисте небо</p> */}
    //     <p className="ml-auto">1°</p>
    //   </div>
    // </li>
    <li className="flex items-center justify-between h-8">
      <p>Тернопіль</p>
      <div className="flex items-center gap-3">
        <img width={24} src="./src/assets/icons/01d.svg" alt="" />
        <p>1°</p>
      </div>
    </li>
  );
};

// interface SideMenuProps {
//   isMenuOpen: boolean;
//   toggleMenu: () => void;
// }

// const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         callback(); // Закриваємо меню, не відкриваючи
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref, callback]);
// };

// const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, toggleMenu }) => {
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Використовуємо хук для обробки кліків поза меню
//   useClickOutside(menuRef, () => {
//     if (isMenuOpen) {
//       toggleMenu(); // Закриваємо меню тільки якщо воно відкрите
//     }
//   });

//   return <Menu />;
// };

// ref={menuRef}
//   className={`fixed top-0 left-0 bg-background text-on-surface md:w-[30vw] p-6 h-full z-20 transition-transform duration-300 ${
//     isMenuOpen ? "translate-x-0" : "-translate-x-full"
//   }`}

interface LiSelectProps {
  title: string;
  options: string[];
}

const LiSelect: React.FC<LiSelectProps> = ({ title, options }) => {
  const handleSelectChange = (selected: string) => {
    console.log(`${title} selected:`, selected);
  };

  return (
    <li>
      <div className="flex justify-between items-center">
        <p className="text-[12px]">{title}</p>
        <CustomSelect options={options} onChange={handleSelectChange} />
      </div>
    </li>
  );
};

interface CustomSelectProps {
  options: string[];
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  // useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative w-32" ref={menuRef}>
      <div
        className="flex items-center justify-end border-transparent rounded-md p-3 text-on-surface text-[12px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption}
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </div>

      {isOpen && (
        <ul className="absolute bg-surface rounded-md w-full z-10" role="listbox" aria-activedescendant={selectedOption}>
          {options.map((option, index) => (
            <li
              key={index}
              className="p-3 text-on-surface text-[12px] cursor-pointer border-b-2 border-background last-of-type:border-none"
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option === selectedOption}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
