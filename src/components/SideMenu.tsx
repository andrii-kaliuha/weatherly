import { observer } from "mobx-react-lite";
import { Settings } from "./Settings";
import { Icon, SVG } from "../shared/ui/Icons";
import ReactFocusLock from "react-focus-lock";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonProps } from "../shared/types/common";

type SideMenuProps = { id: string; isOpen: boolean; onClose: () => void };

export const SideMenu = observer(({ id, isOpen, onClose }: SideMenuProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100]" onClick={onClose}>
      <ReactFocusLock disabled={!isOpen} returnFocus>
        <aside
          id={id}
          role="dialog"
          aria-modal={true}
          className="fixed top-0 left-0 z-[200] bg-background text-primary sm:w-80 w-full h-screen shadow-xl border-r-2 border-surface"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-between p-6">
            <div aria-hidden="true" className="flex items-center gap-3">
              <SVG source="./logo.svg" width={32} height={32} />
              <h1 className="text-xl font-medium leading-none">weatherly</h1>
            </div>
            <Button icon="close" onClick={onClose} style="absolute right-3 hover:bg-surface" aria-label={t("header.close_menu")} />
          </div>

          <Settings />
        </aside>
      </ReactFocusLock>
    </div>
  );
});

const Button = ({ icon, label, style = "", onClick }: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      aria-label={t("header.close_menu")}
      className={`flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent ${style}`}
    >
      <Icon name={icon} height={24} width={24} />
      {label && <p className="hidden md:block">{label}</p>}
    </button>
  );
};
