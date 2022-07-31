import React from "react";
import Button from "../components/global/button";
import metamask from "../assets/metamask.png";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signUpHandler } = useSignup();
  return (
    <div className="relative z-[100] w-full h-screen bg-black flex justify-between">
      <div className="signup-bg w-[50%] h-screen hidden lg:block" />
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-[50%]">
        <h1 className="text-white px-8 text-[25px] text-left font-bold mb-10 w-[100%] lg:text-[40px] lg:w-[53%] lg:px-0">
          Welcome 🧐
        </h1>
        <div className="w-[80%] lg:w-[50%]">
          <Button
            onClick={signUpHandler}
            image={metamask}
            className="normal-case bg-sky-500 w-full"
            text="Signup with MetaMask"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
