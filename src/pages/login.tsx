import React from "react";
import Button from "../components/global/button";
import metamask from "../assets/metamask.png";
import { useLogin } from "../hooks/useLogin";
import videobg from "../assets/videobg.mp4";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Lottie from "react-lottie";
import hand from "../lottie/hand.json";

const Login = () => {
  const { loading, loginHandler } = useLogin();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hand,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="relative z-[100] w-full h-screen bg-black">
      {/*<div className="w-[40%] bg-white leading-none relative h-screen hidden lg:block overflow-hidden">*/}
      {/*  <video*/}
      {/*    className="outline-0 border-0 leading-none"*/}
      {/*    width={"100%"}*/}
      {/*    src={videobg}*/}
      {/*    autoPlay*/}
      {/*    loop*/}
      {/*    muted*/}
      {/*  />*/}
      {/*</div>*/}
      <div className="flex login-bg flex-col justify-center items-center w-full h-screen lg:w-[100%]">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[95%] lg:w-[50rem] login-box rounded-xl flex-col items-center justify-center p-20 flex"
        >
          <div className="flex w-full">
            <div className="flex">
              <h1 className="text-zinc-500 text-[25px] text-left font-bold w-[100%] lg:text-[40px] lg:px-0">
                Welcome
              </h1>
              <Lottie
                isClickToPauseDisabled={true}
                width={70}
                height={60}
                options={defaultOptions}
              />
            </div>
          </div>
          <p className="text-[14px] text-zinc-400 leading-6 mb-10 mt-2">
            This is a web3 based social community - you login using your crypto
            wallet. Here, we talk about the future of crypto, the nft market,
            and other technologies. Join and be part of the community in a
            click!
          </p>
          <Button
            disabled={loading}
            loading={loading}
            onClick={loginHandler}
            image={metamask}
            className="normal-case border border-white text-[14px] font-normal h-16 bg-sky-500 w-full"
            text="Login with MetaMask"
          />
          <div className="login-bg flex border border-white justify-center p-5 transition-all duration-200 w-full rounded-xl gap-2 mt-3 hover:brightness-105 cursor-pointer">
            <FontAwesomeIcon
              className="text-black text-[20px]"
              icon={faDiscord}
            />
            <p className="text-[14px] text-black">
              Join our discord for user support
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
