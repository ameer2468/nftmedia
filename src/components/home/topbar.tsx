import React from "react";
import Searchbox from "../global/searchbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faBell } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/user.png";
import Button from "../global/button";
import HiddenMenu from "../global/hidden-menu";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="topbar z-50  w-full gap-5 h-24 px-0 fixed right-0 top-0 flex items-center lg:gap-0 lg:pl-20 lg:pr-28 lg:justify-between">
      <div className="flex items-center w-full px-6 justify-between">
        <div className="hidden lg:block">
          <Searchbox />
        </div>
        <HiddenMenu />
        <div className="flex hidden gap-5 lg:flex">
          <Link to="/login">
            <Button
              className="bg-transparent h-12 text-sky-500 normal-case py-3 border border-sky-500"
              text="Login"
            />
          </Link>
          <Link to="/signup">
            <Button
              className="bg-sky-500 h-12 normal-case py-3"
              text="Sign Up"
            />
          </Link>
        </div>
        <div className="flex gap-10 items-center">
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
    </div>
  );
};

export default Topbar;
