import { useState } from "react";
import FocusLock from "react-focus-lock";
import { loadSearchHistory, removeFromSearchHistory } from "../../shared/utils/storage/searchHistory";
import { CitySearchForm } from "./CitySearchForm";
import { SearchHistoryList } from "./SearchHistoryList";

type SearchContainerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchContainer = ({ isOpen, onClose }: SearchContainerProps) => {
  const [history, setHistory] = useState(() => loadSearchHistory());
  const handleDelete = (id: string) => setHistory(removeFromSearchHistory(id));

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      <FocusLock returnFocus>
        <div
          className="absolute -top-3 -left-3  w-80 bg-surface rounded-b-2xl z-50 flex flex-col"
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <div className="p-3 border-b-2 border-background">
            <CitySearchForm />
          </div>

          {history.length > 0 ?
            <SearchHistoryList history={history} onDelete={handleDelete} />
          : <EmptyHistory></EmptyHistory>}
        </div>
      </FocusLock>
    </>
  );
};

const EmptyHistory = () => {
  return (
    <div className="text-primary text-center h-12 flex items-center justify-center">
      {/* <p>Ваша історія пошуку міст порожня</p> */}
      <p>Your city search history is empty</p>
    </div>
  );
};
