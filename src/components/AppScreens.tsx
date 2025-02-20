import { observer } from "mobx-react-lite";
import request from "../store/request";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const StartScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold ">{t("start_screen_title")}</h1>
      <p className="text-lg text-gray-500">{t("start_screen_subtitle")}</p>
    </div>
  );
};

export const LoadingScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-[#8338ec]" />
      <p className="mt-4 text-lg font-semibold text-gray-700">{t("loading")}</p>
    </div>
  );
};

export const ErrorScreen = observer(() => {
  if (!request.error) return null;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold">{t("error_screen_title")}</h1>
      <p className="text-lg text-gray-500">{request.error}</p>
    </div>
  );
});
