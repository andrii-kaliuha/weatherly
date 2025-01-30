import { observer } from "mobx-react-lite";
import ErrorStore from "../store/ErrorStore";

const ErrorScreen = observer(() => {
  if (ErrorStore.errors.length === 0) return null;

  const title = "Сталася помилка!";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <ul className="text-lg text-gray-500">
          {ErrorStore.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </>
  );
});

export { ErrorScreen };
