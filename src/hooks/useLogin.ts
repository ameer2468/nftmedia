import { useState } from "react";
import { supabase } from "../constants/supabase";
import Web3 from "web3";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const windowBrowser: any = window;
  const randomNonce = Math.floor(Math.random() * 1000000);
  const [nonce, setNonce] = useState(randomNonce);

  const detectCurrentProvider = () => {
    let provider;
    if (windowBrowser.ethereum) {
      provider = windowBrowser.ethereum;
    } else if (windowBrowser.web3) {
      provider = windowBrowser.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const updateNonce = async (wallet: string) => {
    setNonce(randomNonce);
    await supabase
      .from("auth")
      .update({ nonce: randomNonce })
      .select("nonce")
      .eq("wallet", wallet);
  };

  const handleAuth = async (address: string, signature: string) => {
    await axios.post(`https://rmgkkukzcwaywhvkwmky.functions.supabase.co/auth`, {
      address,
      signature,
    });
  };

  const nonceHandler = async (account: string, nonce: number) => {
    const provider = detectCurrentProvider();
    if (provider) {
      const web3 = new Web3(provider);
      return await web3.eth.personal
        .sign(
          `You are logging into NftMedia with your metamask, here is your id for security ${nonce}`,
          account,
          String(randomNonce)
        )
        .then(async (signed: string) => {
          await handleAuth(account, signed);
        });
    }
  };

  const signUp = async (address: string) => {
    await supabase
      .from("auth")
      .insert({
        wallet: address,
        nonce: nonce,
      })
      .then(async (res: any) => {
        const user = res.data[0];
        await nonceHandler(address, user.nonce);
        window.location.href = "/home";
        // localStorage.setItem(
        //   "user",
        //   JSON.stringify({
        //     id: res.data[0].id,
        //     display_name: res.data[0].display_name,
        //     wallet: res.data[0].wallet,
        //   })
        // );
      });
  };

  const loginHandler = async () => {
    setLoading(true);
    const currentProvider = detectCurrentProvider();
    if (currentProvider) {
      await currentProvider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const address = userAccount[0];
      await supabase
        .from("auth")
        .select("*")
        .eq("wallet", address)
        .then(async (res: any) => {
          if (res.data.length === 0) {
            await signUp(address);
          } else {
            await nonceHandler(address, res.data[0].nonce);
            await updateNonce(address);
            setLoading(false);
            const user = res.data[0];
            window.location.href = "/home";

            // localStorage.setItem(
            //   "user",
            //   JSON.stringify({
            //     id: user.id,
            //     display_name: user.display_name,
            //     wallet: user.wallet,
            //   })
            // );
          }
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return { loginHandler, loading, logout };
};
