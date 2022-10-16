import { useState } from "react";
import { IChat } from "../types/chat";
export const useChat = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return { chats, setChats, activeChat, setActiveChat, setLoading, loading };
};
