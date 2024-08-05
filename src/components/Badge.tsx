// react
import React, { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// utils
import { bgColor, borderColor } from "@src/utils/colorUtils";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  mode?: "bordered" | "contained";
  color?:
    | "red"
    | "blue"
    | "orange"
    | "purple"
    | "green"
    | "transparent"
    | "primary";
}

const Badge: React.FC<IProps> = (props) => {
  const router = useRouter();

  const {
    className,
    mode = "bordered",
    color = "transparent",
    children,
    ...rest
  } = props;
  const { primaryColor } = useThemeStore((state) => state);

  const variantAttr = () => {
    switch (color) {
      case "transparent":
        return `${
          mode === "bordered"
            ? "dark:border-white border-black border"
            : "border-none bg-transparent"
        }`;
      case "primary":
        return `${
          mode === "bordered"
            ? `${borderColor(primaryColor)} border bg-transparent`
            : `${bgColor(primaryColor)} border-none`
        }`;
      case "blue":
        return `${
          mode === "bordered"
            ? "border-primary-blue border bg-transparent"
            : "border-none bg-primary-blue"
        }`;

      case "green":
        return `${
          mode === "bordered"
            ? "border-primary-green border bg-transparent"
            : "border-none bg-primary-green"
        }`;

      case "purple":
        return `${
          mode === "bordered"
            ? "border-primary-purple border bg-transparent"
            : "border-none bg-primary-purple"
        }`;

      case "red":
        return `${
          mode === "bordered"
            ? "border-primary-red border bg-transparent"
            : "border-none bg-primary-red"
        }`;

      case "orange":
        return `${
          mode === "bordered"
            ? "border-primary-orange border bg-transparent"
            : "border-none bg-primary-orange"
        }`;

      default:
        return `${
          mode === "bordered"
            ? "dark:border-white border-black border bg-transparent"
            : "border-none bg-transparent"
        }`;
    }
  };

  return (
    <div
      className={twMerge(
        `flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-[1.04] rounded-full px-3 py-1 ${variantAttr()}`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
