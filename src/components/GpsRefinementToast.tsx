// import { observer } from "mobx-react-lite";
// import settings from "../store/settings";
// import requestStore from "../store/request/requestStore";
// import locationStore from "../store/request/locationStore";
// import { useState, useEffect } from "react";
// import { Icon } from "../shared/ui/Icons";
// import { useTranslation } from "react-i18next";

// export const GpsRefinementToast = observer(() => {
//   const [isSessionDismissed, setIsSessionDismissed] = useState(false);
//   const { t } = useTranslation();

//   useEffect(() => {
//     const dismissed = sessionStorage.getItem("gps_prompt_dismissed");
//     if (dismissed === "true") setIsSessionDismissed(true);
//   }, []);

//   // Якщо локації немає, або користувач вже приховав повідомлення в цій сесії — нічого не рендеримо
//   // const cityName = locationStore.pendingGpsLocation?.cityName ?? "Івано-Франківськ";

//   if (!locationStore.pendingGpsLocation || isSessionDismissed) return null;

//   const { cityName } = locationStore.pendingGpsLocation;

//   const handleDismiss = (permanent: boolean) => {
//     if (permanent) {
//       sessionStorage.setItem("gps_prompt_dismissed", "true");
//       setIsSessionDismissed(true);
//     }
//     locationStore.dismissGpsLocation();
//   };

//   return (
//     <div className="fixed bottom-0 mb:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
//       <div className="w-full max-w-full sm:max-w-lg pointer-events-auto sm:rounded-tr-3xl sm:rounded-tl-3xl flex gap-3 bg-surface border-t-2 sm:border-2  border-background shadow-2xl pb-6 pt-3 px-3 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
//         <div className="w-full flex flex-col sm:flex-row gap-3">
//           <div className="hidden sm:flex justify-center items-center gap-3">
//             <Icon name="geolocation" height={64} width={90} />
//           </div>
//           <div className="w-full flex flex-col items-center sm:items-start gap-3">
//             <div className="flex flex-1 items-center gap-3">
//               <div className="sm:hidden flex justify-center items-center gap-3">
//                 <Icon name="geolocation" height={64} width={64} />
//               </div>

//               <div className="flex flex-col">
//                 <span className="text-base text-accent">{cityName}</span>
//                 <p className="text-sm text-secondary">{t("gpsRefinement.description")} </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row w-full gap-3">
//               <div className="flex gap-3 justify-center">
//                 <Button
//                   onClick={() => requestStore.confirmGpsLocation(settings.settings)}
//                   visual="primary"
//                   text={t("gpsRefinement.actions.update")}
//                 />
//                 <Button onClick={() => handleDismiss(false)} visual="secondary" text={t("gpsRefinement.actions.notNow")} />
//               </div>
//               <Button onClick={() => handleDismiss(true)} visual="tertiary" text={t("gpsRefinement.actions.neverAsk")} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// type ButtonProps = {
//   onClick: () => void;
//   text: string;
//   visual: "primary" | "secondary" | "tertiary";
// };

// const Button = ({ onClick, text, visual }: ButtonProps) => {
//   const visualStyles = {
//     primary: "px-4 py-1.5 rounded-lg text-xs text-on-accent bg-accent hover:opacity-90 transition-opacity",
//     secondary: "px-4 py-1.5 rounded-lg text-xs text-secondary bg-[#dee2e6] hover:text-primary transition-colors",
//     tertiary: "md:ml-auto text-xs uppercase tracking-wider font-bold text-secondary opacity-50 hover:opacity-100 transition-opacity",
//   };

//   return (
//     <button onClick={onClick} className={`transition-all cursor-pointer ${visualStyles[visual]}`}>
//       {text}
//     </button>
//   );
// };

import { observer } from "mobx-react-lite";
import settings from "../store/settings";
import requestStore from "../store/request/requestStore";
import { useState, useEffect } from "react";
// import { Icon } from "../shared/ui/Icons";
import { useTranslation } from "react-i18next";

export const GpsRefinementToast = observer(() => {
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
    <div className="fixed bottom-0 mb:bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none app-toast">
      <div className="w-full max-w-full sm:max-w-lg pointer-events-auto sm:rounded-tr-3xl sm:rounded-tl-3xl flex gap-3 bg-surface border-t-2 sm:border-2  border-background shadow-2xl pb-6 pt-3 px-3 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          {/* <div className="hidden sm:flex justify-center items-center gap-3">
            <Icon name="geolocation" height={64} width={90} />
          </div> */}
          <div className="w-full flex flex-col items-center sm:items-start gap-3">
            <div className="flex flex-1 items-center gap-3">
              <div className="sm:hidden flex justify-center items-center gap-3">{/* <Icon name="geolocation" height={64} width={64} /> */}</div>

              <div className="flex flex-col">
                <span className="text-base text-accent">{city}</span>
                <p className="text-sm text-secondary">{t("gpsRefinement.description")}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-3">
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => requestStore.confirmFastLocation(settings.settings)}
                  visual="primary"
                  text={t("gpsRefinement.actions.update")}
                />
                <Button onClick={() => handleDismiss(false)} visual="secondary" text={t("gpsRefinement.actions.notNow")} />
              </div>
              {/* <Button onClick={() => handleDismiss(true)} visual="tertiary" text={t("gpsRefinement.actions.neverAsk")} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

type ButtonProps = {
  onClick: () => void;
  text: string;
  visual: "primary" | "secondary" | "tertiary";
};

const Button = ({ onClick, text, visual }: ButtonProps) => {
  const visualStyles = {
    primary: "px-4 py-1.5 rounded-lg text-xs text-on-accent bg-accent hover:opacity-90 transition-opacity",
    secondary: "px-4 py-1.5 rounded-lg text-xs text-secondary bg-[#dee2e6] hover:text-primary transition-colors",
    tertiary: "md:ml-auto text-xs uppercase tracking-wider font-bold text-secondary opacity-50 hover:opacity-100 transition-opacity",
  };

  return (
    <button onClick={onClick} className={`transition-all cursor-pointer ${visualStyles[visual]}`}>
      {text}
    </button>
  );
};
