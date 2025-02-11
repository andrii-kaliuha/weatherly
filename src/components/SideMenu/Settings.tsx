import { observer } from "mobx-react-lite";
// import { SettingItem } from "./SettingItem";
import { SettingsList } from "./SettingsList";
import SettingStore from "../../store/main/SettingStore";

const Settings = observer(() => {
  // if (SettingStore.isSettingsItemVisible === true) return <SettingItem />;
  return <SettingsList />;
});

export { Settings };
