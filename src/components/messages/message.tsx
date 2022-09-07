import React from "react";
import { AvatarMemo } from "../global/avatar";

const Message = () => {
  return (
    <div className="bg-white w-[400px] h-auto rounded-md mb-2  px-4 py-3 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AvatarMemo className="w-10 mb-3" />
          <p className="font-bold text-sm">User</p>
        </div>
        <p className="text-zinc-400 text-xs">11:26PM</p>
      </div>
      <p className="text-sm leading-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        aliquam, blanditiis consequatur culpa cum deleniti, ea eligendi eveniet
        harum iusto laudantium molestias nobis optio provident quo recusandae
        repellendus similique totam.
      </p>
    </div>
  );
};

export default Message;
