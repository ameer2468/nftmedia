import React from "react";
import Button from "../../global/button";
import ViewCount from "../../global/view-count";
import CommentCount from "../../global/comment-count";
import { Avatar } from "../../global/avatar";
import VoteCount from "../../global/vote-count";
import { Link } from "react-router-dom";
import { IPost } from "../../../types/posts";

interface props {
  data: null | IPost;
}

const Post = ({ data }: props) => {
  return (
    <div className="px-12 py-8 w-full bg-gradient-to-br to-zinc-50 from-sky-50 border border-sky-100  rounded-xl text-center">
      <h1 className="text-center text-[25px] font-bold lg:text-[30px]">
        {data?.title}
      </h1>
      <Link to={`/profile/${data?.user_id}`}>
        <div className="font-bold flex items-center transition-all duration-200 justify-center mt-5 gap-2 hover:opacity-50 cursor-pointer">
          <img
            src={data?.avatar_image_url + "?v=" + Date.now()}
            alt="user"
            className="w-8 h-8"
          />
          <p className="text-sky-500">{data?.display_name}</p>
        </div>
      </Link>
      <p className="py-10 leading-7 text-center">{data?.post}</p>
      <div className="flex justify-center gap-10 mb-10">
        <CommentCount count={data?.comment_count} />
        <ViewCount count={data?.view_count} />
        <VoteCount count={data?.vote_count} />
      </div>
      <Link to={`/post/${data?.id}`}>
        <Button
          className="bg-black normal-case hover:bg-zinc-700 m-auto"
          text="Read More"
        />
      </Link>
    </div>
  );
};

export default Post;
