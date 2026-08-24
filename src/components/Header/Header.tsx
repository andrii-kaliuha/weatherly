import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SideMenu } from "../SideMenu";
import { Icon } from "../../shared/ui/Icons";
import { FakeSearchInput } from "./FakeSearchInput";
import { GeolocationButton } from "./GeolocationButton";
import { SearchContainer } from "./SearchContainer";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleMenu = (state: boolean) => () => setIsMenuOpen(state);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-2 bg-background">
      <nav className="flex items-center justify-between gap-3 p-3">
        <button
          onClick={handleToggleMenu(true)}
          aria-label={t("header.open_menu")}
          aria-expanded={isMenuOpen}
          aria-controls="side-menu"
          className="flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent bg-surface text-primary
          focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2"
        >
          <Icon name="menu" height={24} width={24} />
        </button>

        <div className="relative w-full max-w-74">
          <FakeSearchInput onOpen={() => setIsOpen(true)} />
          <SearchContainer isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>

        <GeolocationButton />
      </nav>

      <SideMenu id="side-menu" isOpen={isMenuOpen} onClose={handleToggleMenu(false)} />
    </header>
  );
};
