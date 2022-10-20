import { followUser } from "../services/user";
import { Dispatch, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { IUserProfile } from "../types/user";

export const useFollow = (
  profile: IUserProfile | null,
  setProfile: Dispatch<IUserProfile | null>
) => {
  const { user } = useContext(UserContext);
  const followHandler = async (userId: number, follow: boolean) => {
    await followUser(user?.id, userId, follow).then(() => {
      setProfile({
        ...profile,
        user: {
          ...(profile?.user as IUserProfile["user"]),
          isFollowing: follow,
          followerCount:
            (profile?.user.followerCount as number) + (follow ? 1 : -1),
        },
      });
    });
  };
  return {
    followHandler,
  };
};
