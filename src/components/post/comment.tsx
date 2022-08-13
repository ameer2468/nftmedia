import React, { useRef } from "react";
import { Avatar } from "../global/avatar";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { IPostComment } from "../../types/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

interface props {
  comment: IPostComment;
  deleteComment: (id: number) => void;
}

const Comment = ({ comment, deleteComment }: props) => {
  const ref = useRef(null);
  const [toggle, setToggle] = useDetectOutsideClick(ref, false);
  return (
    <div className="bg-white rounded-xl p-5 border border-sky-100">
      <div className="flex justify-between items-center mb-5">
        <NavLink to={`/profile/${comment.user_id}`}>
          <div className="flex items-center">
            <Avatar className="w-10" />
            <p className="font-bold text-sky-500">{comment.display_name}</p>
          </div>
        </NavLink>
        <div className="flex items-center gap-5">
          <p className="ml-5 font-bold text-xs opacity-40">
            {moment(comment.created_at).format("LLL")}
          </p>
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
                <div className="flex gap-2 items-center cursor-pointer transition-all duration-200 hover:opacity-50">
                  <FontAwesomeIcon
                    className="text-[10px] text-zinc-600"
                    icon={faPencil}
                  />
                  <p className="text-sm text-zinc-600">Edit</p>
                </div>
                <div
                  onClick={() => {
                    deleteComment(comment.id);
                    toggle(false);
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
        </div>
      </div>
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comment;
