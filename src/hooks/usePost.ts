import { Dispatch, useCallback, useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { IThread } from "../types/posts";

interface args {
  title: string;
  post: string;
}

export const usePost = (form?: args) => {
  const { user } = useContext(UserContext);
  const [createLoading, setCreateLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const submitNewPost = async (
    clearInput: Dispatch<{ title: string; post: string }>
  ) => {
    setCreateLoading(true);
    await supabase
      .from("threads")
      .insert({
        ...form,
        user: user?.id,
      })
      .then(() => {
        setCreateLoading(false);
        clearInput({
          title: "",
          post: "",
        });
      });
  };

  const deleteCommentHandler = async (
    commentId: number,
    post: IThread | null,
    setPost: Dispatch<IThread>
  ) => {
    setCommentLoading(true);
    await supabase
      .from("comments")
      .delete()
      .match({ id: commentId })
      .then(() => {
        setCommentLoading(false);
        if (post) {
          setPost({
            ...post,
            comments: post.comments?.filter(
              (comment) => comment.id !== commentId
            ),
          });
        }
      });
  };

  const newCommentHandler = async (
    input: string,
    thread_id: number | undefined,
    thread_title: string | undefined,
    display_name: string | undefined,
    user_id: number | undefined,
    post: IThread | null,
    setPost: Dispatch<IThread>
  ) => {
    setCommentLoading(true);
    await supabase
      .from("comments")
      .insert({
        thread_id: thread_id,
        thread_title: thread_title,
        comment: input,
        display_name: display_name,
        user_id: user_id,
      })
      .then(() => {
        setCommentLoading(false);
        if (post) {
          setPost({
            ...post,
            comments: [
              ...(post.comments as any),
              {
                thread_id: thread_id,
                thread_title: thread_title,
                comment: input,
                created_at: new Date().toISOString(),
                display_name: display_name,
                user_id: user_id,
              },
            ],
          });
        }
      });
  };

  return {
    submitNewPost,
    commentLoading,
    createLoading,
    newCommentHandler,
    deleteCommentHandler,
  };
};

export const useFetchPost = () => {
  const [post, setPost] = useState<IThread | null>(null);
  const [loading, setLoading] = useState(true);
  const postId = useParams().id;
  const fetchPost = useCallback(async () => {
    await supabase
      .from("threads")
      .select("*")
      .eq("id", postId)
      .then(async (thread: any) => {
        await supabase
          .from("comments")
          .select("*")
          .eq("thread_id", postId)
          .then((res: any) => {
            setPost({ ...thread.data[0], comments: res.data });
          });
        setLoading(false);
      });
  }, [postId]);
  useEffect(() => {
    if (loading) {
      fetchPost();
    }
  }, [postId, loading, fetchPost]);
  return { post, loading, setPost };
};
