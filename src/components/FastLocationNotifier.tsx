import { observer } from "mobx-react-lite";
import settings from "../store/settings";
import requestStore from "../store/request/requestStore";
import { useState, useEffect } from "react";
import { Icon } from "../shared/ui/Icons";
import { useTranslation } from "react-i18next";
import { Portal } from "../shared/ui/Portal";

export const FastLocationNotifier = observer(() => {
  const [isSessionDismissed, setIsSessionDismissed] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("ip_prompt_dismissed");
    if (dismissed === "true") setIsSessionDismissed(true);
  }, []);

  // Якщо швидкої локації по IP немає, або користувач приховав її в цій сесії — нічого не рендеримо
  if (!requestStore.fastLocation || isSessionDismissed) return null;

  const { city } = requestStore.fastLocation;

  const handleDismiss = (permanent: boolean) => {
    if (permanent) {
      sessionStorage.setItem("ip_prompt_dismissed", "true");
      setIsSessionDismissed(true);
    }
    // Просто очищаємо fastLocation в сторі, щоб сховати плашку
    requestStore.fastLocation = null;
  };

  return (
    <Portal>
      <div className="fixed bottom-6 left-3 right-3 z-50 flex justify-center">
        <div className="w-full max-w-max rounded-full flex gap-3 bg-surface p-3">
          <div className="w-full flex items-center gap-3">
            <Icon name="geolocation" height={48} width={48} color="red" />
            <div className="flex flex-1 flex-col items-center">
              <span className="text-base block truncate max-w-64">{city}?</span>
              <p className="text-sm text-secondary text-balance">{t("gpsRefinement.description")}</p>
            </div>
            <ShowButton onClick={() => requestStore.confirmFastLocation(settings.settings)} />
            <CloseButton onClick={() => handleDismiss(true)} />
          </div>
        </div>
      </div>
    </Portal>
  );
});

const ShowButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="h-full min-w-32 rounded-4xl bg-accent text-on-accent flex justify-center items-center hover:opacity-80 cursor-pointer"
    >
      {t("gpsRefinement.actions.update")}
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
