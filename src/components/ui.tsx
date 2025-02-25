export const SVG = ({ name, size = 24, color = "currentColor" }: { name: string; size?: number; color?: string }) => {
  return (
    <svg width={size} height={size} fill={color} aria-hidden="true">
      <use href={`./src/assets/images/air_polutants.svg#${name}`} />
    </svg>
  );
};

type ButtonProps = {
  icon: string;
  label?: string;
  additionalClass?: string;
  onClick?: () => void;
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
