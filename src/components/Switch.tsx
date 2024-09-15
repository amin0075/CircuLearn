// react
import React, { forwardRef } from "react";

// next js
import { useRouter } from "next/router";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelClassName?: string;
}

// @ts-ignore
const Switch: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const { children, labelClassName = "", className = "", ...rest } = props;
  const { primaryColor } = useThemeStore((state) => state);

  const background = React.useMemo(() => {
    switch (primaryColor) {
      case "blue":
        return "peer-checked:bg-primary-blue border-primary-blue";
      case "green":
        return "peer-checked:bg-primary-green border-primary-green";
      case "purple":
        return "peer-checked:bg-primary-purple border-primary-purple";
      case "red":
        return "peer-checked:bg-primary-red border-primary-red";
      case "orange":
        return "peer-checked:bg-primary-orange border-primary-orange";

      default:
        "peer-checked:bg-primary-red border-primary-red";
    }
  }, [primaryColor]);

  return (
    <label
      className={`inline-flex relative items-center cursor-pointer self-start`}
    >
      <input type="checkbox" className="sr-only peer" {...rest} />
      <div
        className={twMerge(
          `w-11 h-6 bg-inherit peer-focus:outline-none peer-focus:ring-0 peer-checked:border-0 border rounded-full peer ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute ${children ? "after:top-[5px]" : "after:top-[2px]"} ltr:after:left-[2px] ltr:after:right-unset after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:bg-white after:bg-black ${background}`,
          className
        )}
      ></div>
      <span
        className={twMerge(
          `ltr:ml-3 rtl:mr-3 text-sm font-book text-black dark:text-white`,
          labelClassName
        )}
      >
        {children}
      </span>
    </label>
  );
});

Switch.displayName = "Switch";

export default Switch;
