// import { RadioButton } from "./RadioButton";
import { observer } from "mobx-react-lite";
import SideMenuStore from "../../store/SideMenuStore";

const SettingItem = observer(() => {
  return (
    <div className="flex flex-col gap-3">
      <button onClick={() => SideMenuStore.toggleSettings()} className="flex items-center gap-3 hover:bg-surface px-6 py-3">
        <span className="material-symbols-outlined">chevron_left</span>
        {SideMenuStore.currentSettings?.title}
      </button>
      <Li />
    </div>
  );
});

export { SettingItem };

const Li = observer(() => {
  return (
    <div className="flex flex-col gap-3 px-6">
      {SideMenuStore.currentSettings?.options.map((item: string, index: number) => (
        <label key={index} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={SideMenuStore.currentSettings?.key}
            value={item}
            checked={SideMenuStore.currentSettings?.value === item}
            onChange={() => SideMenuStore.setValue(item)}
            className=""
          />
          <span>{item}</span>
        </label>
      ))}
    </div>
  );
});
