import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCog,
  faComments,
  faHouse,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { useLocation } from "react-router-dom";

const HiddenMenu = () => {
  const router = useLocation();
  const pathname = router.pathname.split("/")[1];
  const links = [
    { icon: faHouse, url: "", name: "Home" },
    { icon: faNewspaper, url: "", name: "Latest" },
    { icon: faComments, url: "", name: "Messages" },
    { icon: faCog, url: "", name: "Settings" },
  ];
  return (
    <div className="fixed bottom-0 w-full left-0 lg:hidden">
      <div className="flex flex-row gap-5 bg-gradient-to-r from-sky-500 to-sky-300 h-24">
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

export default HiddenMenu;
