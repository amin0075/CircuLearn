// react
import React, { useMemo } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// utils
import { bgColor, bgGradient, borderColor } from "@src/utils/colorUtils";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

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
  borderRadius?: "full" | "default";
  noScale?: boolean;
}

const IconButton: React.FC<IProps> = (props) => {
  const router = useRouter();
  const {
    children,
    variant = "default",
    isPrimaryColor = true,
    bgMode = "default",
    borderRadius = "default",
    noScale = false,
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
                  ? bgColor(primaryColor)
                  : bgGradient(primaryColor)
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
        `flex items-center justify-center transition-all duration-200 ease-in-out ${
          noScale ? "" : "hover:scale-[1.04]"
        } ${
          borderRadius === "default"
            ? "rounded-10 py-2 px-8"
            : "rounded-full p-4"
        } ${variantAttr()}`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
