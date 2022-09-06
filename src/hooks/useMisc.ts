import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useMisc = () => {
  const { user, setUser } = useContext(UserContext);
  const userAvatar = user?.avatar_image_url;
  console.log(user);
  const findImageExtension = userAvatar
    ?.split(`/${user?.id}.`)[1]
    .substring(0, 3);
  const fileName = `${user?.id}.${findImageExtension}`;
  console.log("get image extension", findImageExtension);

  const refetchImage = async () => {
    await supabase.storage
      .from("avatars")
      .createSignedUrl(fileName, 10000)
      .then((res) => {
        const avatar_url = res.data?.signedURL;
        setUser({ ...user, avatar_image_url: avatar_url });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, avatar_image_url: avatar_url })
        );
      });
  };

  return {
    refetchImage,
  };
};
