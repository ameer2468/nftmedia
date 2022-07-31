import React from "react";
import Button from "../components/global/button";
import metamask from "../assets/metamask.png";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { loading, loginHandler } = useLogin();
  return (
    <div className="relative z-[100] w-full h-screen bg-black flex justify-between">
      <div className="signup-bg w-[50%] h-screen hidden lg:block" />
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-[50%]">
        <h1 className="text-white px-8 text-[25px] text-left font-bold mb-10 w-[100%] lg:text-[40px] lg:w-[53%] lg:px-0">
          Welcome back 👋
        </h1>
        <div className="w-[80%] lg:w-[50%]">
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
