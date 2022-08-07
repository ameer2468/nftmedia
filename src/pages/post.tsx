import React from "react";
import PostContent from "../components/post/postContent";
import Comments from "../components/post/comments";

const Post = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <div className="mt-10">
        <PostContent />
        <div className="mt-10">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default Post;
