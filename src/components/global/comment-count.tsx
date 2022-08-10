import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

interface props {
  count: string;
}

const CommentCount = ({ count }: props) => {
  return (
    <div className="flex gap-2 items-center">
      <FontAwesomeIcon className="text-[15px]" icon={faComments} />
      <p className="text-[15px] font-normal">{count}</p>
    </div>
  );
};

export default CommentCount;
