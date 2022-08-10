import React from "react";

interface props {
  user: string | undefined;
  post?: string;
  comment: any;
}

const ActivityRecord = ({ user, post, comment }: props) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl">
      <p className="text-sm font-normal">
        <span className="font-bold">{user}</span> has commented on{" "}
        <span className="font-bold text-sky-500">{comment.thread_title}</span>
      </p>
    </div>
  );
};

export default ActivityRecord;
