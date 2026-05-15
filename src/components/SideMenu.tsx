import { observer } from "mobx-react-lite";
import { Settings } from "./Settings";
import { Button } from "./ui";
import Logo from "../assets/logo.svg?react";
import ReactFocusLock from "react-focus-lock";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
          aria-label={t("header.side_menu_title")}
          className="fixed top-0 left-0 z-[200] bg-background text-primary sm:w-80 w-full h-screen shadow-xl border-r-2 border-surface"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-between p-6">
            <div className="flex items-center gap-3" aria-hidden={true}>
              <Logo />
              <h1 className="text-xl font-medium leading-none">weatherly</h1>
            </div>
            <Button icon="close" onClick={onClose} style="absolute right-3 hover:bg-surface" aria-label={t("header.close_menu_button")} />
          </div>

          <Settings />
        </aside>
      </ReactFocusLock>
    </div>
  );
});
