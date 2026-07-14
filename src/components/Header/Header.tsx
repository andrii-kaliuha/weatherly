import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SideMenu } from "../SideMenu";
import { Icon } from "../../shared/ui/Icons";
import { CitySearchForm } from "./CitySearchForm";
import { GeolocationButton } from "./GeolocationButton";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleMenu = (state: boolean) => () => setIsMenuOpen(state);

  return (
    <header className="sticky top-0 z-1 bg-background">
      <nav className="flex items-center justify-between gap-3 p-3">
        <button
          onClick={handleToggleMenu(true)}
          aria-label={t("header.open_menu")}
          aria-expanded={isMenuOpen}
          aria-controls="side-menu"
          className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent bg-surface text-primary"
        >
          <Icon name="menu" height={24} width={24} />
        </button>

        <CitySearchForm />
        <GeolocationButton />
      </nav>

      <SideMenu id="side-menu" isOpen={isMenuOpen} onClose={handleToggleMenu(false)} />
    </header>
  );
};
