import { makeAutoObservable } from "mobx";

class ErrorStore {
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addError(message: string) {
    this.error = message;
  }

  clearError() {
    this.error = null;
  }
}

export default new ErrorStore();
