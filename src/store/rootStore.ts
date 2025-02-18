import { makeAutoObservable } from "mobx";
// import { astronomyStore, currentWeatherStore } from "./forecast";
// import i18n from "../i18n";

class rootStore {
  isStartScreenVisible = true;
  isSideMenuVisible = false;
  isSelectVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  hideStartScreen() {
    this.isStartScreenVisible = false;
  }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

  toggleSetting() {
    this.isSelectVisible = !this.isSelectVisible;
  }

  // changeLanguage(lang: string) {
  //   this.settings.language = lang;
  //   i18n.changeLanguage(lang.toLowerCase());
  // }

  // toggleTheme() {
  //   this.settings.interfaceTheme = this.settings.interfaceTheme === "light" ? "dark" : "light";
  //   document.documentElement.classList.toggle("dark", this.settings.interfaceTheme === "dark");
  // }
}

export default new rootStore();
