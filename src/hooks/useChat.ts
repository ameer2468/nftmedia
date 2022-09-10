import { useState } from "react";
import { supabase } from "../constants/supabase";
import { IChat } from "../types/chat";
export const useChat = () => {
  const [messages, setMessages] = useState([{}]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const getMessages = () => {
      supabase.from("messages:chat_id=eq." + activeChat)
      .on("INSERT", (payload) => {
          setMessages((messages) => [...messages, payload.new]);
        })
        .subscribe()
  };

  return { messages, chats, setChats, activeChat, setActiveChat };
};
