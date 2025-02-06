import { observer } from "mobx-react-lite";
import { SettingItem } from "./SettingItem";
import { SettingsList } from "./SettingsList";
import SideMenuStore from "../../store/SideMenuStore";

const Settings = observer(() => {
  if (SideMenuStore.isSettingsItemVisible === true) return <SettingItem />;
  return <SettingsList />;
});

export { Settings };
