import React from "react";
import Post from "./post";

const TrendingPosts = () => {
  return (
    <div className="mt-20 lg:mt-48">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">
        🔥 Trending Posts
      </h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default TrendingPosts;
