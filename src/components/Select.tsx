// react
import { ReactNode, forwardRef } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// icons
import { Info, Arrow } from "@src/assets/icons";

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";
import Typography from "./Typography";

interface IProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: { name: string; value: string }[];
  label?: ReactNode;
  errorText?: string;
  error?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isSensitive?: boolean;
}

// @ts-ignore
const Select: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();

  const {
    children,
    className = "",
    label,
    options,
    errorText,
    error,
    iconRight,
    iconLeft,
    isSensitive = false,
    ...rest
  } = props;

  return (
    <div className="flex-1 w-full flex items-start flex-col gap-2">
      {label && label}
      <div
        className={`flex w-full items-center gap-2 px-3 min-h-[50px] border rounded-md relative ${
          isSensitive ? "dark:bg-backgroundDark bg-backgroundLight" : ""
        } ${
          error
            ? "focus:border-primary-red border-primary-red text-primary-red"
            : "focus:border-black dark:border-customGray border-customGrayDark"
        }`}
      >
        {error ? <Info className="w-6 h-6" /> : iconLeft && iconLeft}

        <select
          ref={ref}
          {...rest}
          className={`text-body2 placeholder:text-body2 bg-none appearance-none ${twMerge(
            `bg-inherit p-0 ltr:pr-5 rtl:pl-5 py-3 focus:ring-0 block w-full border-none dark:text-white text-black`,
            className
          )}`}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt.value} className="text-inherit">
              {opt.name}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 -translate-y-1/2 ltr:right-2 ltr:left-unset rtl:left-2 rtl:right-unset">
          {iconRight ? iconRight : <Arrow className="w-5 h-5" />}
        </span>
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

Select.displayName = "Select";

export default Select;
