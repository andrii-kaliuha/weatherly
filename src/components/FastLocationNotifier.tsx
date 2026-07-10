import { observer } from "mobx-react-lite";
import settings from "../store/settings";
import requestStore from "../store/request/requestStore";
import { Icon } from "../shared/ui/Icons";
import { useTranslation } from "react-i18next";
import { Portal } from "../shared/ui/Portal";

export const FastLocationNotifier = observer(() => {
  const { i18n } = useTranslation();
  if (!requestStore.fastLocation) return null;
  const { uk, en } = requestStore.fastLocation.local_names;
  const city = i18n.language === "uk" ? uk : en;

  const handleConfirm = () => {
    requestStore.confirmFastLocation(settings.settings);
    requestStore.hideStartScreen();
  };

  const handleDismiss = () => (requestStore.fastLocation = null);

  return (
    <Portal>
      <Desktop city={city} onConfirm={handleConfirm} onDismiss={handleDismiss} />
      <Mobile city={city} onConfirm={handleConfirm} onDismiss={handleDismiss} />
    </Portal>
  );
});

const ShowButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="h-12 min-w-full sm:min-w-32 rounded-4xl bg-accent text-on-accent flex justify-center items-center hover:opacity-80 cursor-pointer"
    >
      {t("fast_location.show")}
    </button>
  );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="h-12 w-12 rounded-full bg-black text-on-accent flex justify-center items-center hover:opacity-80 cursor-pointer"
    >
      <Icon name="close" height={24} width={24} />
    </button>
  );
};

const Desktop = ({ city, onConfirm, onDismiss }: { city: string; onConfirm: () => void; onDismiss: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden sm:flex justify-center fixed bottom-6 left-3 right-3 z-20">
      <div className="w-full max-w-max rounded-full flex gap-3 bg-surface p-3">
        <div className="w-full flex items-center gap-3">
          <Icon name="geolocation" height={48} width={48} />
          <div className="flex flex-1 flex-col min-w-0">
            <span className="text-base block truncate">{city}?</span>
            <p className="text-sm text-secondary text-balance">{t("fast_location.ask")}</p>
          </div>
          <ShowButton onClick={onConfirm} />
          <CloseButton onClick={onDismiss} />
        </div>
      </div>
    </div>
  );
};

const Mobile = ({ city, onConfirm, onDismiss }: { city: string; onConfirm: () => void; onDismiss: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="flex sm:hidden justify-center  fixed bottom-3 left-3 right-3 z-20">
      <div className="w-full max-w-full rounded-4xl flex gap-3 bg-surface p-3">
        <div className="w-full flex flex-col items-center gap-3 justify-evenly">
          <div className="flex flex-1 items-center gap-3 w-full">
            <Icon name="geolocation" height={48} width={48} />
            <div className="flex flex-1 flex-col min-w-0">
              <span className="text-base block truncate">{city}?</span>
              <p className="text-sm text-secondary text-balance">{t("fast_location.ask")}</p>
            </div>
            <CloseButton onClick={onDismiss} />
          </div>
          <div className="flex flex-1 items-center gap-3 w-full">
            <ShowButton onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};
