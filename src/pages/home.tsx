import React from "react";
import TopPost from "../components/browsing/top-post";
import TrendingPosts from "../components/browsing/trending-posts/trending-posts";
import RecentPosts from "../components/browsing/recent-posts/recent-posts";
import HiddenMenu from "../components/global/hidden-menu";

const Home = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <TopPost />
      <TrendingPosts />
      <RecentPosts />
      <HiddenMenu />
    </div>
  );
};

export default Home;
