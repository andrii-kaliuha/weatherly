const HISTORY_KEY = "weatherly_search_history";
const MAX_HISTORY = 5;

type LocalNames = Record<string, string>;

export type SearchHistoryItem = {
  id: string;
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
};

type SaveHistoryParams = {
  name: string;
  lat: number;
  lon: number;
  local_names?: LocalNames;
};

export function generateCityId(lat: number, lon: number): string {
  return `${lat.toFixed(2)}_${lon.toFixed(2)}`;
}

export function loadSearchHistory(): SearchHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveToSearchHistory({ name, lat, lon, local_names }: SaveHistoryParams): SearchHistoryItem[] {
  const history = loadSearchHistory();
  const id = generateCityId(lat, lon);

  const filtered = history.filter((item) => item.id !== id);
  const updated: SearchHistoryItem[] = [{ id, name, lat, lon, local_names }, ...filtered].slice(0, MAX_HISTORY);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  return updated;
}

export function removeFromSearchHistory(id: string): SearchHistoryItem[] {
  const updated = loadSearchHistory().filter((item) => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearSearchHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
