import React, { useContext, useEffect, useState } from "react";
import Comment from "./comment";
import { AvatarMemo } from "../global/avatar";
import Button from "../global/button";
import { AnimatePresence, motion } from "framer-motion";
import { useFormHook } from "../../hooks/useFormHook";
import { IPostComment, IThread } from "../../types/posts";
import { usePost } from "../../hooks/usePost";
import { UserContext } from "../../context/UserContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import TagUser from "./tagUser";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchUsers } from "../../hooks/useSearchUsers";
import TextAreaInput from "../global/textarea";

interface props {
  comments: IPostComment[] | undefined;
  loading: boolean;
  post: IThread | null;
  setPost: (post: IThread) => void;
}

const Comments = ({ comments, loading, post, setPost }: props) => {
  const [show, setShow] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState<number | null>(null);
  const inputObj = {
    comment: "",
    editedComment: "",
  };
  const { user } = useContext(UserContext);
  const { onChangeHandler, inputValues, resetForm, setInputValues } =
    useFormHook(inputObj);
  const { comment, editedComment } = inputValues;
  const findTag = comment.match(/@\w+/g);
  const pullNameFromTag = findTag?.map((tag: string | any[]) => tag.slice(1));
  const nameDebounce = useDebounce(pullNameFromTag?.[0], 300);
  const { users } = useSearchUsers(nameDebounce);
  const {
    newCommentHandler,
    commentLoading,
    createCommentLoading,
    deleteCommentHandler,
    editCommentHandler,
  } = usePost();
  const submitComment = () => {
    if (post && user) {
      newCommentHandler({
        input: comment,
        thread_id: post.thread.id,
        thread_title: post.thread.title,
        display_name: user.display_name,
        user_id: user.id,
        post: post,
        setPost: setPost,
      }).then(() => {
        resetForm();
      });
    }
  };
  useEffect(() => {
    if (findTag) {
      setShowTag(true);
    } else {
      setShowTag(false);
    }
  }, [findTag]);
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10 border border-white">
      <h2 className="font-bold text-[25px] lg:text-[30px]">Comments</h2>
      <div className="mt-5 flex-col flex gap-5">
        <div className="flex w-full">
          {user?.avatar_image_url === null ? (
            <AvatarMemo className="w-10 mr-5" />
          ) : (
            <img
              className="w-10 h-10 mr-5"
              src={user?.avatar_image_url + "?v=" + Date.now()}
              alt="avatar"
            />
          )}
          <div className="relative w-full">
            <TextAreaInput
              className="w-full"
              name="comment"
              value={comment}
              hideLimit={true}
              maxLength={300}
              onChange={(e) => {
                onChangeHandler(e);
              }}
              enterKeyHandler={submitComment}
              onFocus={() => {
                setShow(true);
              }}
              placeholder="Add a comment"
            />
            {showTag && (
              <TagUser
                onUserClick={(user) => {
                  const updateComment = inputValues.comment.replace(
                    /@\w+/g,
                    user.display_name
                  );
                  setInputValues({
                    comment: updateComment,
                  });
                  setShowTag(false);
                }}
                data={users}
              />
            )}
          </div>
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
                className="bg-sky-500 border-2 border-sky-500 h-14 normal-case w-32 text-sky-500"
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
            : comments?.sort((a,b) => b.id - a.id).map((commentPost, index) => {
                return (
                  <Comment
                    onChange={(e) => {
                      onChangeHandler(e);
                    }}
                    index={index}
                    post={post}
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
