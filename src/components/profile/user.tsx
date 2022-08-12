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
  profile: IUser | undefined;
  params: string | undefined;
  loading: boolean;
}

const User = ({ profile, params, loading }: props) => {
  const { user } = useContext(UserContext);
  const loadingCheck = loading;
  const skeleton = () => {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(<Rectangle width={1000} height={100} key={i} />);
    }
    return arr;
  };
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
      {loading ? (
        <div className="flex flex-col h-60 gap-3 mt-5">{skeleton()}</div>
      ) : (
        <>
          <p className="text-center text-[18px] mt-2">
            {profile?.display_name}
          </p>
          <div className="mt-7 flex-row flex-wrap flex gap-3">
            <UserStat title="Posts" stat={profile?.postCount} />
            <UserStat title="Followers" stat={profile?.followerCount} />
            <UserStat
              title="Join date"
              stat={moment(profile?.created_at).format("LL")}
            />
            <div className="text-center bg-white w-full py-3 px-5 rounded-xl flex justify-between items-center">
              <p className="text-sm font-normal truncate w-[200px] lg:w-[350px]">
                Wallet: {`${profile?.wallet || ""}`}
              </p>
              <CopyButton textToCopy={profile?.wallet} />
            </div>
          </div>
        </>
      )}
      {user?.id === Number(params) ? (
        ""
      ) : (
        <Button
          text="+ Follow"
          className="w-full font-normal text-sm bg-sky-500 mt-10 normal-case"
        />
      )}
    </div>
  );
};

export default User;
