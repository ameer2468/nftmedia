import { useState } from "react";
import { IChat } from "../types/chat";
export const useChat = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  return {  chats, setChats, activeChat, setActiveChat };
};
