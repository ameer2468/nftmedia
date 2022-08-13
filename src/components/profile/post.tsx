import React from "react";
import Button from "../global/button";
import ViewCount from "../global/view-count";
import CommentCount from "../global/comment-count";
import VoteCount from "../global/vote-count";
import { Link } from "react-router-dom";
import { IThreadProfile } from "../../types/posts";

interface props {
  post: IThreadProfile;
}

const Post = ({ post }: props) => {
  return (
    <div className="px-12 py-8 w-full bg-white rounded-xl text-center">
      <h1 className="text-center text-[25px] font-bold lg:text-[20px]">Post</h1>
      <p className="py-5 leading-6 text-left text-sm font-normal">
        {post.post}
      </p>
      <div className="flex justify-center gap-5 lg:gap-10 mt-3 mb-10">
        <CommentCount count={post.comment_count} />
        <ViewCount count={post.view_count} />
        <VoteCount count={post.vote_count} />
      </div>
      <Link to={`/post/${post.id}`}>
        <Button
          className="bg-black normal-case hover:bg-zinc-700 m-auto text-sm"
          text="Read More"
        />
      </Link>
    </div>
  );
};

export default Post;
