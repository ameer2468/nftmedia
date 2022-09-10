import { createContext } from "react";
import { IChat } from "../types/chat";

export const ChatsContext = createContext<{chats: IChat[], setChats: any}>({
    chats: [], setChats: () => {}
});
export const ChatsProvider = ChatsContext.Provider;