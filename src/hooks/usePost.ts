import { Dispatch, useCallback, useEffect, useState } from "react";
import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { INewComment, IPost, IThread, IUpvotePost } from "../types/posts";
import { fetchPostService, getRecentPosts } from "../services/post";

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
  const nav = useNavigate();
  const submitNewPost = async (
    clearInput: Dispatch<{ title: string; post: string }>
  ) => {
    setCreateLoading(true);
    await supabase
      .from("threads")
      .insert({
        ...form,
        user_id: user?.id,
        display_name: user?.display_name,
        view_count: 0,
      })
      .then((res: any) => {
        const threadId = res.data[0].id;
        setCreateLoading(false);
        clearInput({
          title: "",
          post: "",
        });
        nav(`/post/${threadId}`);
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
            thread: {
              ...post.thread,
              comment_count: post.thread.comment_count - 1,
            },
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
        if (post) {
          const updateComment = post.comments?.map((comment) => {
            if (comment.id === updatedComment.id) {
              return updatedComment;
            }
            return comment;
          });
          setPost({ ...post, comments: updateComment });
        }
      });
  };

  //This is a function that sets the vote count correctly
  //if vote count is = 1 and the user downvotes, we set it to -1
  //if vote count is = -1 and the user upvotes, we set it to 1
  //Otherwise add 1 to the vote count or -1

  const voteUpdate = (
    post: IThread,
    dir: string,
    userVote: number | null | undefined
  ) => {
    if (userVote === 1 && dir === "up") {
      return post.thread.vote_count - 1;
    } else if (userVote === -1 && dir === "down") {
      return post.thread.vote_count + 1;
    } else if (userVote === null && dir === "up") {
      return post.thread.vote_count + 1;
    } else if (userVote === null && dir === "down") {
      return post.thread.vote_count - 1;
    }
  };

  const voteHandler = async ({ dir, userVote, setPost, post }: any) => {
    //if user already voted and they clicked the same button

    if (
      (dir === "up" && userVote.dir === 1) ||
      (dir === "down" && userVote.dir === -1)
    ) {
      await supabase
        .from("votes")
        .delete()
        .match({ id: userVote.id })
        .then(() => {
          setPost({
            ...post,
            thread: {
              ...post.thread,
              didUserVote: { dir: null, id: null },
              vote_count: voteUpdate(post, dir, userVote.dir),
            },
          });
        });
    } else {
      //if user already voted and they clicked a different button

      if (userVote.dir === 1 || userVote.dir === -1) {
        await supabase
          .from("votes")
          .update({ dir: dir === "up" ? 1 : -1 })
          .eq("thread_id", post.thread.id)
          .eq("user_id", user?.id)
          .then((res: any) => {
            const data = res.data[0];
            if (post) {
              setPost({
                ...post,
                thread: {
                  ...post.thread,
                  vote_count: voteUpdate(post, dir, userVote.dir),
                  didUserVote: { dir: data.dir, id: data.id },
                },
              });
            }
          });
      } else {
        //if user has not voted yet

        await supabase
          .from("votes")
          .insert({
            thread_id: post.thread.id,
            user_id: user?.id,
            dir: dir === "up" ? 1 : -1,
          })
          .then((res: any) => {
            const data = res.data[0];
            if (post) {
              setPost({
                ...post,
                thread: {
                  ...post.thread,
                  vote_count: voteUpdate(post, dir, userVote.dir),
                  didUserVote: { dir: data.dir, id: data.id },
                },
              });
            }
          });
      }
    }
  };

  const upvote = async ({ post, setPost, dir, didUserVote }: IUpvotePost) => {
    setVoteLoading(true);
    await voteHandler({
      dir,
      userVote: didUserVote,
      setPost,
      post,
    });
    setVoteLoading(false);
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
            thread: {
              ...post.thread,
              comment_count: post.thread.comment_count + 1,
            },
            comments: [
              ...post.comments,
              {
                id: newComment.id,
                thread_id: thread_id,
                thread_title: thread_title,
                comment: input,
                created_at: new Date().toISOString(),
                display_name: display_name,
                user_id: user_id,
                avatar_image_url: user?.avatar_image_url || null,
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

export const useFetchHomePosts = () => {
  const [recentPostsLoading, setRecentPostsLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState<null | IPost[]>([]);
  const getData = useCallback(async () => {
    setRecentPostsLoading(true);
    const res = await getRecentPosts();
    setRecentPosts(res);
    setRecentPostsLoading(false);
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  return {
    recentPostsLoading,
    recentPosts,
  };
};

export const useFetchPost = () => {
  const [post, setPost] = useState<IThread | null>(null);
  const [loading, setLoading] = useState(true);
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const fetchPost = useCallback(async () => {
    setLoading(true);
    await fetchPostService(postId, user?.id).then((data: any) => {
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
