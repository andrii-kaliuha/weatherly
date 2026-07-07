import { observer } from "mobx-react-lite";
import { Trans, useTranslation } from "react-i18next";

import Lottie from "lottie-react";
import homeAnimation from "../../assets/lottie/home.json";
import loadingAnimation from "../../assets/lottie/loading.json";
import searchErrorAnimation from "../../assets/lottie/search-error.json";
import networkErrorAnimation from "../../assets/lottie/network-error.json";
import defaultErrorAnimation from "../../assets/lottie/default-error.json";
import geolocationAnimation from "../../assets/lottie/geolocation-error.json";
import requestStore from "../../store/request/requestStore";

export const StartScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-app bg-background text-primary text-center px-3">
      <div aria-hidden="true" className="relative w-48 h-24 md:w-64 md:h-32 overflow-hidden flex items-end justify-center mb-3">
        <div className="w-full h-48 md:h-64 absolute top-0 [&_path[stroke='rgb(0,29,61)']]:stroke-primary">
          <Lottie animationData={homeAnimation} loop={true} autoplay={true} />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-medium text-balance">
        <Trans i18nKey="start_screen_title" components={[<span className="text-accent" />]} />
      </h1>

      <p className="text-lg opacity-55">{t("start_screen_subtitle")}</p>
    </div>
  );
};

// export const LoadingScreen = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="flex flex-col justify-center items-center h-app bg-background text-center">
//       <div className="mb-[var(--height-header)]">
//         <div aria-hidden="true" className="relative w-48 h-32  overflow-hidden flex items-end justify-center">
//           <div className="w-40 h-32 absolute top-0">
//             <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
//           </div>
//         </div>

//         <p className="text-lg font-semibold text-primary opacity-55 animate-pulse">{t("loading")}</p>
//         <p className="text-lg font-semibold text-primary opacity-55 animate-pulse">Ваше місто Київ?</p>
//         <button className="bg-amber-400 border-4">Так, показати прогноз</button>
//       </div>
//     </div>
//   );
// };

// import { observer } from "mobx-react-lite";
// import { useTranslation } from "react-i18next";
// import Lottie from "lottie-react"; // або як ти його імпортуєш
// import loadingAnimation from "./path-to-animation.json"; // твій імпорт анімації
// import requestStore from "../../path-to-store/RequestStore"; // шлях до твого стору
// import { useSettings } from "../../path-to-settings"; // шлях до твоїх settings, якщо є, або передавай через props

export const LoadingScreen = observer(() => {
  const { t } = useTranslation();
  // Якщо settings зберігаються в іншому сторі, візьми їх звідти.
  // Наприклад, const { settings } = settingsStore;
  // Для прикладу передамо об'єкт, підстав сюди свій стейт налаштувань:
  const settings = { language: "uk", temperatureUnit: "C", format: "24h" } as any;

  return (
    <div className="flex flex-col justify-center items-center h-app bg-background text-center">
      <div className="mb-[var(--height-header)]">
        <div aria-hidden="true" className="relative w-48 h-32 overflow-hidden flex items-end justify-center">
          <div className="w-40 h-32 absolute top-0">
            <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
          </div>
        </div>

        {/* Якщо IP-локація вже прийшла, показуємо плашку вибору */}
        {requestStore.fastLocation ?
          <div className="fast-location-prompt">
            <p className="text-lg font-semibold text-primary">
              {t("your_city_is", { city: requestStore.fastLocation.city })}
              {/* Або просто: Ваше місто {requestStore.fastLocation.city}? */}
            </p>
            <button className="bg-amber-400 border-4" onClick={() => requestStore.confirmFastLocation(settings)}>
              {t("yes_show_forecast")} {/* Так, показати прогноз */}
            </button>
          </div>
        : /* Поки fastLocation немає (йде запит) — показуємо звичайний текст завантаження */
          <p className="text-lg font-semibold text-primary opacity-55 animate-pulse">{t("loading")}</p>
        }
      </div>
    </div>
  );
});

const errorAnimationMap: Record<string, any> = {
  city_not_found: searchErrorAnimation,
  empty_city: searchErrorAnimation,
  invalid_city_symbols: searchErrorAnimation,
  invalid_city_numbers: searchErrorAnimation,
  too_long_city: searchErrorAnimation,

  failed_to_fetch: networkErrorAnimation,

  geolocation_not_supported: geolocationAnimation,
  geolocation_permission_denied: geolocationAnimation,
  geolocation_unavailable: geolocationAnimation,
  geolocation_timeout: geolocationAnimation,
  geolocation_generic_error: geolocationAnimation,
};

export const ErrorScreen = observer(({ errorCode }: { errorCode: string }) => {
  const { t } = useTranslation();
  const currentAnimation = errorAnimationMap[errorCode] || defaultErrorAnimation;

  return (
    <div className="flex flex-col items-center justify-center h-app bg-background text-primary text-center px-3">
      <div aria-hidden="true" className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden flex items-end justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={currentAnimation} loop={true} autoplay={true} />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-medium break-word">{t("errors.title")}</h1>
      <p className="text-lg opacity-55 max-w-md">{t(`errors.${errorCode}`)}</p>
    </div>
  );
});
