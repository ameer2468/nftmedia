import React from "react";
import Item from "./item";

const Notifications = () => {
  return (
    <div
      className=" w-[250px] h-auto
      rounded-xl p-3 flex gap-2 flex-col
    absolute right-0 top-[50px] backdrop-blur-lg bg-gradient-to-br to-zinc-50 from-sky-50 border border-white"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
};

export default Notifications;
