import { observer } from "mobx-react-lite";
import requestStore from "../store/requestStore";
import { Icon } from "../shared/ui/Icons";
import { useTranslation } from "react-i18next";
import { Portal } from "../shared/ui/Portal";

export const FastLocationNotifier = observer(() => {
  const { i18n } = useTranslation();
  if (requestStore.fastLocation === null) return null;
  const { uk, en } = requestStore.fastLocation.local_names;
  const city = i18n.language === "uk" ? uk : en;

  const handleConfirm = () => {
    if (requestStore.loading === true) return;
    requestStore.confirmFastLocation();
    requestStore.hideStartScreen();
  };

  const handleDismiss = () => requestStore.dismissFastLocation();

  return (
    <Portal>
      <div className="flex justify-center fixed bottom-3 left-3 right-3 z-1">
        <Desktop city={city} onConfirm={handleConfirm} onDismiss={handleDismiss} />
        <Mobile city={city} onConfirm={handleConfirm} onDismiss={handleDismiss} />
      </div>
    </Portal>
  );
});

const ShowButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="h-12 min-w-full sm:min-w-32 rounded-4xl bg-accent text-on-accent flex justify-center items-center hover:opacity-80 
      cursor-pointer focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2"
    >
      {t("fast_location.show")}
    </button>
  );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="h-12 w-12 rounded-full bg-primary text-on-accent flex justify-center items-center hover:opacity-80 cursor-pointer
      focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2"
    >
      <Icon name="close" height={24} width={24} />
    </button>
  );
};

const Text = ({ city }: { city: string }) => {
  const { t } = useTranslation();
  const cityName = `${city}?`;

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <span className="sr-only">{t("fast_location.aria", { city })}</span>

      <span aria-hidden="true" className="text-base text-primary block truncate">
        {cityName}
      </span>
      <p aria-hidden="true" className="text-sm text-secondary">
        {t("fast_location.ask")}
      </p>
    </div>
  );
};

const Desktop = ({ city, onConfirm, onDismiss }: { city: string; onConfirm: () => void; onDismiss: () => void }) => {
  return (
    <div className="hidden sm:flex items-center gap-3 w-full max-w-max rounded-full bg-surface p-3">
      <Icon name="geolocation" height={48} width={48} />
      <Text city={city} />
      <ShowButton onClick={onConfirm} />
      <CloseButton onClick={onDismiss} />
    </div>
  );
};

const Mobile = ({ city, onConfirm, onDismiss }: { city: string; onConfirm: () => void; onDismiss: () => void }) => {
  return (
    <div className="flex sm:hidden flex-col gap-3 w-full rounded-4xl bg-surface p-3">
      <div className="w-full flex items-center gap-3">
        <Icon name="geolocation" height={48} width={48} />
        <Text city={city} />
        <CloseButton onClick={onDismiss} />
      </div>
      <ShowButton onClick={onConfirm} />
    </div>
  );
};
