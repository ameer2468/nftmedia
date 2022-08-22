import React, { useContext, useState } from "react";
import Comment from "./comment";
import TextInput from "../global/textinput";
import { Avatar } from "../global/avatar";
import Button from "../global/button";
import { AnimatePresence, motion } from "framer-motion";
import { useFormHook } from "../../hooks/useFormHook";
import { IPostComment, IThread } from "../../types/posts";
import { usePost } from "../../hooks/usePost";
import { UserContext } from "../../context/UserContext";
import { Scrollbars } from "react-custom-scrollbars-2";

interface props {
  comments: IPostComment[] | undefined;
  loading: boolean;
  post: IThread | null;
  setPost: (post: IThread) => void;
}

const Comments = ({ comments, loading, post, setPost }: props) => {
  const [show, setShow] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const inputObj = {
    comment: "",
    editedComment: "",
  };
  const { user } = useContext(UserContext);
  const { onChangeHandler, inputValues, resetForm } = useFormHook(inputObj);
  const { comment, editedComment } = inputValues;
  const {
    newCommentHandler,
    commentLoading,
    createCommentLoading,
    deleteCommentHandler,
    editCommentHandler,
  } = usePost();
  const submitComment = () => {
    newCommentHandler({
      input: comment,
      thread_id: post?.thread.id,
      thread_title: post?.thread.title,
      display_name: user?.display_name,
      user_id: user?.id,
      post: post,
      setPost: setPost,
    }).then(() => {
      resetForm();
    });
  };
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10 border border-white">
      <h2 className="font-bold text-[25px] lg:text-[30px]">Comments</h2>
      <div className="mt-5 flex-col flex gap-5">
        <div className="flex w-full items-center">
          {user?.avatar_image_url === null ? (
            <Avatar className="w-10 mr-5" />
          ) : (
            <img
              className="w-10 mr-5"
              src={user?.avatar_image_url + "?d=" + Date.now()}
              alt="avatar"
            />
          )}
          <TextInput
            className="w-full"
            name="comment"
            value={comment}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            enterKeyHandler={submitComment}
            onFocus={() => {
              setShow(true);
            }}
            placeholder="Add a comment"
          />
        </div>
        <AnimatePresence>
          {show ? (
            <motion.div
              className={"flex justify-end gap-5"}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <Button
                onClick={() => {
                  setShow(false);
                }}
                className="bg-transparent border-2 border-sky-500 h-14 normal-case w-32 text-sky-500"
                text="Cancel"
              />
              <Button
                onClick={submitComment}
                disabled={comment.length === 0 || createCommentLoading}
                className={`bg-sky-500 normal-case w-32 h-14 ${
                  comment.length === 0 || createCommentLoading
                    ? "bg-zinc-300 cursor-not-allowed"
                    : ""
                }`}
                text="Submit"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <Scrollbars style={{ width: "100%", height: "700px", marginTop: "20px" }}>
        <div className="mt-5 flex flex-col gap-5">
          {loading
            ? ""
            : comments?.map((commentPost, index) => {
                return (
                  <Comment
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    index={index}
                    editCommentIndex={editCommentIndex}
                    resetForm={resetForm}
                    editCommentHandler={(commentId: number) => {
                      setEditCommentIndex(index);
                      editCommentHandler(
                        commentId,
                        editedComment,
                        post,
                        setPost
                      );
                    }}
                    commentLoading={commentLoading}
                    createCommentLoading={createCommentLoading}
                    editedComment={editedComment}
                    deleteComment={(commentId: number) => {
                      deleteCommentHandler(commentId, post, setPost);
                    }}
                    key={commentPost.id}
                    comment={commentPost}
                  />
                );
              })}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Comments;
