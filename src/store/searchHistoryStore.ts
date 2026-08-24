import { makeAutoObservable } from "mobx";
import { loadSearchHistory, saveToSearchHistory, removeFromSearchHistory, SearchHistoryItem } from "../services/storage/searchHistory";

class SearchHistoryStore {
  history: SearchHistoryItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.history = loadSearchHistory();
  }

  addHistoryItem(item: Omit<SearchHistoryItem, "id">) {
    this.history = saveToSearchHistory(item);
  }

  removeHistoryItem(id: string) {
    this.history = removeFromSearchHistory(id);
  }
}

export const searchHistoryStore = new SearchHistoryStore();
