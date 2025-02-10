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

export { StartScreen };
