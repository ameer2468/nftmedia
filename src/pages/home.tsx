import React from "react";
import TopPost from "../components/browsing/top-post";
import TrendingPosts from "../components/browsing/trending-posts/trending-posts";
import RecentPosts from "../components/browsing/recent-posts/recent-posts";

const Home = () => {
  return (
    <div className="w-full top-post pl-64 pr-32 pt-48">
      <TopPost />
      <TrendingPosts />
      <RecentPosts />
    </div>
  );
};

export default Home;
