import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

interface props {
  textToCopy: string | undefined;
}

const CopyButton = ({ textToCopy }: props) => {
  const copyHandler = () => {
    return navigator.clipboard.writeText(textToCopy as string);
  };

  return (
    <div
      onClick={copyHandler}
      className="bg-sky-500 w-6 h-6 transition-all duration-200
      flex items-center justify-center rounded-md
      cursor-pointer hover:brightness-110"
    >
      <FontAwesomeIcon className="text-white text-[12px]" icon={faCopy} />
    </div>
  );
};

export default CopyButton;
