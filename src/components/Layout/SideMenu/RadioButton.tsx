import React from "react";

type RadioButtonProps = {
  item: string | undefined;
  value: string;
  onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ item, value, onChange }) => {
  if (!item) return null;

  return (
    <div className="relative group">
      <input
        type="radio"
        name="custom-radio"
        value={item}
        checked={value === item}
        onChange={() => onChange(item)}
        className="absolute opacity-0"
      />
      <div className="h-6 w-6 border-2 border-gray-500 rounded-full relative">
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 h-3 w-3 rounded-full 
            ${value === item ? "opacity-100" : "opacity-0"}`}
        ></div>
      </div>
    </div>
  );
};

export { RadioButton };
