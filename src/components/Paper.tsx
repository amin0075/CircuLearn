// react
import React, { forwardRef, ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// i18next

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  backgroundMode?: "default" | "dark" | "darker" | "image" | "modal-color";
  bgImage?: string;
}

// @ts-ignore
const Paper: React.FC<IProps> = forwardRef((props, ref) => {
  const router = useRouter();
  const {
    children,
    className = "",
    backgroundMode = "default",
    bgImage,
    ...rest
  } = props;

  const background = React.useMemo(() => {
    switch (backgroundMode) {
      case "default":
        return "dark:bg-gr_card_dark dark:bg-transparent bg-backgroundLight bg-none dark:backdrop-blur-xl";
      case "dark":
        return "dark:bg-gr_dark dark:bg-transparent bg-backgroundLight bg-none dark:backdrop-blur-xl";
      case "darker":
        return "dark:bg-gr_darker dark:bg-transparent bg-backgroundLight bg-none dark:backdrop-blur-xl";
      case "modal-color":
        return "dark:bg-bg-gr_modal dark:bg-transparent bg-backgroundLight bg-none dark:backdrop-blur-xl";
      case "image":
        return "bg-center bg-cover bg-no-repeat";
      default:
        "dark:bg-gr_card_dark dark:bg-transparent bg-none bg-backgroundLight backdrop-blur-xl";
    }
  }, [backgroundMode]);

  return (
    <div
      ref={ref}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
      className={`${background} ${twMerge(
        `dark:shadow-none shadow-box-shadow-black-md rounded-20`,
        className
      )}`}
      {...rest}
    >
      {children}
    </div>
  );
});

Paper.displayName = "Paper";

export default Paper;
