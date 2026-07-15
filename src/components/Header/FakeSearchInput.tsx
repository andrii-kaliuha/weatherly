import { useTranslation } from "react-i18next";
import { Icon } from "../../shared/ui/Icons";

export const FakeSearchInput = ({ onOpen }: { onOpen: () => void }) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center justify-between h-12 w-full max-w-74 px-6 bg-surface rounded-full text-secondary focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2"
    >
      <span className="text-sm">{t("header.search.placeholder")}</span>
      <Icon name="search" height={24} width={24} />
    </button>
  );
};
