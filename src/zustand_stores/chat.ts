import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

// types
import { IMessage } from "@src/@types/chat";

interface ChateState {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChateState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        addMessage: (message: IMessage) =>
          set((state) => ({ messages: [...state.messages, message] })),
        clearMessages: () => set({ messages: [] }),
      }),
      {
        name: "chat-storage",
      }
    )
  )
);

export { useChatStore };
