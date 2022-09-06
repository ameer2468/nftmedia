import React from "react";
import User from "../components/messages/user";
import { Scrollbars } from "react-custom-scrollbars-2";
import Chat from "../components/messages/chat";

const Messages = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">
        📨 Messages
      </h2>
      <div className="flex h-[600px] border-white border">
        <div className="w-[30%] bg-white">
          <Scrollbars style={{ height: "600px" }}>
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
          </Scrollbars>
        </div>
        <Chat />
      </div>
    </div>
  );
};

export default Messages;
