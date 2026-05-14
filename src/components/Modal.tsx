// import { observer } from "mobx-react-lite";
// import settings from "../store/settings";
// import requestStore from "../store/request/requestStore";
// import locationStore from "../store/request/locationStore";

// export const GpsRefinementModal = observer(() => {
//   if (!locationStore.pendingGpsLocation) return null;
//   const { cityName } = locationStore.pendingGpsLocation;

//   return (
//     // Overlay
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
//       {/* Modal card */}
//       <div className="w-full sm:max-w-sm mx-3 mb-6 sm:mb-0 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl p-5">
//         {/* Icon + title */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]/15">
//             <span className="text-xl">📍</span>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-[var(--color-primary)]">Знайдено точніше місце</p>
//             <p className="text-base font-semibold text-[var(--color-accent)]">{cityName}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-sm text-[var(--color-secondary)] mb-5">GPS визначив іншу локацію. Показати погоду для неї?</p>

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => locationStore.dismissGpsLocation()}
//             className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[var(--color-secondary)] bg-[var(--color-background)] hover:bg-[var(--color-border)] transition-colors"
//           >
//             Залишити
//           </button>
//           <button
//             onClick={() => requestStore.confirmGpsLocation(settings.settings)}
//             className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[var(--color-on-accent)] bg-[var(--color-accent)] hover:opacity-90 transition-opacity"
//           >
//             Оновити
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

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
    // Контейнер снекбара (фіксований знизу)
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-md pointer-events-auto rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-4">
          {/* Іконка */}
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]/15">
            <span className="text-xl">📍</span>
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--color-primary)] leading-tight">
              Ми помітили, що ви в <span className="text-[var(--color-accent)]">{cityName}</span>
            </p>
            <p className="text-xs text-[var(--color-secondary)] mt-1">GPS визначив точнішу локацію. Оновити прогноз?</p>

            {/* Кнопки */}
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
