import { useRouter } from "next/router";

// utils
import { bgColor, bgGradient, borderColor } from "@src/utils/colorUtils";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// i18next

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: "default" | "bordered" | "contained";
  isPrimaryColor?: boolean;
  bgMode?: "gradient" | "default";
}

const Button: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    children,
    variant = "default",
    isPrimaryColor = true,
    bgMode = "default",
    disabled = false,
    className = "",
    ...rest
  } = props;
  const { primaryColor } = useThemeStore((state) => state);

  const variantAttr = () => {
    switch (variant) {
      case "default":
        return `bg-inherit border-none`;
      case "bordered":
        return `${
          isPrimaryColor
            ? `border ${borderColor(primaryColor)} bg-transparent`
            : "border bg-transparent"
        }`;
      case "contained":
        return `border-none ${
          isPrimaryColor
            ? `${
                bgMode === "default"
                  ? `${bgColor(primaryColor)} `
                  : `${bgGradient(primaryColor)}`
              }`
            : ""
        }`;
      default:
        return `border-none ${
          isPrimaryColor
            ? `${
                bgMode === "default"
                  ? bgColor(primaryColor)
                  : bgGradient(primaryColor)
              }`
            : ""
        }`;
    }
  };

  return (
    <button
      className={twMerge(
        `flex items-center justify-center transition-all duration-200 ease-in-out rounded-10 py-2 px-8 ${
          disabled
            ? "dark:bg-customGray bg-customGrayDark"
            : `hover:scale-[1.02] ${variantAttr()}`
        }`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
