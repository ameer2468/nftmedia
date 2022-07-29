import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faNewspaper,
  faComments,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/logo.png";
import Tippy from "@tippyjs/react";
import { useLocation } from "react-router-dom";

const links = [
  { icon: faHouse, url: "", name: "Home" },
  { icon: faNewspaper, url: "", name: "Latest" },
  { icon: faComments, url: "", name: "Messages" },
  { icon: faCog, url: "", name: "Settings" },
];

const Sidebar = () => {
  const router = useLocation();
  const pathname = router.pathname.split("/")[1];
  return (
    <div className="sidebar flex w-full h-full items-center fixed">
      <div className="logo absolute w-full h-24 top-0 flex items-center justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className="flex flex-col justify-items-center w-full gap-10">
        {links.map((link, index) => (
          <Tippy placement="right" content={link.name}>
            <div
              className={`flex w-[28%] m-auto justify-center ${
                pathname === link.name.toLowerCase()
                  ? "opacity-100"
                  : "opacity-50"
              }`}
              key={index.toString()}
            >
              <FontAwesomeIcon
                className="text-white text-[30px] transition-all duration-200 hover:opacity-80 cursor-pointer transition-all duration-200"
                icon={link.icon}
              />
            </div>
          </Tippy>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
