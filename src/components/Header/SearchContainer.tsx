import { useState, useRef, useEffect } from "react";
import { loadSearchHistory, removeFromSearchHistory } from "../../shared/utils/storage/searchHistory";
import { CitySearchForm } from "./CitySearchForm";
import { SearchHistoryList } from "./SearchHistoryList";
import { useTranslation } from "react-i18next";

type SearchContainerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchContainer = ({ isOpen, onClose }: SearchContainerProps) => {
  const [history, setHistory] = useState(() => loadSearchHistory());
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = (id: string) => setHistory(removeFromSearchHistory(id));

  useEffect(() => {
    if (isOpen) {
      const input = containerRef.current?.querySelector("input");
      input?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-2 bg-black/20" onClick={onClose} />

      <div
        ref={containerRef}
        onBlur={handleBlur}
        className="fixed sm:absolute top-0 left-0 sm:-top-3 sm:-left-3 w-full sm:w-80 bg-surface rounded-b-2xl z-3 flex flex-col outline-none"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      >
        <div className="p-3 border-b-2 border-background">
          <CitySearchForm />
        </div>

        {history.length > 0 ?
          <SearchHistoryList history={history} onDelete={handleDelete} />
        : <EmptyHistory />}
      </div>
    </>
  );
};

const EmptyHistory = () => {
  const { t } = useTranslation();

  return <div className="text-primary text-center h-12 flex items-center justify-center">{t("header.search.history_empty")}</div>;
};
