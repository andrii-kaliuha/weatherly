import { observer } from "mobx-react-lite";
import { Trans, useTranslation } from "react-i18next";

import Lottie from "lottie-react";
import homeAnimation from "../../assets/lottie/home.json";
import loadingAnimation from "../../assets/lottie/loading.json";
import searchErrorAnimation from "../../assets/lottie/search-error.json";
import networkErrorAnimation from "../../assets/lottie/network-error.json";
import defaultErrorAnimation from "../../assets/lottie/default-error.json";
import geolocationAnimation from "../../assets/lottie/geolocation-error.json";

export const StartScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-app bg-background text-primary text-center px-3">
      <div aria-hidden="true" className="relative w-48 h-24 md:w-64 md:h-32 overflow-hidden flex items-end justify-center mb-3">
        <div className="w-full h-48 md:h-64 absolute top-0 [&_path[stroke='rgb(0,29,61)']]:stroke-primary">
          <Lottie animationData={homeAnimation} loop={true} autoplay={true} />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-medium">
        <Trans i18nKey="start_screen_title" components={[<span className="text-accent" />]} />
      </h1>

      <p className="text-lg opacity-55">{t("start_screen_subtitle")}</p>
    </div>
  );
};

export const LoadingScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-app bg-background text-center">
      <div className="mb-[var(--height-header)]">
        <div aria-hidden="true" className="relative w-48 h-32  overflow-hidden flex items-end justify-center">
          <div className="w-40 h-32 absolute top-0">
            <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
          </div>
        </div>

        <p className="text-lg font-semibold text-primary opacity-55 animate-pulse">{t("loading")}</p>
      </div>
    </div>
  );
};

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
