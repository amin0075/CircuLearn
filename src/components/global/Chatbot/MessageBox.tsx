// react
import React, { ReactNode, useEffect, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Typography from "@src/components/Typography";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { bgColor } from "@src/utils/colorUtils";

// components

interface IProps {
  children?: ReactNode;
  isBot?: boolean;
  message: string;
}

const MessageBox: React.FC<IProps> = ({ isBot = false, message }) => {
  const router = useRouter();
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <div
      className={`flex w-full ${isBot ? "bg-gray-200 self-start" : `self-end ${bgColor(primaryColor)}`} rounded-lg w-[240px] p-3 relative`}
    >
      <div
        className={`${
          isBot
            ? "bg-gray-200 left-3 right-unset"
            : `${bgColor(primaryColor)} left-unset right-3`
        } w-6 h-6 absolute bottom-0 transform rotate-45`}
      />
      <Typography
        variant="body2"
        className={`${isBot ? "text-black dark:text-black" : "text-white"}`}
      >
        {message}
      </Typography>
    </div>
  );
};

export default MessageBox;
