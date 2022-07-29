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
        <FontAwesomeIcon icon={faArrowUp} />
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <p className="text-xl">{count}</p>
    </div>
  );
};

export default VoteCount;
