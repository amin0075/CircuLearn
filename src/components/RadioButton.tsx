import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";
import React from "react";

const RadioButton: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}> = ({ name, value, checked, onChange, children }) => {
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <label className="flex items-center space-x-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={`form-radio h-4 w-4 transition duration-150 ease-in-out ${textColor(primaryColor)}`}
      />
      <span className="text-black dark:text-white">{children}</span>
    </label>
  );
};

export default RadioButton;
