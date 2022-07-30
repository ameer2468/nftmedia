import React from "react";
import Post from "./post";

const RecentPosts = () => {
  const postsArr = () => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(<Post key={i} />);
    }
    return arr;
  };
  return (
    <div className="mt-24">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">
        📰 Recent Posts
      </h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2  xl:grid-cols-3">
        {postsArr()}
      </div>
    </div>
  );
};

export default RecentPosts;
