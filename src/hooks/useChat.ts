import { useCallback, useLayoutEffect, useState } from "react";
import { supabase } from "../constants/supabase";
export const useChat = () => {
  const [messages, setMessages] = useState([{}]);
  const [chats, setChats] = useState([{}]);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  const fetchChats = async () => {
    await supabase
      .from("chats")
      .select("*")
      .then(({ data }: any) => {
        setChats(data);
      });
  };

  const getMessages = useCallback(async () => {
    await Promise.all([
      supabase
        .from("messages:chat_id=eq." + activeChat)
        .on("INSERT", (payload) => {
          setMessages((messages) => [...messages, payload.new]);
        })
        .subscribe(),
    ]);
  }, [activeChat]);

  useLayoutEffect(() => {
    if (activeChat) {
      getMessages();
    }
  }, [activeChat, getMessages, messages]);
  return { messages, chats, fetchChats, activeChat, setActiveChat };
};
