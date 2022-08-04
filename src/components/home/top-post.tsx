import React from "react";
import CommentCount from "../global/comment-count";
import ViewCount from "../global/view-count";
import Button from "../global/button";

const TopPost = () => {
  return (
    <div className="flex flex-col lg:justify-between lg:flex-row items-center">
      <div>
        <h2 className="font-bold text-black text-[30px] lg:text-[40px]">
          😮 Post of the day
        </h2>
        <h1 className="text-black text-[35px] w-[80%] lg:w-[100%] lg:text-[50px] w-full max-w-[700px] mt-10 leading-snug">
          The craziest NFT drop do not miss this...
        </h1>
        <div className="flex gap-7 mt-10">
          <CommentCount count="35" />
          <ViewCount count="65" />
        </div>
      </div>
      <div className="relative">
        <div className="arrowbg hidden xl:block" />
        <Button className="bg-sky-500 mt-20 lg:mt-0" text="Read more" />
      </div>
    </div>
  );
};

export default TopPost;
