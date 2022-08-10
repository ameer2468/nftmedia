import React from "react";
import Button from "../global/button";
import ViewCount from "../global/view-count";
import CommentCount from "../global/comment-count";
import VoteCount from "../global/vote-count";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="px-12 py-8 w-full bg-white rounded-xl text-center">
      <h1 className="text-center text-[25px] font-bold lg:text-[20px]">Post</h1>
      <p className="py-5 leading-6 text-left text-sm font-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus iste,
        magni non qui quo sequi temporibus vel. Error facilis quae quis quos
        ratione! Ad aspernatur commodi eius mollitia tempora voluptates?
      </p>
      <div className="flex justify-center gap-5 lg:gap-10 mt-3 mb-10">
        <CommentCount count="12" />
        <ViewCount count="24" />
        <VoteCount count="18" />
      </div>
      <Link to={"/post/10"}>
        <Button
          className="bg-black normal-case hover:bg-zinc-700 m-auto text-sm"
          text="Read More"
        />
      </Link>
    </div>
  );
};

export default Post;
