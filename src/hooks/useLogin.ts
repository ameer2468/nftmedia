import { useState } from "react";
import { supabase } from "../constants/supabase";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const windowBrowser = window;

  const loginHandler = () => {
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
                window.location.href = "/signup";
              } else {
                window.location.href = "/home";
                localStorage.setItem(
                  "user",
                  JSON.stringify(res.data[0].wallet)
                );
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

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return { loginHandler, loading, logout };
};
