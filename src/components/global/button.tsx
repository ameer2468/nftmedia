import React from "react";

interface props {
  text: string;
  className?: string;
}

const Button = ({ text, className }: props) => {
  return (
    <button
      className={`text-white transition-all duration-200
        font-bold text-md px-9 py-4 rounded-xl hover:brightness-105 uppercase ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
