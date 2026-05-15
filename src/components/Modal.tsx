import { observer } from "mobx-react-lite";
import settings from "../store/settings";
import requestStore from "../store/request/requestStore";
import locationStore from "../store/request/locationStore";
import { useState, useEffect } from "react";

export const GpsRefinementToast = observer(() => {
  const [isSessionDismissed, setIsSessionDismissed] = useState(false);

  // Перевіряємо sessionStorage при завантаженні
  useEffect(() => {
    const dismissed = sessionStorage.getItem("gps_prompt_dismissed");
    if (dismissed === "true") {
      setIsSessionDismissed(true);
    }
  }, []);

  // Якщо локації немає, або користувач вже приховав повідомлення в цій сесії — нічого не рендеримо
  if (!locationStore.pendingGpsLocation || isSessionDismissed) return null;

  const { cityName } = locationStore.pendingGpsLocation;

  const handleDismiss = (permanent: boolean) => {
    if (permanent) {
      sessionStorage.setItem("gps_prompt_dismissed", "true");
      setIsSessionDismissed(true);
    }
    locationStore.dismissGpsLocation();
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-md pointer-events-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]/15">
            <span className="text-xl">📍</span>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--color-primary)] leading-tight">
              Ми помітили, що ви в <span className="text-[var(--color-accent)]">{cityName}</span>
            </p>
            <p className="text-xs text-[var(--color-secondary)] mt-1">GPS визначив точнішу локацію. Оновити прогноз?</p>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => requestStore.confirmGpsLocation(settings.settings)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-on-accent)] bg-[var(--color-accent)] hover:opacity-90 transition-opacity"
              >
                Так, оновити
              </button>

              <button
                onClick={() => handleDismiss(false)}
                className="text-xs font-medium text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
              >
                Не зараз
              </button>

              <button
                onClick={() => handleDismiss(true)}
                className="ml-auto text-[10px] uppercase tracking-wider font-bold text-[var(--color-secondary)] opacity-50 hover:opacity-100 transition-opacity"
              >
                Більше не питати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
