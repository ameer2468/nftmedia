import React from "react";

interface props {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const Box = ({ title, children, className }: props) => {
  return (
    <div
      className={` ${className} p-10 font-bold relative rounded-xl text-[25px] bg-gradient-to-br to-zinc-50 from-sky-50 border border-white`}
    >
      <h3 className="text-left mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default Box;
