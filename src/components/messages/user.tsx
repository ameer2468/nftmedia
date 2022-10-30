import React, { useContext } from "react";
import { AvatarMemo } from "../global/avatar";
import { IChat } from "../../types/chat";
import { UserContext } from "../../context/UserContext";
import moment from "moment";

interface props {
  onClick: () => void;
  activeChat: number | null;
  chat: IChat;
}

const User = ({ onClick, activeChat, chat }: props) => {
  const { user } = useContext(UserContext);
  const userChat = chat.users.find((u) => u.user !== user?.display_name);
  return (
    <div
      onClick={onClick}
      className={`w-full height-12 border-b border-sky-100 p-3 hover:bg-sky-100
     transition-all duration-200 cursor-pointer  ${
       chat.id === activeChat ? "bg-sky-50" : ""
     }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="w-8">
            {chat && userChat?.avatar_image_url ? (
              <img
                className="rounded-full"
                alt="avatar"
                src={userChat?.avatar_image_url}
              />
            ) : (
              <AvatarMemo className="w-10" />
            )}
          </div>
          <p className="font-bold text-sm ml-2">{chat ? userChat?.user : ""}</p>
        </div>
        <p className="text-zinc-400 text-xs">
          {chat
            ? chat.last_message.created_at &&
              moment(chat.last_message.created_at).format("lll")
            : ""}
        </p>
      </div>
      <p className="text-sm mt-2 w-full max-w-[420px] overflow-hidden text-ellipsis whitespace-nowrap">
        {chat ? chat.last_message.message : ""}
      </p>
    </div>
  );
};

export default User;
