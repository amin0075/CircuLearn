// react
import { forwardRef, ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// icons
import { Info } from "@src/assets/icons";

// i18next

import Typography from "./Typography";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
    HTMLInputElement & HTMLTextAreaElement
  > {
  variant?: "default" | "bordered" | "underline";
  label?: ReactNode;
  multiLine?: boolean;
  rows?: number;
  errorText?: string;
  error?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isSensitive?: boolean;
}

// @ts-ignore
const TextField: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();

  const {
    children,
    variant = "default",
    label,
    className = "",
    multiLine = false,
    rows = 1,
    errorText,
    error,
    iconRight,
    iconLeft,
    isSensitive = false,
    ...rest
  } = props;

  const attr = () => {
    switch (variant) {
      case "default":
        return "border-0";
      case "bordered":
        return `${
          error
            ? "border-primary-red focus:border-primary-red text-primary-red"
            : "border-customGrayDark dark:border-customGray focus:border-black dark:focus:border-black"
        } border rounded-md`;
      case "underline":
        return `${
          error
            ? "border-primary-red focus:border-primary-red text-primary-red"
            : "border-customGrayDark dark:border-customGray"
        } border-t-0 border-l-0 border-r-0 border-b rounded-none`;
      default:
        return "border-0";
    }
  };
  return (
    <div className="flex-1 w-full flex flex-col items-start gap-2">
      {label && label}
      <div
        className={`relative ${
          isSensitive ? "dark:bg-backgroundDark bg-backgroundLight" : ""
        } flex w-full ${
          multiLine ? "items-start" : "items-center"
        } gap-2 px-3 ${
          multiLine ? "ltr:pr-0 rtl:pr-0" : ""
        } min-h-[50px] ${attr()}`}
      >
        {error ? (
          <Info className={`w-6 h-6 ${multiLine ? "mt-3" : ""}`} />
        ) : (
          iconLeft && iconLeft
        )}
        {multiLine ? (
          <textarea
            rows={rows}
            ref={ref}
            type="text"
            className={`text-body2 placeholder:text-body2 ltr:pr-3 rtl:pr-3 ${twMerge(
              `w-full bg-inherit border-none p-0 py-3 dark:text-white text-black placeholder:text-customGrayDark dark:placeholder:text-customGray focus:ring-0 outline-none font-regular placeholder:font-light`,
              className
            )}`}
            {...rest}
          ></textarea>
        ) : (
          <input
            ref={ref}
            type="text"
            className={`text-body2 placeholder:text-body2 ${twMerge(
              `w-full bg-inherit border-none p-0 py-3 dark:text-white text-black placeholder:text-customGrayDark dark:placeholder:text-customGray focus:ring-0 outline-none font-regular placeholder:font-light`,
              className
            )}`}
            {...rest}
          />
        )}
        {iconRight && iconRight}
        {isSensitive && (
          <span className="w-full h-full absolute top-0 left-0 rounded-md backdrop-blur-sm" />
        )}
      </div>
      {error && (
        <Typography
          variant="caption"
          textTransform="capitalize"
          className="dark:text-primary-red text-primary-red"
        >
          {t(errorText || "")}
        </Typography>
      )}
    </div>
  );
});

TextField.displayName = "TextField";

export default TextField;
