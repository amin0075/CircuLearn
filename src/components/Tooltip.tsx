// react
import React, { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// components
import Typography from "@src/components/Typography";

interface IProps {
  children?: ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  title: string;
  className?: string;
}

const Tooltip: React.FC<IProps> = ({
  children,
  direction = "bottom",
  title,
  className = "",
}) => {
  const router = useRouter();

  const directionAttr = React.useMemo(() => {
    switch (direction) {
      case "top":
        return "bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-[calc(100%+8px)] left-1/2 -translate-x-1/2";
      case "left":
        return "ltr:right-[calc(100%+8px)] ltr:left-unset rtl:left-[calc(100%+8px)] rtl:right-unset top-1/2 -translate-y-1/2";
      case "right":
        return "ltr:left-[calc(100%+8px)] ltr:right-unset rtl:right-[calc(100%+8px)] rtl:left-unset top-1/2 -translate-y-1/2";
      default:
        "top-[calc(100%+8px)] left-1/2 -translate-x-1/2";
    }
  }, [direction]);

  return (
    <div className="relative group">
      <Typography
        textTransform="first-letter-capital"
        variant="caption2"
        className={twMerge(
          `absolute ${directionAttr} group-hover:visible invisible dark:bg-gr_modal bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md px-3 py-2 rounded-md group-hover:opacity-100 opacity-0 scale-50 group-hover:scale-100 transition-all duration-200 ease-in-out`,
          className
        )}
      >
        {title}
      </Typography>

      {children}
    </div>
  );
};

export default Tooltip;
