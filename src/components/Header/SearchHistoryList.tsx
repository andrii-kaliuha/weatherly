import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";
import type { SearchHistoryItem } from "../../shared/utils/storage/searchHistory";

type SearchHistoryListProps = {
  history: SearchHistoryItem[];
};

export const SearchHistoryList = ({ history }: SearchHistoryListProps) => {
  const { t, i18n } = useTranslation();
  const getDisplayName = (item: SearchHistoryItem): string => item.local_names?.[i18n.language] ?? item.name;

  const handleSearch = () => console.log("search item");
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("delete item");
  };

  return (
    <ul className="flex flex-col">
      {history.map((item) => (
        <li
          key={item.id}
          className="group/item flex items-center justify-between pl-6 pr-3 py-2 hover:bg-background cursor-pointer
                 text-gray-900 transition-colors text-base font-medium last:rounded-b-2xl"
          onClick={handleSearch}
        >
          <span className="text-primary truncate pr-4">{getDisplayName(item)}</span>

          <button
            type="button"
            aria-label={t("search.remove_history_item", "Видалити")}
            className="flex items-center justify-center p-1 rounded-full bg-transparent text-primary hover:bg-primary
            hover:text-on-accent transition-all outline-none"
            onClick={handleDelete}
          >
            <Icon name="close" height={20} width={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};
