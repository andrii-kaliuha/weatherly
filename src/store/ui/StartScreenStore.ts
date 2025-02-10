import { makeAutoObservable } from "mobx";

class StartScreenStore {
  isStartScreenVisible = true;

  constructor() {
    makeAutoObservable(this);
  }

  hideStartScreen() {
    this.isStartScreenVisible = false;
  }
}

export default new StartScreenStore();
