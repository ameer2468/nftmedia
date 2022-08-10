import { useCallback, useEffect, useState } from "react";
import { IUser } from "../types/user";
import axios from "axios";
import { supabase } from "../constants/supabase";
import { useParams } from "react-router-dom";

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const userId = useParams().id;
  const [profile, setProfile] = useState<IUser | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const userInfo = useCallback(async () => {
    const allData = await axios.all([
      supabase
        .from("auth")
        .select("wallet, created_at, display_name")
        .eq("id", userId),
      supabase
        .from("threads")
        .select("*", { count: "exact" })
        .eq("user", userId),
      supabase
        .from("comments")
        .select("*", { count: "exact" })
        .eq("user_id", userId),
      supabase
        .from("followers")
        .select("*", { count: "exact" })
        .eq("user_id", userId),
      supabase
        .from("comments")
        .select("thread_title, thread_id, id")
        .eq("user_id", userId),
    ]);
    const [user, threadCount, commentCount, followCount, comments]: any =
      allData;
    setProfile({
      ...user.data[0],
      postCount: threadCount.count + commentCount.count,
      followCount: followCount.count,
    });
    setComments(comments.data);
    setLoading(false);
  }, [userId]);
  useEffect(() => {
    if (loading) {
      userInfo();
    }
  }, [userInfo, loading]);
  return { profile, loading, userId, comments };
};
