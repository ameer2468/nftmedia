import React from "react";
import { IUserInfo } from "../../types/user";
import { AvatarMemo } from "../global/avatar";
import { Scrollbars } from "react-custom-scrollbars-2";

interface props {
  data: IUserInfo[] | null;
  onUserClick: (user: IUserInfo) => void;
}

const TagUser = ({ data, onUserClick }: props) => {
  return (
    <>
      {data?.length === 0 ? (
        ""
      ) : (
        <div
          className="w-[300px]
     bg-white border-sky-100 p-3 rounded-xl absolute z-10 border"
        >
          <Scrollbars autoHeight autoHeightMax={200} autoHeightMin={30}>
            <div className="flex flex-col gap-2">
              {data?.map((value) => {
                return (
                  <div
                    onClick={() => {
                      onUserClick(value);
                    }}
                    key={value.id}
                    className="flex items-center gap-2 cursor-pointer
                   hover:text-sky-500 transition-all duration-200"
                  >
                    {value.avatar_image_url ? (
                      <img
                        className="w-7 h-7 rounded-full"
                        src={value.avatar_image_url}
                        alt="avatar"
                      />
                    ) : (
                      <AvatarMemo className="w-7 h-7" />
                    )}
                    <div className="text-sm">{value.display_name}</div>
                  </div>
                );
              })}
            </div>
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default TagUser;
