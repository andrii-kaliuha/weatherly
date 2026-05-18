import { useRef, useEffect, RefObject } from "react";
import { observer } from "mobx-react-lite";
import requestStore from "../store/request/requestStore";
import { useTranslation } from "react-i18next";
import type { ButtonProps, RadioButtonProps } from "../types";
import iconsRaw from "../assets/icons.svg?raw";

type SVGProps = { source: string; width?: number; height?: number; style?: string; label?: string };

export const SVG = ({ source, width, height, style, label }: SVGProps) => {
  return (
    <svg className={style} width={width} height={height} role={label ? "img" : "presentation"} aria-hidden={!label}>
      {label && <title>{label}</title>}
      <use href={source} />
    </svg>
  );
};

export const SvgSprite = () => <div aria-hidden="true" style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: iconsRaw }} />;

type IconProps = { name: string; width?: number; height?: number; color?: string };

export const Icon = ({ name, width, height, color = "currentColor" }: IconProps) => (
  <svg width={width} height={height} fill={color} aria-hidden="true">
    <use href={`#${name}`} />
  </svg>
);

export const Button = ({ icon, label, style = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-transparent ${style}`}
  >
    <Icon name={icon} height={24} width={24} />
    {label && <p className="hidden md:block">{label}</p>}
  </button>
);

export function useHorizontalScroll<T extends HTMLElement>(): RefObject<T> {
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollRef.current) scrollRef.current.scrollLeft += event.deltaY;
    };

    const element = scrollRef.current;
    if (element) element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (element) element.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return scrollRef;
}

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

export const RadioButton: React.FC<RadioButtonProps> = ({ checked, onChange }) => {
  return (
    <button
      role="radio"
      aria-checked={checked}
      onClick={onChange}
      className="relative flex justify-center items-center w-6 h-6 rounded-full transition-opacity opacity-55 hover:opacity-100 focus-visible:opacity-100"
      style={{ opacity: checked ? 1 : 0.55 }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 transition-opacity pointer-events-none group-hover:opacity-100"></div>
      <div className="w-3 h-3 bg-primary rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </button>
  );
};
