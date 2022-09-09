import React, { useContext, useEffect } from "react";
import User from "../components/messages/user";
import { Scrollbars } from "react-custom-scrollbars-2";
import Chat from "../components/messages/chat";
import { useChat } from "../hooks/useChat";
import Button from "../components/global/button";
import { ModalContext } from "../context/ModalContext";

const Messages = () => {
  const { chats, messages, activeChat, setActiveChat, fetchChats } = useChat();
  const { setModalId } = useContext(ModalContext);
  useEffect(() => {
    fetchChats();
  }, []);
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
            {chats.map((chat) => {
              return <User />;
            })}
          </Scrollbars>
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default Messages;
