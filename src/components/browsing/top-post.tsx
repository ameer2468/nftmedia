import React from "react";
import CommentCount from "../global/comment-count";
import ViewCount from "../global/view-count";
import Button from "../global/button";

const TopPost = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="font-bold text-black text-[40px]">😮 Post of the day</h2>
        <h1 className="text-black text-[50px] w-full max-w-[700px] mt-10 leading-snug">
          The craziest NFT Drop do not miss this...
        </h1>
        <div className="flex gap-7 mt-10">
          <CommentCount count={45} />
          <ViewCount count={65} />
        </div>
      </div>
      <div className="relative">
        <div className="arrowbg" />
        <Button className="bg-sky-500" text="Read more" />
      </div>
    </div>
  );
};

export default TopPost;
