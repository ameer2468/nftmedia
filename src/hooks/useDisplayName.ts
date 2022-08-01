import React, { useContext, useState } from "react";
import { supabase } from "../constants/supabase";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";

export const useDisplayname = () => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setModalId } = useContext(ModalContext);
  const { setUser } = useContext(UserContext);

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    setDisplayName(capitalized);
  };
  const submit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (displayName) {
      setLoading(true);
      await supabase
        .from("accounts")
        .update({ display_name: displayName })
        .eq("wallet", JSON.parse(localStorage.getItem("user") as string).wallet)
        .then(async () => {
          await supabase
            .from("accounts")
            .select("display_name")
            .eq(
              "display_name",
              JSON.parse(localStorage.getItem("user") as string).display_name
            )
            .then(() => {
              setModalId(null);
              setLoading(false);
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...JSON.parse(localStorage.getItem("user") as string),
                  display_name: displayName,
                })
              );
              setUser(JSON.parse(localStorage.getItem("user") as string));
            });
        });
    }
  };

  return {
    displayName,
    handler,
    loading,
    submit,
    setDisplayName,
  };
};
