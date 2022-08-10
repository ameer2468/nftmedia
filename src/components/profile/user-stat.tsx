import React from "react";

interface props {
  stat: string | number | undefined;
  title: string;
}

const UserStat = ({ stat, title }: props) => {
  return (
    <div className="text-center w-full bg-white py-3 px-5 rounded-xl">
      <p className="text-sm font-normal">
        {title}: {stat}
      </p>
    </div>
  );
};

export default UserStat;
