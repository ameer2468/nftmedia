import React, { useRef, useContext, useState, useEffect } from "react";
import { Avatar } from "../global/avatar";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { IPostComment } from "../../types/posts";
import { UserContext } from "../../context/UserContext";
import Actions from "./actions";
import Textarea from "../global/textarea";
import Button from "../global/button";
import Loading from "../global/loading";

interface props {
  comment: IPostComment;
  deleteComment: (id: number) => void;
  editedComment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resetForm: () => void;
  commentLoading: boolean;
  editCommentHandler: (arg: number) => void;
}

const Comment = ({
  comment,
  deleteComment,
  editedComment,
  onChange,
  resetForm,
  commentLoading,
  editCommentHandler,
}: props) => {
  const user = useContext(UserContext);
  const [editComment, setEditComment] = useState(false);
  const focusRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (editComment) {
      focusRef.current?.focus();
    }
  }, [editComment]);

  return (
    <div className="bg-white rounded-xl p-5 border border-sky-100">
      <div className="flex justify-between items-center mb-5">
        <NavLink to={`/profile/${comment.user_id}`}>
          <div className="flex items-center transition-all duration-200 hover:opacity-50 cursor-pointer">
            <Avatar className="w-10" />
            <p className="font-bold text-sky-500">{comment.display_name}</p>
          </div>
        </NavLink>
        <div className="flex items-center gap-5">
          <p className="ml-5 font-bold text-xs opacity-40">
            {moment(comment.created_at).format("LLL")}
          </p>
          {user.user?.id === Number(comment.user_id) && (
            <Actions
              editComment={() => {
                setEditComment(true);
              }}
              deleteComment={() => {
                deleteComment(comment.id);
              }}
            />
          )}
        </div>
      </div>
      {commentLoading && (
        <div className="w-[full]">
          <Loading width="100%" color="black" />
        </div>
      )}
      {editComment ? (
        <>
          <Textarea
            name="editedComment"
            inputref={focusRef}
            onChange={(e) => onChange(e)}
            value={editedComment || comment.comment}
            maxLength={100}
            placeholder={"Edit comment"}
          />
          <div className="flex gap-5">
            <Button
              onClick={() => {
                setEditComment(false);
                resetForm();
              }}
              className="bg-transparent border-2 border-sky-500 h-14 normal-case w-32 text-sky-500"
              text="Cancel"
            />
            <Button
              onClick={() => {
                editCommentHandler(comment.id);
                setEditComment(false);
                resetForm();
              }}
              disabled={editedComment.length === 0 || commentLoading}
              className={`bg-sky-500 normal-case w-32 h-14 ${
                editedComment.length === 0 || commentLoading
                  ? "bg-zinc-300 cursor-not-allowed"
                  : ""
              }`}
              text="Submit"
            />
          </div>
        </>
      ) : (
        <>{commentLoading ? "" : <p>{comment.comment}</p>}</>
      )}
    </div>
  );
};

export default Comment;
