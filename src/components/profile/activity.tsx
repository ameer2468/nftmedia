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
  const skeleton = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(<Rectangle key={i} width={"100%"} height={65} />);
    }
    return arr;
  };
  return (
    <div className="flex gap-2 flex-col">
      {loading ? (
        <div className="w-full flex flex-col gap-2">{skeleton()}</div>
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
