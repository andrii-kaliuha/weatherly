import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";
import type { SearchHistoryItem } from "../../services/storage/searchHistory";
import requestStore from "../../store/requestStore";

type SearchHistoryListProps = {
  history: SearchHistoryItem[];
  onDelete: (id: string) => void;
};

export const SearchHistoryList = ({ history, onDelete }: SearchHistoryListProps) => {
  const { t, i18n } = useTranslation();
  const getDisplayName = (item: SearchHistoryItem): string => item.local_names?.[i18n.language] ?? item.name;

  const handleSearch = (item: SearchHistoryItem) => {
    requestStore.fetchForecastByHistory(item);
    requestStore.hideStartScreen();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <ul className="flex flex-col">
      {history.map((item) => (
        <li
          key={item.id}
          className="group/item relative overflow-hidden flex items-center hover:bg-background text-primary transition-colors text-base font-medium last:rounded-b-2xl"
        >
          <button
            type="button"
            data-city-item
            className="w-full text-left truncate pl-6 pr-14 py-3 cursor-pointer focus-visible:outline-none focus-visible:bg-background"
            onClick={() => handleSearch(item)}
          >
            {getDisplayName(item)}
          </button>

          <button
            type="button"
            aria-label={t("search.remove_history_item")}
            className="absolute right-4 flex items-center justify-center p-1 rounded-full bg-transparent text-primary outline-none
            hover:bg-primary hover:text-on-accent focus-visible:bg-primary focus-visible:text-on-accent cursor-pointer"
            onClick={(e) => handleDelete(e, item.id)}
          >
            <Icon name="close" height={20} width={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};
