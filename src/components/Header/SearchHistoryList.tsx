import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";

type SearchHistoryItem = {
  city: { name: string; local_names: {}; lat: number; lon: number };
};

type SearchHistoryListProps = {
  history: SearchHistoryItem[];
};

export const SearchHistoryList = ({ history }: SearchHistoryListProps) => {
  const { t } = useTranslation();

  const handleSearch = () => {
    console.log("search item");
  };

  const handleDelete = () => {
    console.log("delete item");
  };

  return (
    <ul className="flex flex-col">
      {history.map((item) => (
        <li
          key={`${item.city.lat}-${item.city.lon}`}
          className="group/item flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 cursor-pointer
                 text-gray-900 transition-colors text-base font-medium"
          onClick={handleSearch}
        >
          <span className="truncate pr-4">{item.city.name}</span>

          <button
            type="button"
            aria-label={t("search.remove_history_item", "Видалити")}
            className="flex items-center justify-center p-1.5 rounded-full bg-transparent text-gray-300 hover:text-red-500
            hover:bg-gray-100 transition-all outline-none"
            onClick={handleDelete}
          >
            <Icon name="close" height={14} width={14} />
          </button>
        </li>
      ))}
    </ul>
  );
};
