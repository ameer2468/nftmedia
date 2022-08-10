import React, { useContext } from "react";
import { Avatar } from "../global/avatar";
import UserStat from "./user-stat";
import moment from "moment";
import CopyButton from "../global/copy-button";
import Button from "../global/button";
import { UserContext } from "../../context/UserContext";
import { IUser } from "../../types/user";
import Circle from "../skeleton/circle";
import Rectangle from "../skeleton/rectangle";

interface props {
  profile: IUser | null;
  params: string | undefined;
  loading: boolean;
}

const User = ({ profile, params, loading }: props) => {
  const { user } = useContext(UserContext);
  const loadingCheck = loading;
  return (
    <div>
      {loadingCheck ? (
        <div className="w-full flex justify-center items-center flex-col">
          <Circle />
          <div className="w-[200px]">
            <Rectangle />
          </div>
        </div>
      ) : (
        <Avatar className="w-32 m-auto" />
      )}
      <p className="text-center text-[18px] mt-2">{profile?.display_name}</p>
      <div className="mt-7 flex-row flex-wrap flex gap-2">
        {loadingCheck ? (
          <div className="w-full">
            <Rectangle />
          </div>
        ) : (
          <UserStat title="Posts" stat={profile?.postCount} />
        )}
        {loadingCheck ? (
          <div className="w-full">
            <Rectangle />
          </div>
        ) : (
          <UserStat title="Followers" stat={profile?.followCount} />
        )}
        {loadingCheck ? (
          <div className="w-full">
            <Rectangle />
          </div>
        ) : (
          <UserStat
            title="Join date"
            stat={moment(profile?.created_at).format("LL")}
          />
        )}
        {loadingCheck ? (
          <Rectangle />
        ) : (
          <div className="text-center bg-white w-full py-3 px-5 rounded-xl flex justify-between items-center">
            <p className="text-sm font-normal truncate w-[200px] lg:w-[350px]">
              Wallet: {`${profile?.wallet || ""}`}
            </p>
            <CopyButton textToCopy={profile?.wallet} />
          </div>
        )}
      </div>
      {user?.id === Number(params) ? (
        ""
      ) : (
        <Button
          text="+ Follow"
          className="w-full text-sm bg-sky-500 mt-10 normal-case"
        />
      )}
    </div>
  );
};

export default User;
