import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";
import type { SearchHistoryItem } from "../../shared/utils/storage/searchHistory";
import requestStore from "../../store/request/requestStore";
import settingsStore from "../../store/settingsStore";

type SearchHistoryListProps = {
  history: SearchHistoryItem[];
  onDelete: (id: string) => void;
};

export const SearchHistoryList = ({ history, onDelete }: SearchHistoryListProps) => {
  const { t, i18n } = useTranslation();
  const getDisplayName = (item: SearchHistoryItem): string => item.local_names?.[i18n.language] ?? item.name;

  const handleSearch = (item: SearchHistoryItem) => {
    requestStore.fetchForecastByHistory(item, settingsStore.settings);
    requestStore.hideStartScreen();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <ul className="flex flex-col">
      {history.map((item) => (
        <li
          key={item.id}
          className="group/item flex items-center justify-between pl-6 pr-3 py-2 hover:bg-background cursor-pointer
                 text-gray-900 transition-colors text-base font-medium last:rounded-b-2xl"
          onClick={() => handleSearch(item)}
        >
          <span className="text-primary truncate pr-4">{getDisplayName(item)}</span>

          <button
            type="button"
            aria-label={t("search.remove_history_item", "Видалити")}
            className="flex items-center justify-center p-1 rounded-full bg-transparent text-primary hover:bg-primary
            hover:text-on-accent transition-all outline-none"
            onClick={(e) => handleDelete(e, item.id)}
          >
            <Icon name="close" height={20} width={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};
