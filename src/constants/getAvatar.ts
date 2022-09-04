import { supabase } from "./supabase";

export const getAvatar = async (userId: string) => {
  return await supabase
    .from("auth")
    .select("avatar_image_url")
    .eq("id", userId)
    .then((res: any) => {
      return res.data[0].avatar_image_url;
    });
};
