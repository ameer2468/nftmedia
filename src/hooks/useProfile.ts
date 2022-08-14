import { useEffect, useState } from "react";
import { IUserProfile } from "../types/user";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user";

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const userId = useParams().id as string;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  useEffect(() => {
    if (loading) {
      fetchUserProfile(userId).then((data) => {
        setProfile(data);
        setLoading(false);
      });
    }
  }, [loading, userId]);
  return { profile, loading, userId };
};
