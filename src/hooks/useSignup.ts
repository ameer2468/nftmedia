import { useState } from "react";
import { supabase } from "../constants/supabase";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const windowBrowser = window;
  const navigate = useNavigate();

  const signUpHandler = () => {
    setLoading(true);
    let address: string;
    // Asking if metamask is already present or not
    if (windowBrowser.ethereum) {
      // res[0] for fetching a first wallet
      windowBrowser.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res: string) => {
          address = res[0];
          await supabase
            .from("accounts")
            .select("wallet")
            .eq("wallet", address)
            .then(async (res: any) => {
              if (res.data.length === 0) {
                await supabase
                  .from("accounts")
                  .insert({
                    wallet: address,
                  })
                  .then(() => {
                    navigate("/home");
                  });
              } else if (res.data.length === 1) {
                navigate("/home");
              }
            });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Please install the metamask extension");
    }
  };

  return { signUpHandler, loading };
};
