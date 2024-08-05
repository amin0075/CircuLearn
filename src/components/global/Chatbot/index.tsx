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
import ChatBox from "./ChatBox";
import { bgColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps {
  children?: ReactNode;
}

const Chatbot: React.FC<IProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <div className="fixed bottom-7 right-7 left-unset flex flex-col gap-3">
      {/* chat box */}
      <Paper
        className={`w-[300px] flex flex-col gap-2 relative transition-all ease-in-out duration-300 ${
          isOpen ? "opacity-100 visible h-[500px]" : "invisible opacity-0 h-0"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2 p-2 pb-0">
       {/* clear chat history button  */}
        <Button className={`${bgColor(primaryColor)} p-2 py-0.5 rounded-lg flex items-center`}>
        <Close className="w-5 h-5 text-white [&>path]:stroke-[4px]" />
        <Typography
          variant="caption"
          className="text-white"
          fontweight="semiBold"
        >
          Clear chat history
        </Typography>
      </Button>
        {/* close chat */}
      <IconButton
          onClick={() => setIsOpen(false)}
          borderRadius="full"
          className="p-0"
        >
          <Close className="w-8 h-w-8 text-black dark:text-white" />
        </IconButton>
        </div>
        
        
        <div className="flex flex-col gap-2 w-full flex-1 p-3">
          <ChatBox />
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
