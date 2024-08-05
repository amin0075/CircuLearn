// react
import React, { ReactNode, useEffect, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import { Chat, Close } from "@src/assets/icons";
import Paper from "@src/components/Paper";
import ChatInput from "./ChatInput";

interface IProps {
  children?: ReactNode;
}

const Chatbot: React.FC<IProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-7 right-7 left-unset flex flex-col gap-3">
      {/* chat box */}
      <Paper
        className={`min-w-[300px] h-[500px] flex flex-col gap-2 relative transition-all ease-in-out duration-300 ${
          isOpen ? "opacity-100 visible" : "invisible opacity-0"
        }`}
      >
        <IconButton
          onClick={() => setIsOpen(false)}
          borderRadius="full"
          className="absolute top-2 right-2 p-0"
        >
          <Close className="w-8 h-w-8 text-black" />
        </IconButton>
        <div className="flex flex-col gap-2 w-full">
          <Chatbot />
          <ChatInput />
        </div>
      </Paper>
      {/* chat bot button */}
      <IconButton
        borderRadius="full"
        variant="contained"
        className="self-end text-white"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <Chat className="w-8 h-w-8" />
      </IconButton>
    </div>
  );
};

export default Chatbot;
