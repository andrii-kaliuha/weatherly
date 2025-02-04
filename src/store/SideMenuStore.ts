import { makeAutoObservable } from "mobx";

class SideMenuStore {
  isSideMenuVisible = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }
}

export default new SideMenuStore();
