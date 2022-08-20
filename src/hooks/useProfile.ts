import { useContext, useEffect, useState } from "react";
import { IUserProfile } from "../types/user";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user";
import { UserContext } from "../context/UserContext";

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const userId = useParams().id as string;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    fetchUserProfile(userId, user?.id as number).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [user?.id, userId]);
  return { profile, setProfile, loading, userId };
};
