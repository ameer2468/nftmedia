import React, { useContext } from "react";
import UserStat from "./user-stat";
import moment from "moment";
import CopyButton from "../global/copy-button";
import Button from "../global/button";
import { UserContext } from "../../context/UserContext";
import { IUser } from "../../types/user";
import Circle from "../skeleton/circle";
import Rectangle from "../skeleton/rectangle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../global/avatar";

interface props {
  profile: IUser | undefined;
  params: string | undefined;
  loading: boolean;
  followHandler: () => void;
  imageLoading: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userImage: string | null;
}

const User = ({
  profile,
  params,
  loading,
  followHandler,
  imageLoading,
  handleFileUpload,
  userImage,
}: props) => {
  const { user } = useContext(UserContext);
  const loadingCheck = loading;
  const fileRef = React.createRef<HTMLInputElement>();
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
          <div>
            <Circle />
          </div>
          <div className="w-[200px]">
            <Rectangle />
          </div>
        </div>
      ) : (
        <div className="relative w-24 m-auto">
          <input
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileRef}
            className="hidden"
            type="file"
          />
          {imageLoading ? (
            <Circle />
          ) : profile?.avatar_url === null ? (
            <Avatar className="w-24" />
          ) : (
            <img
              alt="user"
              className="w-24 h-24 rounded-full mb-5"
              src={userImage || profile?.avatar_url + "?v=" + Date.now()}
            />
          )}
          {user?.id === profile?.id ? (
            <div
              onClick={() => fileRef.current?.click()}
              className="bg-sky-500 w-7 h-7 cursor-pointer
          rounded-full flex items-center
          transition-all duration-200
          justify-center absolute right-0
           bottom-2 hover:brightness-105"
            >
              <FontAwesomeIcon
                className="text-white text-[13px]"
                icon={faPencilAlt}
              />
            </div>
          ) : (
            ""
          )}
        </div>
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
              <p className="text-sm font-normal truncate w-[200px] lg:w-[350px] xl:w-full">
                Wallet: {`${profile?.wallet || ""}`}
              </p>
              <CopyButton textToCopy={profile?.wallet} />
            </div>
          </div>
        </>
      )}
      {user?.id === Number(params) || loading ? (
        ""
      ) : (
        <Button
          onClick={followHandler}
          text={`${profile?.isFollowing ? "Unfollow" : "Follow"}`}
          className="w-[150px] mx-auto font-normal text-sm bg-sky-500 mt-10 normal-case"
        />
      )}
    </div>
  );
};

export default User;
