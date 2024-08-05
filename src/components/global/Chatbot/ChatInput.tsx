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
import { bgColor, textColor } from "@src/utils/colorUtils";
import TextField from "@src/components/TextField";
import IconButton from "@src/components/IconButton";
import { Close, Send } from "@src/assets/icons";
import Button from "@src/components/Button";

// components

interface IProps {
  children?: ReactNode;
}

const ChatInput: React.FC<IProps> = () => {
  const router = useRouter();
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <div
      className={`${bgColor(primaryColor)} rounded-lg flex gap-2 items-center p-1 relative`}
    >
      <TextField
        className="bg-white rounded-lg placeholder:text-caption px-2 h-[42px]"
        placeholder="Type a message..."
      />
      <IconButton className={`text-white p-0`}>
        <Send className="w-8 h-8" />
      </IconButton>
    </div>
  );
};

export default ChatInput;
