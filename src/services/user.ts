import { getRequest } from "./requestTypes";
import { supabase } from "../constants/supabase";

const api = process.env.REACT_APP_API_URL;

export const fetchUserProfile = async (userId: number) => {
  return await getRequest(`${api}/profile`, { userId });
};

export const followUser = (
  followed_by_id: number | undefined,
  userId: number | undefined,
  follow: boolean
) => {
  if (follow) {
    return supabase.from("followers").insert({
      user_id: userId,
      followed_by_id: followed_by_id,
    });
  } else {
    return supabase.from("followers").delete().match({
      user_id: userId,
      followed_by_id: followed_by_id,
    });
  }
};
