import { observer } from "mobx-react-lite";
import { request } from "../store/request";
import { Loader2 } from "lucide-react";

const StartScreen = () => {
  const title = "Шукаєте прогноз погоди? Введіть назву міста в поле пошуку";
  const subtitle = "або дозвольте визначити вашу геолокацію, щоб отримати точний прогноз для вашого регіону";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold ">{title}</h1>
      <p className="text-lg text-gray-500">{subtitle}</p>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-[#8338ec]" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  );
};

const ErrorScreen = observer(() => {
  if (!request.error) return null;
  const title = "Сталася помилка!";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
      <p className="text-lg text-gray-500">{request.error}</p>
    </div>
  );
});

export { StartScreen };
export { LoadingScreen };
export { ErrorScreen };
