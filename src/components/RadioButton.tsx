import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";
import React, { forwardRef } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children: React.ReactNode;
}

// @ts-ignore
const RadioButton: React.FC<IProps> = forwardRef((props, ref) => {
  const { primaryColor } = useThemeStore((state) => state);
  const { children, className, id, ...rest } = props;
  return (
    <label htmlFor={id} className="flex items-center space-x-3">
      <input
        ref={ref}
        id={id}
        type="radio"
        className={`form-radio h-4 w-4 transition duration-150 ease-in-out ${textColor(primaryColor)} ${className}`}
        {...rest}
      />
      <span className="text-black dark:text-white">{children}</span>
    </label>
  );
});

RadioButton.displayName = "RadioButton";

export default RadioButton;
