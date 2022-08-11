import React from "react";
import Box from "../components/profile/box";
import { useProfile } from "../hooks/useProfile";
import User from "../components/profile/user";
import UserPosts from "../components/profile/user-posts";
import Activity from "../components/profile/activity";

const Profile = () => {
  const { profile, userId, loading, comments } = useProfile();
  return (
    <div className="w-full top-post pt-48 px-5 lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-black text-[30px] lg:text-[40px] mb-10">
        Profile
      </h2>
      <div className="flex flex-wrap gap-5 justify-between">
        <Box className="flex-auto lg:w-[100%] xl:w-[40%]" title="User">
          <User loading={loading} params={userId} profile={profile} />
        </Box>
        <Box className="flex-auto lg:w-[65%] xl:w-[55%]" title="Activity">
          <Activity
            loading={loading}
            user={profile?.display_name}
            comments={comments}
          />
        </Box>
        <Box className="w-full" title="Threads">
          <UserPosts />
        </Box>
      </div>
    </div>
  );
};

export default Profile;
