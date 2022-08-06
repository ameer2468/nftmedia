import React from "react";

interface props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const Card = ({ title, subtitle, children }: props) => {
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 flex w-[30%] p-10 flex-col gap-2 rounded">
      <h2 className="font-bold text-[25px] text-left">{title}</h2>
      {subtitle ? <p className="text-sm text-left mb-5">{subtitle}</p> : null}
      {children}
    </div>
  );
};

export default Card;
