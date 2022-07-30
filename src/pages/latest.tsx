import React from "react";
import Post from "../components/latest/post";

const Latest = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">📰 Latest</h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Latest;
