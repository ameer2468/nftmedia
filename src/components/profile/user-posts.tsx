import React from "react";
import Post from "./post";
import { IThreadProfile } from "../../types/posts";
import Rectangle from "../skeleton/rectangle";

interface props {
  data: IThreadProfile[];
  loading: boolean;
}

const UserPosts = ({ data, loading }: props) => {
  const skeletonArr = () => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push(<Rectangle width="100%" height={250} key={i} />);
    }
    return arr;
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mt-10">
      {loading
        ? skeletonArr()
        : data.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
    </div>
  );
};

export default UserPosts;
