import React from "react";
import Searchbox from "../global/searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/user.png";

const Topbar = () => {
  return (
    <div className="topbar h-24 fixed right-0 top-0 flex items-center pl-28 pr-32 justify-between">
      <Searchbox />
      <div className="flex gap-20 items-center">
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
