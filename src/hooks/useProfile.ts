import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user";
import { UserContext } from "../context/UserContext";
import { IUserProfile } from "../types/user";
import { supabase } from "../constants/supabase";

export const useProfileGet = (setProfile: (arg: IUserProfile) => void) => {
  const userId = useParams().id as string;
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile(userId, user?.id as number).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [user?.id, userId]);
  return { loading };
};

export const useProfile = () => {
  const userId = useParams().id as string;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = React.useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const fileExt = file?.name.split(".").pop();
    const fileName = `${profile?.user.id}.${fileExt}`;
    const filePath = `${fileName}`;
    setImageLoading(true);
    await supabase.storage.from("avatars").remove([fileName]);
    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    const avatar_url = supabase.storage.from("avatars").getPublicUrl(fileName);
    await supabase
      .from("auth")
      .update({ avatar_url: avatar_url.data?.publicURL })
      .eq("id", profile?.user.id);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserImage(reader.result as string);
      setUser({ ...user, avatar_url: reader.result as string });
    };
    setImageLoading(false);
    if (uploadError) {
      throw uploadError;
    }
  };

  return {
    profile,
    setProfile,
    userId,
    userImage,
    handleFileUpload,
    imageLoading,
  };
};
