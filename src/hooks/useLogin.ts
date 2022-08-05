import { useState } from "react";
import { supabase } from "../constants/supabase";
import Web3 from "web3";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const windowBrowser: any = window;
  const randomNonce = Math.floor(Math.random() * 1000000);
  const url = process.env.REACT_APP_API_URL;

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

  //Send data to server to get JWT token and verify token is valid

  const handleAuth = async (
    address: string,
    nonce: number,
    signature: string
  ) => {
    return await axios
      .post(`${url}/auth/generate`, {
        address,
        nonce,
        signature,
      })
      .then(async (res: any) => {
        await axios
          .post(
            `${url}/auth/validate`,
            {
              wallet: address,
            },
            {
              headers: {
                "auth-token": res.data.token,
              },
            }
          )
          .then((res) => {
            return res;
          });
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
          await handleAuth(account, nonce, signed);
        });
    }
  };

  //Function that signs the user up

  const signUp = async (address: string) => {
    await supabase
      .from("auth")
      .insert({
        wallet: address,
        nonce: randomNonce,
      })
      .then(async (res: any) => {
        const user = res.data[0];
        await nonceHandler(address, user.nonce);
        window.location.href = "/home";
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
          })
        );
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
            setLoading(false);
            const user = res.data[0];
            window.location.href = "/home";
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...user,
              })
            );
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
