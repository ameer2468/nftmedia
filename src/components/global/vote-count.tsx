import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface props {
  count: string;
}

const VoteCount = ({ count }: props) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex gap-1">
        <FontAwesomeIcon className="text-[15px]" icon={faArrowUp} />
        <FontAwesomeIcon className="text-[15px]" icon={faArrowDown} />
      </div>
      <p className="text-[15px] font-normal">{count}</p>
    </div>
  );
};

export default VoteCount;
