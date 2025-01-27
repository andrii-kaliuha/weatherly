import React, { useRef, useEffect } from "react";

interface SideMenuProps {
  isMenuOpen: boolean; // Проп для контролю видимості меню
  toggleMenu: () => void; // Функція для відкриття/закриття меню
}

const SideMenu: React.FC<SideMenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu(); // Закриваємо меню
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 bg-surface text-on-surface w-[30vw] p-6 h-[100%] z-20 border-r-2 border-cyan-700 ${
        isMenuOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center leading-none gap-3 mb-6">
        <h1 className="text-[20px] font-bold">Weatherly</h1>
        <img src="./src/assets/images/logo.svg" alt="" className="w-8 h-8" />
      </div>

      <div className="flex flex-col justify-between h-full pb-10">
        <ul className="space-y-5">
          <LiSelect icon="language" title="Language" options={["English", "Ukrainian"]} />
          <LiSelect icon="dark_mode" title="Interface theme" options={["Dark", "Light"]} />
          <LiSelect icon="air" title="Wind" options={["m/s", "km/h", "mph"]} />
        </ul>

        <ul className="text-[14px]">
          <li>About us</li>
          <li>User Agreement</li>
          <li>Legal information</li>
        </ul>
      </div>
    </div>
  );
};

export { SideMenu };

interface LiSelectProps {
  icon: string;
  title: string;
  options: string[];
}

const LiSelect: React.FC<LiSelectProps> = ({ icon, title, options }) => {
  return (
    <li className="flex flex-col">
      <p className="text-[12px] mb-1">{title}</p>
      <div className="flex items-center">
        <span className="material-symbols-outlined mr-2">{icon}</span>
        <select className="bg-transparent border border-on-surface rounded-md p-1 text-on-surface text-[12px] focus:outline-none focus:ring-1 focus:ring-cyan-700">
          {options.map((option, index) => (
            <option key={index} value={option} className="bg-surface text-on-surface">
              {option}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
};
