import React from "react";
import Post from "./post";
import Rectangle from "../skeleton/rectangle";
import { IProfileThreads } from "../../types/user";

interface props {
  data: IProfileThreads | undefined;
  loading: boolean;
}

const UserPosts = ({ data, loading }: props) => {
  const skeletonArr = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<Rectangle width={1000} height={250} key={i} />);
    }
    return arr;
  };
  return (
    <div className="grid h-72 grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mt-10">
      {loading ? (
        skeletonArr()
      ) : !loading && data?.length === 0 ? (
        <div className="absoluteCenter">
          <p className="font-normal text-[18px] w-full">No Posts</p>
        </div>
      ) : (
        data?.map((post) => {
          return <Post key={post.id} post={post} />;
        })
      )}
    </div>
  );
};

export default UserPosts;
