import { observer } from "mobx-react-lite";
import ErrorStore from "../../store/ui/ErrorStore";

const ErrorScreen = observer(() => {
  if (!ErrorStore.error) return null;

  const title = "Сталася помилка!";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
      <p className="text-lg text-gray-500">{ErrorStore.error}</p>
    </div>
  );
});

export { ErrorScreen };
