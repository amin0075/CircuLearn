// react
import { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { textColor } from "@src/utils/colorUtils";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelClassName?: string;
}

const Checkbox: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { children, labelClassName = "", className, name, ...rest } = props;
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <div className="flex items-center">
      <input
        id={`checkbox-${name}`}
        type="checkbox"
        name={name}
        className={twMerge(
          `${textColor(primaryColor)} w-4 h-4 text-lightGreen-500 bg-inherit rounded-sm border border-darkBlue-100 focus:outline-0 outline-0 ring-0 focus:ring-0 focus:ring-offset-0`,
          className
        )}
        {...rest}
      />
      <label
        htmlFor={`checkbox-${name}`}
        className={twMerge(
          `ml-2 text-sm font-book text-black dark:text-white`,
          labelClassName
        )}
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
