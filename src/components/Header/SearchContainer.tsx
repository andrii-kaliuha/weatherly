import { observer } from "mobx-react-lite";
import { loadSearchHistory } from "../../shared/utils/storage/searchHistory";
import { CitySearchForm } from "./CitySearchForm";
import { SearchHistoryList } from "./SearchHistoryList";

export const SearchContainer = observer(() => {
  const history = loadSearchHistory();

  return (
    <div
      className="fixed left-6/12 -translate-x-6/12 top-0 w-80 bg-surface rounded-b-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] 
    z-50 flex flex-col"
    >
      <div className="p-3">
        <CitySearchForm color="var(--color-background)" />
      </div>

      <div className="h-1 bg-background" />

      {history.length > 0 && (
        <div className="flex flex-col">
          <SearchHistoryList history={history} />
        </div>
      )}
    </div>
  );
});
