import React from "react";
import ActivityRecord from "./activity-record";
import Rectangle from "../skeleton/rectangle";
import { IProfileComments } from "../../types/user";

interface props {
  comments: IProfileComments | undefined;
  user: string | undefined;
  loading: boolean;
}

const Activity = ({ comments, user, loading }: props) => {
  const skeleton = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(<Rectangle key={i} width={900} height={65} />);
    }
    return arr;
  };
  return (
    <div className="flex gap-2 flex-col">
      {loading ? (
        <div className="w-full flex flex-col gap-2">{skeleton()}</div>
      ) : comments?.length === 0 ? (
        <div className="absoluteCenter">
          <p className="font-normal text-[18px] w-full">No Activity</p>
        </div>
      ) : (
        comments?.map((comment) => {
          return (
            <ActivityRecord key={comment.id} user={user} comment={comment} />
          );
        })
      )}
    </div>
  );
};

export default Activity;
