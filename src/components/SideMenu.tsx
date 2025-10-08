import { observer } from "mobx-react-lite";
import { Settings } from "./Settings";
import settings from "../store/settings";
import { Button } from "./ui";

export const SideMenu = observer(() => {
  return (
    <div
      className="fixed top-0 left-0 z-2 bg-background text-on-surface sm:w-80 w-full h-full"
      style={{ display: settings.sideMenuOpen ? "block" : "none" }}
    >
      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <svg width={32} height={32}>
            <use href="./src/assets/images/logo.svg"></use>
          </svg>
          <h1 className="text-xl font-medium leading-none">weatherly</h1>
        </div>
        <Button icon="close" onClick={() => settings.toggleSideMenu()} style="absolute right-3 hover:bg-surface" />
      </div>
      <Settings />
    </div>
  );
});
