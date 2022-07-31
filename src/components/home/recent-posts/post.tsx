import React from "react";
import Button from "../../global/button";
import ViewCount from "../../global/view-count";
import CommentCount from "../../global/comment-count";
import { Avatar } from "../../avatar";
import VoteCount from "../../global/vote-count";

const Post = () => {
  return (
    <div className="px-12 py-8 w-full bg-gradient-to-br to-zinc-50 from-sky-50  rounded-xl text-center">
      <h1 className="text-center text-[25px] font-bold lg:text-[30px]">Post</h1>
      <div className="font-bold flex items-center transition-all duration-200 justify-center gap-2 hover:opacity-50 cursor-pointer">
        <Avatar className="w-10" />
        <p className="text-sky-500 mt-3">John Doe</p>
      </div>
      <p className="py-5 leading-7 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus iste,
        magni non qui quo sequi temporibus vel. Error facilis quae quis quos
        ratione! Ad aspernatur commodi eius mollitia tempora voluptates?
      </p>
      <div className="flex justify-center gap-10 mb-10">
        <CommentCount count="12" />
        <ViewCount count="24" />
        <VoteCount count="18" />
      </div>
      <Button
        className="bg-black normal-case hover:bg-zinc-700 m-auto"
        text="Read More"
      />
    </div>
  );
};

export default Post;
