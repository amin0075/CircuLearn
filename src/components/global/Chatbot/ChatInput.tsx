import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChatStore } from "@src/zustand_stores/chat";
import TextField from "@src/components/TextField";
import IconButton from "@src/components/IconButton";
import { Send } from "@src/assets/icons";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { bgColor } from "@src/utils/colorUtils";
import Spinner from "@src/components/Spinner";

const ChatInput: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { primaryColor } = useThemeStore();
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Create user message
    const userMessage = {
      id: uuidv4(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    // API Request
    try {
      const response = await fetch("/api/generate-answers-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `You are a specialized assistant focused solely on topics related to Logic gates, Logic circuits, Binary system, Boolean algebra, and truth tables. If the user's question is clearly related to these topics, provide a helpful answer. If the user's question is not related to these topics, respond with: "The question is not related to Logic Circuits. Please ask related questions." Here is the user's question: "${input}"`,
        }),
      });

      const data = await response.json();
      const botMessage = {
        id: uuidv4(),
        content: data.text,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      addMessage(botMessage);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: uuidv4(),
        content: "Something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div
      className={`${bgColor(primaryColor)} rounded-lg flex gap-2 items-center p-1 relative`}
    >
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="bg-white rounded-lg placeholder:text-caption px-2 h-[42px] dark:text-black"
        placeholder="Type a message..."
        aria-label="Type a message"
      />
      <IconButton
        className={`text-white p-0`}
        onClick={sendMessage}
        disabled={isLoading}
        aria-label="Send message"
      >
        {isLoading ? <Spinner /> : <Send className="w-8 h-8" />}
      </IconButton>
    </div>
  );
};

export default ChatInput;
