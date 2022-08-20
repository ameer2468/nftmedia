import React from "react";
import Box from "../components/profile/box";
import { useProfile } from "../hooks/useProfile";
import User from "../components/profile/user";
import UserPosts from "../components/profile/user-posts";
import Activity from "../components/profile/activity";
import { useFollow } from "../hooks/useFollow";

const Profile = () => {
  const { profile, setProfile, loading, userId } = useProfile();
  const { followHandler } = useFollow(profile, setProfile);
  const followOrNot = !profile?.user.isFollowing;
  return (
    <div className="w-full top-post pt-48 px-5 lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-black text-[30px] lg:text-[40px]">
        Profile
      </h2>
      <div className="flex flex-wrap gap-5 py-10 justify-between">
        <Box className="flex-auto lg:w-[100%] xl:w-[40%]" title="User">
          <User
            followHandler={() => followHandler(profile?.user.id, followOrNot)}
            loading={loading}
            params={userId}
            profile={profile?.user}
          />
        </Box>
        <Box className="flex-auto lg:w-[65%] xl:w-[55%]" title="Activity">
          <Activity
            user={profile?.user?.display_name}
            loading={loading}
            comments={profile?.comments}
          />
        </Box>
        <Box className="w-full" title="Threads">
          <UserPosts loading={loading} data={profile?.threads} />
        </Box>
      </div>
    </div>
  );
};

export default Profile;
