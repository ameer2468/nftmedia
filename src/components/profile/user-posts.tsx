import React from "react";
import Post from "./post";

const UserPosts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mt-10">
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default UserPosts;
