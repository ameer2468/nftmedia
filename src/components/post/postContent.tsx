import React from "react";
import ViewCount from "../global/view-count";
import CommentCount from "../global/comment-count";
import VoteCount from "../global/vote-count";
import { Avatar } from "../global/avatar";
import moment from "moment";
import { IThread } from "../../types/posts";
import Rectangle from "../skeleton/rectangle";
import Button from "../global/button";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface props {
  post: IThread["thread"] | undefined;
  loading: boolean;
  vote: (dir: "up" | "down") => void;
  voteLoading: boolean;
}

const PostContent = ({ post, loading, vote, voteLoading }: props) => {
  const skeleton = () => {
    return (
      <div>
        <div className="flex justify-between">
          <div>
            <Rectangle width={250} height={30} />
          </div>
          <div className="flex gap-10">
            <Rectangle width={30} height={30} />
            <Rectangle width={30} height={30} />
            <Rectangle width={30} height={30} />
          </div>
        </div>
        <div className="flex flex-col gap-5 ml-auto w-full mt-10">
          <div className="flex justify-between">
            <div className="flex w-[200px]">
              <Rectangle width={200} height={30} />
            </div>
            <div className="w-[200px]">
              <Rectangle width={200} height={30} />
            </div>
          </div>
          <div className="flex justify-start w-[400px]">
            <Rectangle width={400} height={30} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10 border border-white">
      {loading ? (
        skeleton()
      ) : (
        <>
          <div className="flex justify-between items-center mb-5 relative">
            <div className="flex gap-4 flex-col absolute left-[-60px] top-[35px]">
              <Button
                onClick={() => vote("up")}
                icon={faArrowUp}
                disabled={voteLoading}
                className={`px-[2px] w-[35px] bg-sky-500 rounded-lg normal-case text-sm h-[40px] ${
                  post?.didUserVote === 1 ? "bg-green-400" : ""
                }`}
              />
              <Button
                onClick={() => vote("down")}
                icon={faArrowDown}
                disabled={voteLoading}
                className={`px-[2px] w-[35px] bg-sky-500 rounded-lg normal-case text-sm h-[40px] ${
                  post?.didUserVote === -1 ? "bg-red-400" : ""
                }`}
              />
            </div>
            <h2 className="font-bold text-[30px] lg:text-[40px]">
              {post?.title}
            </h2>
            <div className="flex gap-10">
              <CommentCount count={post?.comment_count} />
              <ViewCount count={post?.view_count} />
              <VoteCount count={post?.vote_count} />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center transition-all duration-200 hover:opacity-50 cursor-pointer">
                <Avatar className="w-10" />
                <p className="font-bold text-sky-500">{post?.display_name}</p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="ml-5 font-bold text-sm opacity-50">
                  Posted at {moment(post?.created_at).format("LLL")}
                </p>
              </div>
            </div>
          </div>
          <p className="leading-6">{post?.post}</p>
        </>
      )}
    </div>
  );
};

export default PostContent;
