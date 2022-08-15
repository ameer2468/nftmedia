import { Dispatch, useCallback, useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { INewComment, IThread, IUpvotePost } from "../types/posts";

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

  const voteUpdate = (post: IThread, dir: string, userVote: number | null) => {
    if (post.vote_count === 0 && dir === "up") {
      return post.vote_count + 1;
    } else if (post.vote_count === 0 && dir === "down") {
      return post.vote_count - 1;
    } else if (post.vote_count === 1 && dir === "down") {
      return post.vote_count - 2;
    } else if (post.vote_count === -1 && dir === "up") {
      return post.vote_count + 2;
    } else if (userVote === 1 && dir === "up") {
      return post.vote_count - 1;
    } else if (userVote === -1 && dir === "down") {
      return post.vote_count + 1;
    } else if (dir === "up") {
      return post.vote_count + 1;
    } else {
      return post.vote_count - 1;
    }
  };

  const voteHandler = async ({
    dir,
    voteCheck,
    userVote,
    setPost,
    post,
    setUserVoted,
  }: any) => {
    if (
      (dir === "up" && userVote === 1) ||
      (dir === "down" && userVote === -1)
    ) {
      await supabase.from("votes").delete().match({ id: voteCheck.id });
      setUserVoted(null);
    } else {
      if (voteCheck) {
        await supabase
          .from("votes")
          .update({ dir: dir === "up" ? 1 : -1 })
          .eq("thread_id", post.id)
          .eq("user_id", user?.id)
          .then(() => {
            if (post) {
              setPost({
                ...post,
                vote_count: voteUpdate(post, dir, userVote),
              });
              setUserVoted(dir === "up" ? 1 : -1);
            }
          });
      } else {
        await supabase
          .from("votes")
          .insert({
            thread_id: post.id,
            user_id: user?.id,
            dir: dir === "up" ? 1 : -1,
          })
          .then(() => {
            if (post) {
              setPost({
                ...post,
                vote_count: voteUpdate(post, dir, userVote),
              });
              setUserVoted(dir === "up" ? 1 : -1);
            }
          });
      }
    }
  };

  const upvote = async ({
    post,
    setPost,
    dir,
    userVote,
    setUserVoted,
  }: IUpvotePost) => {
    await Promise.all([
      supabase
        .from("votes")
        .select("*")
        .eq("thread_id", post.id)
        .eq("user_id", user?.id),
    ]).then(async ([voteCheck]: any) => {
      const checkVote = voteCheck.data[0] || null;
      if (post) {
        setPost({
          ...post,
          vote_count: voteUpdate(post, dir, userVote) as number,
        });
      }
      await voteHandler({
        dir,
        voteCheck: checkVote,
        userVote,
        setPost,
        post,
        setUserVoted,
      });
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
      .then((res: any) => {
        const newComment = res.data[0];
        setCommentLoading(false);
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
    editCommentHandler,
    newCommentHandler,
    deleteCommentHandler,
  };
};

export const useFetchPost = () => {
  const [post, setPost] = useState<IThread | null>(null);
  const [loading, setLoading] = useState(true);
  const [userVoted, setUserVoted] = useState<number | null>(null);
  const { user } = useContext(UserContext);
  const postId = useParams().id;
  const fetchPost = useCallback(async () => {
    await Promise.all([
      supabase.from("threads").select("*").eq("id", postId),
      supabase.from("comments").select("*").eq("thread_id", postId),
      supabase
        .from("votes")
        .select("*")
        .eq("thread_id", postId)
        .eq("user_id", user?.id),
      supabase.from("votes").select("*").eq("thread_id", postId),
    ]).then(([thread, comments, vote, addVotes]: any) => {
      const countVotes = addVotes.data.reduce(
        (acc: any, vote: { dir: any }) => {
          return acc + vote.dir;
        },
        0
      );
      if (vote.data.length > 0) {
        setUserVoted(vote.data[0].dir);
      } else {
        setUserVoted(null);
      }
      setPost({
        ...thread.data[0],
        vote_count: countVotes,
        comments: comments.data,
      });
      setLoading(false);
    });
    setLoading(false);
  }, [postId, user?.id]);
  useEffect(() => {
    if (loading) {
      fetchPost();
    }
  }, [postId, loading, fetchPost]);
  return { post, loading, setPost, userVoted, setUserVoted };
};
