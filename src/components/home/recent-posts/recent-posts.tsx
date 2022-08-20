import React from "react";
import Post from "./post";
import { IPost } from "../../../types/posts";
import { BarLoader } from "react-spinners";

interface props {
  data: null | IPost[];
  loading: boolean;
}

const RecentPosts = ({ data, loading }: props) => {
  return (
    <div className="mt-24 py-10">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">
        📰 Recent Posts
      </h2>
      {loading ? (
        <div className="text-center w-full">
          <BarLoader width="100%" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2  xl:grid-cols-3">
          {data?.map((value) => {
            return <Post key={value.id} data={value} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
