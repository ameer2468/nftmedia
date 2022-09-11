import React from "react";
import { AvatarMemo } from "../global/avatar";
import {IChat} from '../../types/chat';

interface props {
  onClick: () => void
  activeChat: number | null;
  chat: IChat;
}

const User = ({onClick, activeChat, chat}: props) => {
  return (
    <div
    onClick={onClick}
      className={`w-full height-12 border-b border-sky-100 p-3 hover:brightness-90
     transition-all duration-200 cursor-pointer  ${chat.id === activeChat ? 'bg-sky-50' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <AvatarMemo className="w-10 mb-3" />
          <p className="font-bold text-sm">User</p>
        </div>
        <p className="text-zinc-400 text-xs">September 3, 2022 5:20 PM</p>
      </div>
      <p className="text-sm">last message here...</p>
    </div>
  );
};

export default User;
