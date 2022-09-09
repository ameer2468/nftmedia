import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { UserContext } from "../context/UserContext";

export const useChat = () => {
  const [messages, setMessages] = useState([{}]);
  const [chats, setChats] = useState([{}]);
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const { user } = useContext(UserContext);

  const fetchChats = async (user: string) => {
    await supabase
      .from("chats")
      .select("*")
      .eq("user", user)
      .then(({ data }: any) => {
        setChats(data);
      });
  };

  const createChat = async (toUser: string) => {
    await supabase
      .from("chats")
      .insert({ user: user?.display_name })
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
