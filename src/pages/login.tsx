import React from "react";
import TextInput from "../components/global/textinput";
import Button from "../components/global/button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative z-[100] w-full h-screen bg-black flex justify-between">
      <div className="signup-bg w-[50%] h-screen hidden lg:block" />
      <div className="flex flex-col justify-center items-center w-full h-screen lg:w-[50%]">
        <h1 className="text-white px-8 text-[25px] text-left font-bold mb-10 w-[100%] lg:text-[40px] lg:w-[53%] lg:px-0">
          Welcome back 👋
        </h1>
        <form className="w-[100%] flex flex-col gap-5 lg:w-[60%] px-8">
          <TextInput placeholder="Username" />
          <TextInput type="password" placeholder="Password" />
          <Button className="normal-case mt-5 bg-sky-500 w-full" text="Login" />
          <div className="text-white text-sm transition-all gap-5 duration-200 text-center mt-5 flex justify-between flex-col lg:flex-row">
            <Link to="/signup">
              <p className="duration-200 transition-all hover:opacity-80 cursor-pointer">
                No account? lets get you registered
              </p>
            </Link>
            <p className="duration-200 transition-all hover:opacity-80 cursor-pointer">
              Forgot your password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
