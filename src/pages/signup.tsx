import React from "react";
import Button from "../components/global/button";
import metamask from "../assets/metamask.png";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signUpHandler, loading } = useSignup();
  return (
    <div className="relative z-[100] w-full h-screen bg-black flex justify-between">
      <div className="signup-bg w-[50%] h-screen hidden lg:block" />
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-[50%]">
        <h1 className="text-white px-8 text-[25px] text-left font-bold mb-10 w-[100%] lg:text-[40px] lg:w-[53%] lg:px-0">
          Welcome 🧐
        </h1>
        <div className="w-[80%] lg:w-[50%]">
          <Button
            loading={loading}
            disabled={loading}
            onClick={signUpHandler}
            image={metamask}
            className="normal-case h-16 bg-sky-500 w-full"
            text="Signup with MetaMask"
          />
          <Link to="/login">
            <p className="text-center transition-all duration-200 text-white text-md mt-5 hover:opacity-50 cursor-pointer">
              Have an account? Let's login!
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
