import React, { useEffect, useRef } from "react";
import { useChatStore } from "@src/zustand_stores/chat";
import { Bot } from "@src/assets/icons";
import Typography from "@src/components/Typography";
import MessageBox from "./MessageBox";

const ChatBox: React.FC = () => {
  const messages = useChatStore((state) => state.messages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 w-full flex-1">
      {/* Welcome message */}
      <div className="flex w-full items-center gap-3 justify-center">
        <Bot className="w-8 h-8 text-black dark:text-white" />
        <Typography variant="body1">Welcome to the Chat bot!</Typography>
      </div>
      <div className="flex flex-col flex-1 gap-4 md:max-h-[330px] max-h-[200px] overflow-y-auto px-2">
        <MessageBox
          isBot
          message="How can I assist you today? The Questions have to be related to Logic circuits."
        />
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            isBot={message.sender === "bot"}
            message={message.content}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatBox;
