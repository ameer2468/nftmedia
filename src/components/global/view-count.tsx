import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface props {
  count: string;
}

const ViewCount = ({ count }: props) => {
  return (
    <div className="flex gap-2 items-center">
      <FontAwesomeIcon className="text-[15px]" icon={faEye} />
      <p className="text-[15px] font-normal">{count}</p>
    </div>
  );
};

export default ViewCount;
