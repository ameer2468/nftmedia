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
  }, [user?.id, userId, setProfile]);
  return { loading };
};

export const useProfile = () => {
  const userId = useParams().id as string;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [imageLoading, setImageLoading] = React.useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const fileExt = file?.name.split(".").pop();
    const fileName = `${profile?.user.id}.${fileExt}`;
    const filePath = `${fileName}`;
    const oldUserAvatar = profile?.user.avatar_image_url;
    const getExtension = oldUserAvatar?.split(".").pop();
    setImageLoading(true);
    await supabase.storage
      .from("avatars")
      .remove([`${profile?.user.id}.${getExtension}`]);
    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    const avatar_url = supabase.storage.from("avatars").getPublicUrl(fileName);
    await supabase
      .from("auth")
      .update({ avatar_image_url: avatar_url.data?.publicURL })
      .eq("id", profile?.user.id)
      .then((res: any) => {
        const userData = res.data[0];
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = () => {
        setUser({ ...user, avatar_image_url: userData.avatar_image_url });
        console.log(userData);
      });
    setImageLoading(false);
    if (uploadError) {
      throw uploadError;
    }
  };

  return {
    profile,
    setProfile,
    userId,
    handleFileUpload,
    imageLoading,
  };
};
