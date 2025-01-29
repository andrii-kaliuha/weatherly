import { makeAutoObservable } from "mobx";

class ErrorStore {
  errors: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addError(message: string) {
    this.errors.push(message);
  }

  clearErrors() {
    this.errors = [];
  }
}

export default new ErrorStore();
