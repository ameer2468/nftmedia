import React from "react";
import PostContent from "../components/post/postContent";
import Comments from "../components/post/comments";
import { useFetchPost, usePost } from "../hooks/usePost";
import Rectangle from "../components/skeleton/rectangle";
import { IThread } from "../types/posts";

const Post = () => {
  const { post, loading, setPost, userVoted, setUserVoted } = useFetchPost();
  const { upvote } = usePost();
  const skeleton = () => {
    return (
      <div className="flex flex-col gap-5">
        <Rectangle width={1500} height={70} />
        <Rectangle width={1500} height={70} />
        <Rectangle width={1500} height={70} />
        <Rectangle width={1500} height={70} />
      </div>
    );
  };
  console.log(post);
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <div className="mt-10 py-10">
        <PostContent
          userVoted={userVoted}
          vote={(dir: "up" | "down") => {
            upvote({
              post: post as IThread,
              setPost,
              dir: dir,
              userVote: userVoted,
              setUserVoted,
            });
          }}
          loading={loading}
          post={post}
        />
        <div className="mt-10">
          {loading ? (
            <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10 border border-white">
              {skeleton()}
            </div>
          ) : (
            <Comments
              setPost={setPost}
              post={post}
              loading={loading}
              comments={post?.comments}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
