import { observer } from "mobx-react-lite";
import SideMenuStore from "../../store/SideMenuStore";

const AboutUs = observer(() => {
  const titles = ["About us", "User Agreement", "Legal information"];
  return (
    <ul
      className="absolute bottom-0 text-[14px] pb-6 "
      style={{
        display: SideMenuStore.isSettingsItemVisible ? "none" : "block",
      }}
    >
      {titles.map((title, index) => (
        <li key={index}>
          <a className="px-6">{title}</a>
        </li>
      ))}
    </ul>
  );
});

export { AboutUs };
