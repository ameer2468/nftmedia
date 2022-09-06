import React from "react";
import { AvatarMemo } from "../global/avatar";

const User = () => {
  return (
    <div
      className="w-full height-12 border-b border-sky-100 p-3 hover:bg-zinc-50
     transition-all duration-200 cursor-pointer"
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
