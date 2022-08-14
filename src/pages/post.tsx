import React from "react";
import PostContent from "../components/post/postContent";
import Comments from "../components/post/comments";
import { useFetchPost } from "../hooks/usePost";
import Rectangle from "../components/skeleton/rectangle";

const Post = () => {
  const { post, loading, setPost } = useFetchPost();
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
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <div className="mt-10">
        <PostContent loading={loading} post={post} />
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
