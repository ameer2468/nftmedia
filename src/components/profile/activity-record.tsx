import React from "react";
import { IProfileComment } from "../../types/posts";

interface props {
  user: string | undefined;
  comment: IProfileComment;
}

const ActivityRecord = ({ user, comment }: props) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl">
      <p className="text-sm font-normal text-center">
        <span className="font-bold">{user}</span> has commented on{" "}
        <span className="font-bold text-sky-500">{comment.thread_title}</span>
      </p>
    </div>
  );
};

export default ActivityRecord;
