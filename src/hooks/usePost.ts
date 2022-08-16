import { Dispatch, useCallback, useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { INewComment, IThread, IUpvotePost } from "../types/posts";
import { fetchPostService } from "../services/post";

interface args {
  title: string;
  post: string;
}

export const usePost = (form?: args) => {
  const { user } = useContext(UserContext);
  const [voteLoading, setVoteLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [createCommentLoading, setCreateCommentLoading] = useState(false);
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
    await supabase
      .from("comments")
      .delete()
      .match({ id: commentId })
      .then(() => {
        if (post)
          setPost({
            ...post,
            comments: post.comments?.filter(
              (comment) => comment.id !== commentId
            ),
          });
      });
  };

  const editCommentHandler = async (
    commentId: number,
    editedComment: string,
    post: IThread | null,
    setPost: Dispatch<IThread>
  ) => {
    setCommentLoading(true);
    await supabase
      .from("comments")
      .update({ comment: editedComment })
      .eq("id", commentId)
      .then((res: any) => {
        const updatedComment = res.data[0];
        setCommentLoading(false);
        const updateComment = post?.comments?.map((comment) => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          }
          return comment;
        });
        if (post) {
          setPost({ ...post, comments: updateComment });
        }
      });
  };

  const voteUpdate = (
    post: IThread,
    dir: string,
    userVote: number | null | undefined
  ) => {
    if (post.thread.vote_count === 0 && dir === "up") {
      return post.thread.vote_count + 1;
    } else if (post.thread.vote_count === 0 && dir === "down") {
      return post.thread.vote_count - 1;
    } else if (post.thread.vote_count === 1 && dir === "down") {
      return post.thread.vote_count - 2;
    } else if (post.thread.vote_count === -1 && dir === "up") {
      return post.thread.vote_count + 2;
    } else if (userVote === 1 && dir === "up") {
      return post.thread.vote_count - 1;
    } else if (userVote === -1 && dir === "down") {
      return post.thread.vote_count + 1;
    } else if (dir === "up") {
      return post.thread.vote_count + 1;
    } else {
      return post.thread.vote_count - 1;
    }
  };

  const voteHandler = async ({
    dir,
    voteCheck,
    userVote,
    setPost,
    post,
  }: any) => {
    if (
      (dir === "up" && userVote === 1) ||
      (dir === "down" && userVote === -1)
    ) {
      await supabase.from("votes").delete().match({ id: voteCheck.id });
      setPost({
        ...post,
        thread: {
          ...post.thread,
          didUserVote: null,
          vote_count: voteUpdate(post, dir, userVote),
        },
      });
    } else {
      if (voteCheck) {
        await supabase
          .from("votes")
          .update({ dir: dir === "up" ? 1 : -1 })
          .eq("thread_id", post.thread.id)
          .eq("user_id", user?.id)
          .then(() => {
            if (post) {
              setPost({
                ...post,
                thread: {
                  ...post.thread,
                  vote_count: voteUpdate(post, dir, userVote),
                  didUserVote: dir === "up" ? 1 : -1,
                },
              });
            }
          });
      } else {
        await supabase
          .from("votes")
          .insert({
            thread_id: post.thread.id,
            user_id: user?.id,
            dir: dir === "up" ? 1 : -1,
          })
          .then(() => {
            if (post) {
              setPost({
                ...post,
                thread: {
                  ...post.thread,
                  vote_count: voteUpdate(post, dir, userVote),
                  didUserVote: dir === "up" ? 1 : -1,
                },
              });
            }
          });
      }
    }
  };

  const upvote = async ({ post, setPost, dir, didUserVote }: IUpvotePost) => {
    setVoteLoading(true);
    await supabase
      .from("votes")
      .select("*")
      .eq("thread_id", post.thread.id)
      .eq("user_id", user?.id)
      .then((voteCheck: any) => {
        const checkVote = voteCheck.data[0] || 0;
        if (post) {
          setPost({
            ...post,
            thread: {
              ...post.thread,
              vote_count: voteUpdate(post, dir, didUserVote) as number,
            },
          });
        }
        voteHandler({
          dir,
          voteCheck: checkVote,
          userVote: checkVote.dir,
          setPost,
          post,
        });
        setVoteLoading(false);
      });
  };

  const newCommentHandler = async ({
    input,
    thread_id,
    thread_title,
    display_name,
    user_id,
    post,
    setPost,
  }: INewComment) => {
    setCreateCommentLoading(true);
    await supabase
      .from("comments")
      .insert({
        thread_id: thread_id,
        thread_title: thread_title,
        comment: input,
        display_name: display_name,
        user_id: user_id,
      })
      .then((res: any) => {
        const newComment = res.data[0];
        setCreateCommentLoading(false);
        if (post) {
          setPost({
            ...post,
            comments: [
              ...(post.comments as any),
              {
                id: newComment.id,
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
    upvote,
    commentLoading,
    createLoading,
    createCommentLoading,
    voteLoading,
    editCommentHandler,
    newCommentHandler,
    deleteCommentHandler,
  };
};

export const useFetchPost = () => {
  const [post, setPost] = useState<IThread | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const postId = useParams().id;
  const fetchPost = useCallback(async () => {
    setLoading(true);
    await fetchPostService(Number(user?.id), postId).then((data: any) => {
      setPost(data);
      setLoading(false);
    });
  }, [postId, user?.id]);
  useEffect(() => {
    if (loading) {
      fetchPost();
    }
  }, [postId, loading, fetchPost]);
  return { post, loading, setPost };
};
