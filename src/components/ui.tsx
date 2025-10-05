import { useRef, useEffect, RefObject } from "react";
import { observer } from "mobx-react-lite";
import request from "../store/request";
import { useTranslation } from "react-i18next";
import type { ButtonProps, RadioButtonProps } from "../types";

export const SVG = ({
  name,
  width = 24,
  height = 20,
  color = "currentColor",
}: {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width} height={height} fill={color} aria-hidden="true">
      <use href={`./src/assets/images/icons.svg#${name}`} />
    </svg>
  );
};

export const Button = ({ icon, label, additionalClass = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-3 rounded-full cursor-pointer border-transparent outline-transparent ${additionalClass}`}
  >
    <span className="material-symbols-outlined">{icon}</span>
    {label && <p className="md:block hidden">{label}</p>}
  </button>
);

export function useHorizontalScroll<T extends HTMLElement>(): RefObject<T> {
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += event.deltaY;
      }
    };

    const element = scrollRef.current;
    if (element) {
      element.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return scrollRef;
}

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
    <div className="flex items-center justify-center gap-3 h-screen">
      <div className="flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-semibold text-on-surface opacity-55">{t("loading")}</p>
    </div>
  );
};

export const ErrorScreen = observer(() => {
  if (!request.error) return null;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-on-background text-center gap-3 px-3">
      <h1 className="text-2xl md:text-3xl font-semibold">{t("error_screen_title")}</h1>
      <p className="text-lg text-gray-500">{t(request.error)}</p>
    </div>
  );
});

export const RadioButton: React.FC<RadioButtonProps> = ({ checked, onChange }) => {
  return (
    <button
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className="relative flex justify-center items-center w-6 h-6 rounded-full transition-opacity opacity-55 hover:opacity-100 focus-visible:opacity-100"
      style={{ opacity: checked ? 1 : 0.55 }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-on-surface opacity-0 transition-opacity pointer-events-none group-hover:opacity-100"></div>
      <div className="w-3 h-3 bg-on-surface rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </button>
  );
};
