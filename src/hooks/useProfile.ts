import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/user";
import { UserContext } from "../context/UserContext";
import { IUser, IUserProfile } from "../types/user";
import { supabase } from "../constants/supabase";

export const useProfileGet = (setProfile: (arg: IUserProfile) => void) => {
  const userId = useParams().id as string;
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile(Number(userId), Number(user?.id)).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [user?.id, userId, setProfile]);
  return { loading };
};

export const useProfile = () => {
  const userId = useParams().id as string;
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const fileExt = file?.name.split(".").pop();
    const fileName = `${profile?.user.id}.${fileExt}`;
    const filePath = `${fileName}`;
    const oldUserAvatar = profile?.user.avatar_image_url;
    const findImageExtension = oldUserAvatar
      ?.split(`/${profile?.user.id}.`)[1]
      .substring(0, 3);
    setImageLoading(true);
    await supabase.storage
      .from("avatars")
      .remove([
        `${profile?.user.id}.${
          findImageExtension === "jpe" ? "jpeg" : findImageExtension
        }`,
      ]);
    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    const { publicURL: avatar_url } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    await supabase
      .from("auth")
      .update({ avatar_image_url: avatar_url })
      .eq("id", profile?.user.id)
      .then((res: any) => {
        const userData = res.data[0];
        setUser(userData);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            avatar_image_url: userData.avatar_image_url,
          })
        );
        setProfile({
          ...profile,
          user: {
            ...(profile?.user as IUser),
            avatar_image_url: userData.avatar_image_url,
          },
        });
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
