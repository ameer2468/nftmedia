import React from "react";
import { IProfileComment } from "../../types/posts";
import { Link } from "react-router-dom";

interface props {
  user: string | undefined;
  comment: IProfileComment;
}

const ActivityRecord = ({ user, comment }: props) => {
  return (
    <div className="w-full bg-white p-5 rounded-xl">
      <p className="text-sm font-normal text-center">
        <span className="font-bold">{user}</span> has commented on{" "}
        <Link to={`/post/${comment.thread_id}`}>
          <span className="font-bold transition-all duration-200 text-sky-500 hover:opacity-50">
            {comment.thread_title}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default ActivityRecord;
