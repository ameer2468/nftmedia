import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

interface props {
  deleteComment: () => void;
  editComment: () => void;
}

const Actions = ({ deleteComment, editComment }: props) => {
  const ref = useRef(null);
  const [toggle, setToggle] = useDetectOutsideClick(ref, false);
  return (
    <div ref={ref} className="relative">
      <FontAwesomeIcon
        onClick={() => setToggle(!toggle)}
        className="text-zinc-500 text-[30px] cursor-pointer transition-all duration-200 hover:opacity-50"
        icon={faEllipsis}
      />
      {!toggle ? (
        ""
      ) : (
        <div className="absolute flex flex-col gap-1 right-0 bg-zinc-50 px-5 py-3 rounded-xl w-fit h-fit">
          <div
            onClick={() => {
              editComment();
              setToggle(false);
            }}
            className="flex gap-2 items-center cursor-pointer transition-all duration-200 hover:opacity-50"
          >
            <FontAwesomeIcon
              className="text-[10px] text-zinc-600"
              icon={faPencil}
            />
            <p className="text-sm text-zinc-600">Edit</p>
          </div>
          <div
            onClick={() => {
              deleteComment();
              toggle && setToggle(!toggle);
            }}
            className="flex gap-2 items-center cursor-pointer transition-all duration-200 hover:opacity-50"
          >
            <FontAwesomeIcon
              className="text-[10px] text-zinc-600"
              icon={faTrash}
            />
            <p className="text-sm text-zinc-600">Delete</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actions;
