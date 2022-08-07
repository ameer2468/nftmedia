import React from "react";
import Button from "../components/global/button";
import metamask from "../assets/metamask.png";
import { useLogin } from "../hooks/useLogin";
import videobg from "../assets/videobg.mp4";

const Login = () => {
  const { loading, loginHandler } = useLogin();
  return (
    <div className="relative z-[100] w-full h-screen bg-black flex justify-between">
      <div className="w-[40%] bg-white leading-none relative h-screen hidden lg:block overflow-hidden">
        <video
          className="outline-0 border-0 leading-none"
          width={"100%"}
          src={videobg}
          autoPlay
          loop
          muted
        />
      </div>
      <div className="flex login-bg flex-col justify-center items-center w-full h-screen lg:w-[60%]">
        <div className="w-[90%] lg:w-[60%] login-box rounded-xl flex-col items-center justify-center p-20 flex">
          <h1 className="text-black text-[25px] text-left font-bold mb-10 w-[100%] lg:text-[40px] lg:px-0">
            Welcome 👋
          </h1>
          <Button
            disabled={loading}
            loading={loading}
            onClick={loginHandler}
            image={metamask}
            className="normal-case h-16 bg-sky-500 w-full"
            text="Login with MetaMask"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
