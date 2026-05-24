import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import requestStore from "../../store/request/requestStore";

export const StartScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center h-height-app bg-background text-primary text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-medium">{t("start_screen_title")}</h1>
      <p className="text-lg opacity-55">{t("start_screen_subtitle")}</p>
    </div>
  );
};

export const LoadingScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center gap-3 h-height-app">
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-t-transparent border-accent rounded-full animate-spin"></div>
      </div>

      <p className="text-lg font-semibold text-primary opacity-55">{t("loading")}</p>
    </div>
  );
};

export const ErrorScreen = observer(() => {
  if (!requestStore.error) return null;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-height-app bg-background text-primary text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-medium break-word">{t("errors.title")}</h1>
      <p className="text-lg opacity-55">{t(`errors.${requestStore.error}`)}</p>
    </div>
  );
});
