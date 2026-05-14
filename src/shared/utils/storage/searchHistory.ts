const HISTORY_KEY = "weatherly_search_history";
const MAX_HISTORY = 5;

interface SearchHistoryItem {
  city: string;
  lat: number;
  lon: number;
  timestamp: number;
}

export function saveToSearchHistory(city: string, lat: number, lon: number): void {
  const history = loadSearchHistory();

  // Видаляємо дублікат якщо є
  const filtered = history.filter((item) => item.city.toLowerCase() !== city.toLowerCase());

  // Додаємо новий запис на початок
  const updated = [{ city, lat, lon, timestamp: Date.now() }, ...filtered].slice(0, MAX_HISTORY);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
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

export function clearSearchHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
