import React from "react";
import ActivityRecord from "./activity-record";
import { profileComment } from "../../types/posts";
import Rectangle from "../skeleton/rectangle";

interface props {
  comments: profileComment[];
  user: string | undefined;
  loading: boolean;
}

const Activity = ({ comments, user, loading }: props) => {
  return (
    <div className="flex gap-2 flex-col">
      {loading ? (
        <div className="w-full">
          <Rectangle width={1000} height={60} />
          <Rectangle width={1000} height={60} />
          <Rectangle width={1000} height={60} />
          <Rectangle width={1000} height={60} />
        </div>
      ) : (
        ""
      )}
      {comments.map((comment: profileComment) => {
        return (
          <ActivityRecord key={comment.id} user={user} comment={comment} />
        );
      })}
    </div>
  );
};

export default Activity;
