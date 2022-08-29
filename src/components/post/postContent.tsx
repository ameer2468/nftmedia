import React from "react";
import ViewCount from "../global/view-count";
import CommentCount from "../global/comment-count";
import VoteCount from "../global/vote-count";
import { AvatarMemo } from "../global/avatar";
import moment from "moment";
import { IThread } from "../../types/posts";
import Rectangle from "../skeleton/rectangle";
import Button from "../global/button";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { useImageBroken } from "../../hooks/useImageBroken";

interface props {
  post: IThread["thread"] | undefined;
  loading: boolean;
  vote: (dir: "up" | "down") => void;
  voteLoading: boolean;
}

const PostContent = ({ post, loading, vote, voteLoading }: props) => {
  const { handleImageError, imageBroken } = useImageBroken();
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
            <Tippy content="Upvote or downvote">
              <div
                className="flex gap-2 flex-row
              absoluteHorizontalCenter w-[200px] top-[-65px]
             bg-gradient-to-br to-zinc-50 from-sky-100 p-2 rounded-lg border border-white"
              >
                <Button
                  onClick={() => vote("up")}
                  icon={faArrowUp}
                  disabled={voteLoading}
                  className={`px-[2px] w-[90px] rounded-lg normal-case text-sm h-[30px] ${
                    post?.didUserVote.dir === 1 ? "bg-green-400" : "bg-sky-500"
                  }`}
                />
                <Button
                  onClick={() => vote("down")}
                  icon={faArrowDown}
                  disabled={voteLoading}
                  className={`px-[2px] w-[90px] rounded-lg normal-case text-sm h-[30px] ${
                    post?.didUserVote.dir === -1 ? "bg-red-400" : "bg-sky-500"
                  }`}
                />
              </div>
            </Tippy>
            <h2 className="font-bold text-[30px] lg:text-[40px]">
              {post?.title}
            </h2>
            <div className="flex gap-10">
              <CommentCount count={post?.comment_count} />
              <ViewCount count={post?.view_count} />
              <VoteCount count={Number(post?.vote_count)} />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-between w-full">
              <Link to={`/profile/${post?.user_id}`}>
                <div className="flex items-center transition-all duration-200 hover:opacity-50 cursor-pointer">
                  {post?.avatar_image_url === null || imageBroken ? (
                    <AvatarMemo className="w-10" />
                  ) : (
                    <img
                      className="w-10 mr-3"
                      src={post?.avatar_image_url}
                      onError={handleImageError}
                      alt="avatar"
                    />
                  )}
                  <p className="font-bold text-sky-500">{post?.display_name}</p>
                </div>
              </Link>
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
