import React from "react";

interface props {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
}

const TextInput = ({ placeholder, onChange, className, type }: props) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      type={type || "text"}
      className={`text-sm bg-white px-5 w-full rounded-xl transition-all duration-200
         border-transparent border-2 h-14 placeholder-black text-black 
         focus:outline-0 focus:border-sky-500
         ${className}
      `}
    ></input>
  );
};

export default TextInput;
