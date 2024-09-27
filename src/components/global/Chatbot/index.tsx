import React, { useState } from "react";
import { useChatStore } from "@src/zustand_stores/chat";
import Paper from "@src/components/Paper";
import Typography from "@src/components/Typography";
import IconButton from "@src/components/IconButton";
import { Chat, Close } from "@src/assets/icons";
import ChatInput from "./ChatInput";
import ChatBox from "./ChatBox";
import { bgColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { primaryColor } = useThemeStore((state) => state);
  const { clearMessages, messages } = useChatStore((state) => state);

  return (
    <div className="fixed md:bottom-7 md:right-7 right-2 bottom-2 left-unset flex flex-col md:gap-3 gap-1 z-[9]">
      {/* Chat Box */}
      <Paper
        className={`w-[300px] flex flex-col gap-2 relative transition-all ease-in-out duration-300 ${
          isOpen
            ? "opacity-100 visible smd:h-[400px] md:h-[500px]"
            : "invisible opacity-0 h-0"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2 p-2 pb-0">
          {/* Clear chat history button */}
          {messages.length > 0 ? (
            <button
              className={`${bgColor(
                primaryColor
              )} p-2 py-0.5 rounded-lg flex items-center`}
              onClick={clearMessages}
            >
              <Close className="w-5 h-5 text-white [&>path]:stroke-[4px]" />
              <Typography
                variant="caption"
                className="text-white"
                fontweight="semiBold"
              >
                Clear chat history
              </Typography>
            </button>
          ) : (
            <span />
          )}
          {/* Close chat */}
          <IconButton
            onClick={() => setIsOpen(false)}
            borderRadius="full"
            className="p-0"
            aria-label="Close chat"
          >
            <Close className="w-8 h-8 text-black dark:text-white" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-2 w-full flex-1 p-3">
          <ChatBox />
          <ChatInput />
        </div>
      </Paper>

      {/* Chatbot button */}
      <IconButton
        aria-label="Open chat"
        borderRadius="full"
        variant="contained"
        className="self-end text-white"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <Chat className="w-8 h-8" />
      </IconButton>
    </div>
  );
};

export default Chatbot;
