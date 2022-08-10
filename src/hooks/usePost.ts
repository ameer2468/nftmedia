import { Dispatch, useState } from "react";
import { supabase } from "../constants/supabase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

interface args {
  title: string;
  post: string;
}

export const usePost = (form: args) => {
  const { user } = useContext(UserContext);
  const [createLoading, setCreateLoading] = useState(false);
  const submitNewPost = async (
    clearInput: Dispatch<{ title: string; post: string }>
  ) => {
    setCreateLoading(true);
    await supabase
      .from("threads")
      .insert({
        ...form,
        user: user?.id,
      })
      .then(() => {
        setCreateLoading(false);
        clearInput({
          title: "",
          post: "",
        });
      });
  };
  return {
    submitNewPost,
    createLoading,
  };
};
