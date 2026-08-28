import { ButtonProps, RadioButtonProps } from "../types/common";
import { Icon } from "./Icons";

export const Button = ({ icon, label, style = "", onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`flex justify-center items-center p-3 rounded-3xl cursor-pointer border-transparent outline-none ${style}`}
  >
    <Icon name={icon} height={24} width={24} />
    {label && <p className="hidden md:block">{label}</p>}
  </button>
);

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
