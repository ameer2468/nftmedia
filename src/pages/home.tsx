import React from "react";
import TopPost from "../components/home/top-post";
import TrendingPosts from "../components/home/trending-posts/trending-posts";
import RecentPosts from "../components/home/recent-posts/recent-posts";

const Home = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <TopPost />
      <TrendingPosts />
      <RecentPosts />
    </div>
  );
};

export default Home;
