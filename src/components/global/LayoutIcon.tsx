// react
import React, { ReactNode } from "react";

// next js
import { useRouter } from "next/router";

// components
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: ReactNode;
  mode: "expand" | "collapse";
}

const LayoutIcon: React.FC<IProps> = (props) => {
  const router = useRouter();

  const { mode, ...rest } = props;
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

  const borderColor = React.useMemo(() => {
    switch (primaryColor) {
      case "blue":
        return "peer-checked:border-primary-blue peer-checked:bg-primary-blue/20";
      case "green":
        return "peer-checked:border-primary-green peer-checked:bg-primary-green/20";
      case "purple":
        return "peer-checked:border-primary-purple peer-checked:bg-primary-purple/20";
      case "red":
        return "peer-checked:border-primary-red peer-checked:bg-primary-red/20";
      case "orange":
        return "peer-checked:border-primary-orange peer-checked:bg-primary-orange/20";

      default:
        "peer-checked:bg-primary-red border-primary-red";
    }
  }, [primaryColor]);

  return (
    <label className="flex h-[46px] w-[70px] bg-white shadow-box-shadow-black-md p-1 rounded-[4px] cursor-pointer">
      <input type="checkbox" className="sr-only peer" {...rest} />
      <span
        className={`bg-backgroundDark rounded-[2px] transition-all duration-200 ease-in-out peer ${background} ${
          mode === "expand" ? `w-4 ltr:mr-1 rtl:ml-1` : "w-2 ltr:mr-1 rtl:ml-1"
        }`}
      />
      <span
        className={` bg-backgroundDark/10 border-backgroundDark/50 flex-1 border border-dashed rounded-[4px] transition-all duration-200 ease-in-out  peer ${borderColor}`}
      />
    </label>
  );
};

export default LayoutIcon;
