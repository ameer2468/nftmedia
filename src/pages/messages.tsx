import { useContext, useEffect, useState } from "react";
import User from "../components/messages/user";
import { Scrollbars } from "react-custom-scrollbars-2";
import Chat from "../components/messages/chat";
import Button from "../components/global/button";
import { ModalContext } from "../context/ModalContext";
import { ChatsContext } from "../context/ChatsContext";
import { UserContext } from "../context/UserContext";
import { useChat } from "../hooks/useChat";
import { fetchChatsService } from "../services/messages";
import { supabase } from "../constants/supabase";

const Messages = () => {
  const { chats, setChats } = useContext(ChatsContext);
  const { setModalId } = useContext(ModalContext);
  const { activeChat, setActiveChat } = useChat();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      fetchChatsService(user.display_name).then((res) => {
        setChats(res);
      });
    }
  }, [setChats, user]);
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <div className="flex justify-between">
        <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">
          📨 Messages
        </h2>
      </div>
      <div className="flex h-[600px]">
        <div className="w-[30%] bg-white border-white border rounded-tl-xl">
          <Button
            onClick={() => setModalId("new_chat")}
            className="bg-sky-500 rounded-none text-sky-500
            text-sm border-b border-sky-100 rounded-tl-lg py-[30px] w-full normal-case
            h-14 items-center hover:bg-sky-600 opacity-100"
            text="+ New Chat"
          />
          <Scrollbars style={{ height: "600px" }}>
            {chats?.map((chat) => {
              return (
                <User
                  chat={chat}
                  activeChat={activeChat}
                  onClick={() => {
                    supabase.removeAllSubscriptions();
                    setActiveChat(chat?.id);
                  }}
                  key={chat.id}
                />
              );
            })}
          </Scrollbars>
        </div>
        <Chat activeChat={activeChat} />
      </div>
    </div>
  );
};

export default Messages;
