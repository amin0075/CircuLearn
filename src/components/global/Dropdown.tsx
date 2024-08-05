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

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import { useThemeStore } from "@src/zustand_stores/Theme";
import Paper from "../Paper";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  dropdownModal: ReactNode;
}

const Dropdown: React.FC<IProps> = (props) => {
  const router = useRouter();

  const { dropdownModal, children, className, ...rest } = props;
  const { primaryColor } = useThemeStore((state) => state);
  const { isComponentVisible, ref, setIsComponentVisible } =
    useComponentVisible(false);

  console.log("asas", ref);
  return (
    <div
      className="relative z-[1]"
      ref={ref}
      onClick={() => setIsComponentVisible(true)}
    >
      {children}
      <Paper
        backgroundMode="modal-color"
        className={twMerge(
          `absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 dark:bg-gr_modal bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md px-3 py-2 rounded-md ${
            isComponentVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } transition-all duration-200 ease-in-out`,
          className
        )}
      >
        {dropdownModal}
      </Paper>
    </div>
  );
};

export default Dropdown;
