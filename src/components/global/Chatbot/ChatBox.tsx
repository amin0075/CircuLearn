// react
import React, { ReactNode, useEffect, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Bot } from "@src/assets/icons";
import Typography from "@src/components/Typography";
import MessageBox from "./MessageBox";

// components

interface IProps {
  children?: ReactNode;
}

const ChatBox: React.FC<IProps> = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 w-full flex-1">
      {/* welcome message */}
      <div className="flex w-full items-center gap-3 justify-center">
        <Bot className="w-8 h-8 text-black dark:text-white" />
        <Typography variant="body1">Welcome to the Chat bot!</Typography>
      </div>
      <div className="flex flex-col gap-4 max-h-[330px] overflow-y-auto px-2">
        <MessageBox
          isBot
          message="How can I assist you today? The Questions has to be related to Logic circuits."
        />
        <MessageBox message="How can I assist you today? The Questions has to be related to Logic circuits." />
        <MessageBox message="How can I assist you today? The Questions has to be related to Logic circuits." />
        <MessageBox message="How can I assist you today? The Questions has to be related to Logic circuits." />
        <MessageBox message="How can I assist you today? The Questions has to be related to Logic circuits." />
        <MessageBox message="How can I assist you today? The Questions has to be related to Logic circuits." />
      </div>
    </div>
  );
};

export default ChatBox;
