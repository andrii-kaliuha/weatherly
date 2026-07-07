import { Header } from "./components/Header.tsx";
import { Main } from "./components/Main/Main.tsx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import settingStore from "../src/store/settings.ts";
import requestStore from "./store/request/requestStore.ts";

export const App = observer(() => {
  useEffect(() => {
    settingStore.loadSettings();
  }, []);

  useEffect(() => {
    requestStore.initFastLocation();
    console.log("App.tsx: initFastLocation() called");
  }, []);

  return (
    <div className="max-w-5xl w-full">
      <Header />
      <Main />
    </div>
  );
});
