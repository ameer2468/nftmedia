import React from "react";
import Searchbox from "../global/searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/user.png";

const Topbar = () => {
  return (
    <div className="topbar z-50  w-full gap-5 h-24 px-0 fixed right-0 top-0 flex items-center lg:gap-0 lg:pl-28 lg:pr-32 lg:justify-between">
      <div className="hidden lg:block">
        <Searchbox />
      </div>
      <div className="flex gap-20 items-center w-full px-6 justify-between lg:justify-end">
        <div className="flex gap-3 items-center">
          <img src={user} alt="user" />
          <p>Michael</p>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <FontAwesomeIcon
          className="text-2xl transition-all duration-200 hover:opacity-50 cursor-pointer"
          icon={faBell}
        />
      </div>
    </div>
  );
};

export default Topbar;
